import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipeComponent {}
