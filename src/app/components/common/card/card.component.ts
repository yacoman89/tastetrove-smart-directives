import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {}
