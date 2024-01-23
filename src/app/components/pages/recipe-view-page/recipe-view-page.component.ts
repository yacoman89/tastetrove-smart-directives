import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-recipe-view-page',
  templateUrl: './recipe-view-page.component.html',
  styleUrl: './recipe-view-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeViewPageComponent {}
