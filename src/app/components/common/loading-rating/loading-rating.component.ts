import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-loading-rating',
  templateUrl: './loading-rating.component.html',
  styleUrl: './loading-rating.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingRatingComponent {
  private readonly MAX_STARS = 5;

  get stars(): number[] {
    const stars = new Array<number>();
    for (let i = 0; i < this.MAX_STARS; i++) {
      stars.push(i);
    }
    return stars;
  }
}
