import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeListComponent } from '../../feature/recipe-list/recipe-list.component';
import { RecipePreviewComponent } from '../../feature/recipe-preview/recipe-preview.component';
import { Difficulty, RecipePreview } from '../../../models/recipe.model';
import { CardComponent } from '../../common/card/card.component';
import { CommentService } from '../../../services/comment/comment.service';
import { RecipesStateFacade } from '../../../store/recipes/recipes.state.facade';
import { RecipesStateModule } from '../../../store/recipes/recipes.state.module';
import { Observable, interval, map, switchMap } from 'rxjs';
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
  readonly fakeSpotlight: RecipePreview = {
    id: 0,
    name: 'Rice',
    difficulty: Difficulty.EASY,
    duration: '30 mins',
    rating: 3,
    imageUrl: 'assets/rice.jpg',
    _links: this.links
  };

  constructor(private recipesStateFacade: RecipesStateFacade, private commentService: CommentService) {
    this.recipeList$ = this.recipesStateFacade.recipeList$(this.recipeListUrl) as Observable<RecipePreview[]>;
    this.recipeListLoading$ = this.recipesStateFacade.recipeListLoading$(this.recipeListUrl);
    this.recipeListError$ = this.recipesStateFacade.recipeListError$(this.recipeListUrl);
    this.recipeSpotlight$ = interval(5000).pipe(
      switchMap((value) => this.recipeList$.pipe(map((recipes) => recipes[value % recipes.length] )))
    );
    this.recipesStateFacade.fetchRecipeList(this.recipeListUrl);
  }
}
