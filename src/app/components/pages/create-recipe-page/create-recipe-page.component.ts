import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'tt-create-recipe-page',
  templateUrl: './create-recipe-page.component.html',
  styleUrl: './create-recipe-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipePageComponent {
  constructor(title: Title) {
    title.setTitle('TasteTrove | New Recipe');
  }
}
