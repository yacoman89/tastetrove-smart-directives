import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe, RecipePreview, Rating, Difficulty } from '../../../models/recipe.model';
import { RatingComponent } from '../../common/rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DifficultyComponent } from '../../common/difficulty/difficulty.component';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { ApiLoadError } from '../../../models/errors.model';
import { LoadingRecipePreviewComponent } from './loading-recipe-preview/loading-recipe-preview.component';

@Component({
  selector: 'tt-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RatingComponent, FontAwesomeModule, DifficultyComponent, LoadingRecipePreviewComponent]
})
export class RecipePreviewComponent {
  @Input() recipe?: RecipePreview | Recipe;
  @Input() loading?: boolean;
  @Input() error?: ApiLoadError | null;
  readonly clockIcon = faClock;
  readonly placeholderRating: Rating = 1;
  readonly placeholderDifficulty = Difficulty.EASY;
}
