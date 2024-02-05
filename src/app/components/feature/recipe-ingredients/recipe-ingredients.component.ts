import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApiLoadError } from '../../../models/errors.model';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../../models/ingredient.model';

@Component({
  selector: 'tt-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrl: './recipe-ingredients.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class RecipeIngredientsComponent {
  @Input() ingredients?: Ingredient[];
  @Input() loading?: boolean;
  @Input() error?: ApiLoadError | null;
}
