import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipeIngredient } from '../../../models/recipe.model';
import { RecipeLoadError } from '../../../models/errors.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrl: './recipe-ingredients.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class RecipeIngredientsComponent {
  @Input() ingredients?: RecipeIngredient[];
  @Input() loading?: boolean;
  @Input() error?: RecipeLoadError | null;
}
