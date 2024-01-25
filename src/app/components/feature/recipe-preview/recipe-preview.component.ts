import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipePreview } from '../../../models/recipe.model';
import { RatingComponent } from '../../common/rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DifficultyComponent } from '../../common/difficulty/difficulty.component';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tt-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RatingComponent, FontAwesomeModule, DifficultyComponent]
})
export class RecipePreviewComponent {
  @Input({ required: true }) recipe!: RecipePreview;
  readonly clockIcon = faClock;
}
