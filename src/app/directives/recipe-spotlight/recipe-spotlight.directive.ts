import { Directive, Inject, NgModule, Output } from '@angular/core';
import { RecipesStateModule } from '../../store/recipes/recipes.state.module';
import { RECIPES_LIST_LINK } from '../../providers';
import { RecipesStateFacade } from '../../store/recipes/recipes.state.facade';
import { Observable, filter, interval, map, shareReplay, startWith, switchMap } from 'rxjs';
import { RecipePreview } from '../../models/recipe.model';
import { ApiLoadError } from '../../models/errors.model';

@Directive({
  selector: '[ttRecipeSpotlight]'
})
export class RecipeSpotlightDirective {
  @Output() recipeSpotlight: Observable<RecipePreview>;
  @Output() recipesLoading: Observable<boolean>;
  @Output() recipesError: Observable<ApiLoadError | null>;

  constructor(@Inject(RECIPES_LIST_LINK) recipeLink: string, recipesStateFacade: RecipesStateFacade) {
    this.recipeSpotlight = interval(5000).pipe(
      startWith(0),
      switchMap((value) => recipesStateFacade.recipeList$(recipeLink).pipe(map((recipes) => recipes[value % recipes.length] ))),
      filter((recipe) => !!recipe),
      shareReplay(1)  // NOTE: If shareReplay is not provided, then first value in the template will be null from async
    );
    this.recipesLoading = recipesStateFacade.recipeListLoading$(recipeLink);
    this.recipesError = recipesStateFacade.recipeListError$(recipeLink);
  }
}

@NgModule({
  declarations: [RecipeSpotlightDirective],
  exports: [RecipeSpotlightDirective],
  imports: [RecipesStateModule]
})
export class RecipeSpotlightDirectiveModule {}
