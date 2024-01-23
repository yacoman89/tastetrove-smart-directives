import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrl: './recipe-list-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListPageComponent {}
