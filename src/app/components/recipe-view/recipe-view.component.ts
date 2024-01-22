import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeViewComponent {}
