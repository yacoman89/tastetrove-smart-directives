import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipePreviewComponent {}
