import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tt-overlay',
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {
  @Input({ required: true }) isVisible!: boolean;
}
