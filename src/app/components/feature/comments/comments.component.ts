import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from '../../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { RecipeLoadError } from '../../../models/errors.model';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'tt-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NewCommentComponent, CommentComponent]
})
export class CommentsComponent {
  @Input({ required: true }) user!: string
  @Input() comments?: Comment[];
  @Input() loading?: boolean;
  @Input() error?: RecipeLoadError | null;

  onComment(comment: Comment): void {
    console.log('new comment:', comment);
  }
}
