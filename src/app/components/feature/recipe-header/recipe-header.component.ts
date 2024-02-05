import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipePreview } from '../../../models/recipe.model';
import { ApiLoadError } from '../../../models/errors.model';
import { CommonModule } from '@angular/common';
import { LoadingRecipeHeaderComponent } from './loading-recipe-header/loading-recipe-header.component';
import { RatingComponent } from '../../common/rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DifficultyComponent } from '../../common/difficulty/difficulty.component';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tt-recipe-header',
  templateUrl: './recipe-header.component.html',
  styleUrl: './recipe-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LoadingRecipeHeaderComponent, RatingComponent, FontAwesomeModule, DifficultyComponent]
})
export class RecipeHeaderComponent {
  @Input() recipePreview?: RecipePreview;
  @Input() loading?: boolean;
  @Input() error?: ApiLoadError | null;
  readonly clockIcon = faClock;
}
