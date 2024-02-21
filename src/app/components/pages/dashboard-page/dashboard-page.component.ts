import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RecipeListComponent } from '../../feature/recipe-list/recipe-list.component';
import { RecipePreviewComponent } from '../../feature/recipe-preview/recipe-preview.component';
import { CardComponent } from '../../common/card/card.component';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RecipeListDirectiveModule } from '../../../directives/recipe-list/recipe-list.directive';
import { RecipeSpotlightDirectiveModule } from '../../../directives/recipe-spotlight/recipe-spotlight.directive';
import { RECIPES_LIST_LINK } from '../../../providers';

@Component({
  selector: 'tt-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RecipePreviewComponent,
    RecipeListComponent,
    CardComponent,
    RecipeSpotlightDirectiveModule,
    RecipeListDirectiveModule
  ]
})
export class DashboardPageComponent {
  constructor(title: Title, @Inject(RECIPES_LIST_LINK) public recipeListLink: string) {
    title.setTitle('TasteTrove | Dashboard');
  }
}
