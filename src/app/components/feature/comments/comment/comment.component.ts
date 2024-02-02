import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from '../../../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tt-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule]
})
export class CommentComponent {
  @Input({ required: true }) comment!: Comment;
  readonly personIcon = faUser;
}
