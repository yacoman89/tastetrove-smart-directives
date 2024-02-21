import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RecipeListComponent } from '../../feature/recipe-list/recipe-list.component';
import { RecipePreviewComponent } from '../../feature/recipe-preview/recipe-preview.component';
import { PlaceholderRecipe, RecipePreview } from '../../../models/recipe.model';
import { CardComponent } from '../../common/card/card.component';
import { RecipesStateFacade } from '../../../store/recipes/recipes.state.facade';
import { RecipesStateModule } from '../../../store/recipes/recipes.state.module';
import { Observable, filter, interval, map, shareReplay, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ApiLoadError } from '../../../models/errors.model';
import { RECIPES_LIST_LINK } from '../../../providers';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'tt-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RecipePreviewComponent, RecipeListComponent, CardComponent, RecipesStateModule]
})
export class DashboardPageComponent {
  recipeSpotlight$: Observable<RecipePreview>;
  recipeList$: Observable<RecipePreview[]>;
  recipeListLoading$: Observable<boolean>;
  recipeListError$: Observable<ApiLoadError | null>;
  readonly placeholderRecipe = PlaceholderRecipe  // NOTE: only needed since async pipe can also be null;

  constructor(@Inject(RECIPES_LIST_LINK) recipesLink: string, recipesStateFacade: RecipesStateFacade, title: Title) {
    title.setTitle('TasteTrove | Dashboard');
    this.recipeList$ = recipesStateFacade.recipeList$(recipesLink) as Observable<RecipePreview[]>;
    this.recipeListLoading$ = recipesStateFacade.recipeListLoading$(recipesLink);
    this.recipeListError$ = recipesStateFacade.recipeListError$(recipesLink);
    this.recipeSpotlight$ = interval(5000).pipe(
      startWith(0),
      switchMap((value) => this.recipeList$.pipe(map((recipes) => recipes[value % recipes.length] ))),
      filter((recipe) => !!recipe),
      shareReplay(1)  // NOTE: If shareReplay is not provided, then first value in the template will be null from async
    );
  }
}
