import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { ApiLoadError } from '../../../models/errors.model';
import { CommentComponent } from './comment/comment.component';
import { Comment } from '../../../models/comment.model';

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
  @Input() error?: ApiLoadError | null;

  onComment(comment: Comment): void {
    console.log('new comment:', comment);
  }
}
