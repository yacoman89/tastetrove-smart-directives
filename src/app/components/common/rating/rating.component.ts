import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Rating } from '../../../models/recipe.model';

@Component({
  selector: 'tt-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {
  @Input({ required: true }) value!: Rating;

  get stars(): number[] {
    const stars = new Array<number>();
    for (let i = 0; i < this.value; i++) {
      stars.push(i);
    }
    return stars;
  }

  get notStars(): number[] {
    const notStars = new Array<number>();
    for (let i = 0; i < 5 - this.value; i++) {
      notStars.push(i);
    }
    return notStars;
  }
}
