import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeListComponent } from '../../feature/recipe-list/recipe-list.component';
import { RecipePreviewComponent } from '../../feature/recipe-preview/recipe-preview.component';
import { CardComponent } from '../../common/card/card.component';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RecentRecipesDirectiveModule } from '../../../directives/recent-recipes/recent-recipes.directive';
import { RecipeSpotlightDirectiveModule } from '../../../directives/recipe-spotlight/recipe-spotlight.directive';

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
    RecentRecipesDirectiveModule
  ]
})
export class DashboardPageComponent {
  constructor(title: Title) {
    title.setTitle('TasteTrove | Dashboard');
  }
}
