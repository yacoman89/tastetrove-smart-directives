import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap, throwError } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { Link } from '../../models/hateoas.model';
import { RecipeService } from '../recipe/recipe.service';
import { Comment, CommentsLinkRegex, CommentsLinkTemplate, DbComment } from '../../models/comment.model';
import { DbUser, User, UsersLinkRegex, UsersLinkTemplate } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  static buildSelfLink(id: number): Link {
    return { href: CommentsLinkTemplate.replace(CommentsLinkRegex, `${id}`) };
  }

  private static buildUserLink(id: number): Link {
    return { href: UsersLinkTemplate.replace(UsersLinkRegex, `${id}`) };
  }

  constructor(private http: HttpClient) {}

  fetchComments(url: string): Observable<Comment[]> {
    return this.http.get<DbComment[]>(url).pipe(
      map((comments) => this.addLinkRelations(comments)),
      switchMap((comments) => this.fetchUsersForComments(comments)),
      catchError((error) => throwError(() => new ApiLoadError('Failed to load comments', error)))
    );
  }

  private addLinkRelations(comments: DbComment[]): Comment[] {
    return comments.map((comment) => ({
      ...comment,
      _links: {
        self: CommentService.buildSelfLink(comment.id),
        recipe: RecipeService.buildSelfLink(comment.recipeId),
        user: CommentService.buildUserLink(comment.userId)
      }
    }));
  }

  private fetchUsersForComments(comments: Comment[]): Observable<Comment[]> {
    if (comments.length === 0) return of(comments);
    return forkJoin(comments.map((comment) => this.fetchUserForComment(comment._links.user.href).pipe(map((user) => ({ ...comment, ...user })))));
  }

  private fetchUserForComment(url: string): Observable<User> {
    return this.http.get<DbUser[]>(url).pipe(
      map((users) => Array.isArray(users) ? users[0] : users),
      catchError((error) => throwError(() => new ApiLoadError('Failed to fetch user', error)))
    );
  }
}
