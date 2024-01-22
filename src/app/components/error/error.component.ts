import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}
