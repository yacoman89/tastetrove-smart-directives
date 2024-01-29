import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipeLoadError } from '../../../models/errors.model';
import { RecipeInstruction } from '../../../models/recipe.model';

@Component({
  selector: 'tt-recipe-instructions',
  templateUrl: './recipe-instructions.component.html',
  styleUrl: './recipe-instructions.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeInstructionsComponent {
  @Input() instructions?: RecipeInstruction[];
  @Input() loading?: boolean;
  @Input() error?: RecipeLoadError | null;
}
