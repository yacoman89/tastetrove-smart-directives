import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-create-recipe-page',
  templateUrl: './create-recipe-page.component.html',
  styleUrl: './create-recipe-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipePageComponent {}
