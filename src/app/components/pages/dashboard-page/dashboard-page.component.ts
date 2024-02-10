import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeListComponent } from '../../feature/recipe-list/recipe-list.component';
import { RecipePreviewComponent } from '../../feature/recipe-preview/recipe-preview.component';
import { PlaceholderRecipe, RecipePreview } from '../../../models/recipe.model';
import { CardComponent } from '../../common/card/card.component';
import { CommentService } from '../../../services/comment/comment.service';
import { RecipesStateFacade } from '../../../store/recipes/recipes.state.facade';
import { RecipesStateModule } from '../../../store/recipes/recipes.state.module';
import { Observable, filter, interval, map, shareReplay, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ApiLoadError } from '../../../models/errors.model';

@Component({
  selector: 'tt-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RecipePreviewComponent, RecipeListComponent, CardComponent, RecipesStateModule]
})
export class DashboardPageComponent {
  private readonly recipeListUrl = '/api/recipes';
  recipeSpotlight$: Observable<RecipePreview>;
  recipeList$: Observable<RecipePreview[]>;
  recipeListLoading$: Observable<boolean>;
  recipeListError$: Observable<ApiLoadError | null>;
  readonly links = { self: { href: '/api/recipes?id=0' }, tags: { href: '' }, comments: { href: '' }, ingredients: { href: '' }, instructions: { href: '' } };
  readonly placeholderRecipe = PlaceholderRecipe  // NOTE: only needed since async pipe can also be null;

  constructor(private recipesStateFacade: RecipesStateFacade, private commentService: CommentService) {
    this.recipeList$ = this.recipesStateFacade.recipeList$(this.recipeListUrl) as Observable<RecipePreview[]>;
    this.recipeListLoading$ = this.recipesStateFacade.recipeListLoading$(this.recipeListUrl);
    this.recipeListError$ = this.recipesStateFacade.recipeListError$(this.recipeListUrl);
    this.recipeSpotlight$ = interval(5000).pipe(
      startWith(0),
      switchMap((value) => this.recipeList$.pipe(map((recipes) => recipes[value % recipes.length] ))),
      filter((recipe) => !!recipe),
      shareReplay(1)  // NOTE: If shareReplay is not provided, then first value in the template will be null from async
    );
    this.recipesStateFacade.fetchRecipeList(this.recipeListUrl);
  }
}
