import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingRatingComponent } from '../../../common/loading-rating/loading-rating.component';

@Component({
  selector: 'tt-loading-recipe-preview',
  templateUrl: './loading-recipe-preview.component.html',
  styleUrl: './loading-recipe-preview.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingRatingComponent]
})
export class LoadingRecipePreviewComponent {}
