import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { Link } from '../../models/hateoas.model';
import { RecipeService } from '../recipe/recipe.service';
import {
  Comment,
  CommentsLinkRegex,
  CommentsLinkTemplate,
  DbComment,
} from '../../models/comment.model';
import {
  DbUser,
  User,
  UsersLinkRegex,
  UsersLinkTemplate,
} from '../../models/user.model';
import { COMMENTS_LINK, USER_LINK } from '../../providers';
import { Recipe, RecipePreview } from '../../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  static buildSelfLink(id: number): Link {
    return { href: CommentsLinkTemplate.replace(CommentsLinkRegex, `${id}`) };
  }

  private static buildUserLink(id: number): Link {
    return { href: UsersLinkTemplate.replace(UsersLinkRegex, `${id}`) };
  }

  constructor(
    private http: HttpClient,
    @Inject(USER_LINK) private userLink: string,
    @Inject(COMMENTS_LINK) private commentsLink: string
  ) {}

  fetchComments(url: string): Observable<Comment[]> {
    return this.http.get<DbComment[]>(url).pipe(
      map((comments) => this.addLinkRelations(comments)),
      switchMap((comments) => this.fetchUsersForComments(comments)),
      catchError((error) =>
        throwError(() => new ApiLoadError('Failed to load comments', error))
      )
    );
  }

  fetchUser(username: string): Observable<User> {
    return this.fetchUserByLink(this.userLink.replace('{name}', username));
  }

  postComment(
    user: User,
    recipe: Recipe | RecipePreview,
    comment: Comment
  ): Observable<Comment> {
    const commentObj: Partial<DbComment> = {
      recipeId: recipe.id,
      userId: user.id,
      date: comment.date || new Date().toISOString(),
      comment: comment.comment,
    };
    return this.http.post<DbComment>(this.commentsLink, commentObj).pipe(
      map((comment) => this.addLinkRelations([comment])[0]),
      map((comment) => ({ ...comment, ...user })),
      catchError((error) =>
        throwError(() => new ApiLoadError('Failed to add comment', error))
      )
    );
  }

  private addLinkRelations(comments: DbComment[]): Comment[] {
    return comments.map((comment) => ({
      ...comment,
      _links: {
        self: CommentService.buildSelfLink(comment.id),
        recipe: RecipeService.buildSelfLink(comment.recipeId),
        user: CommentService.buildUserLink(comment.userId),
      },
    }));
  }

  private fetchUsersForComments(comments: Comment[]): Observable<Comment[]> {
    if (comments.length === 0) return of(comments);
    return forkJoin(
      comments.map((comment) =>
        this.fetchUserByLink(comment._links.user.href).pipe(
          map((user) => ({ ...comment, ...user }))
        )
      )
    );
  }

  private fetchUserByLink(url: string): Observable<User> {
    return this.http.get<DbUser[]>(url).pipe(
      map((users) => (Array.isArray(users) ? users[0] : users)),
      catchError((error) =>
        throwError(() => new ApiLoadError('Failed to fetch user', error))
      )
    );
  }
}
