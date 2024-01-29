import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingRatingComponent } from '../../../common/loading-rating/loading-rating.component';

@Component({
  selector: 'tt-loading-recipe-header',
  templateUrl: './loading-recipe-header.component.html',
  styleUrl: './loading-recipe-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingRatingComponent]
})
export class LoadingRecipeHeaderComponent {}
