import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { LoadingRatingComponent } from '../../../common/loading-rating/loading-rating.component';

@Component({
  selector: 'tt-loading-list-item',
  templateUrl: './loading-list-item.component.html',
  styleUrl: './loading-list-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingRatingComponent]
})
export class LoadingListItemComponent {
  @HostBinding('class') get class(): string {
    return 'w-full';
  }
}
