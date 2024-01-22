import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipeLoadError } from '../../../models/errors.model';

@Component({
  selector: 'tt-error-list-item',
  templateUrl: './error-list-item.component.html',
  styleUrl: './error-list-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorListItemComponent {
  @Input({ required: true }) error!: RecipeLoadError;
}
