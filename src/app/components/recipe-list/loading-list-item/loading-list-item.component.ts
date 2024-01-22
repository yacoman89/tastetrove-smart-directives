import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tt-loading-list-item',
  templateUrl: './loading-list-item.component.html',
  styleUrl: './loading-list-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingListItemComponent {}
