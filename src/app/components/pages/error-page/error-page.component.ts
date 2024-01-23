import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {}
