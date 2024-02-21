import { Directive, Inject, NgModule, Output } from '@angular/core';
import { RECIPES_LIST_LINK } from '../../providers';
import { RecipesStateFacade } from '../../store/recipes/recipes.state.facade';
import { Observable } from 'rxjs';
import { RecipePreview } from '../../models/recipe.model';
import { ApiLoadError } from '../../models/errors.model';
import { RecipesStateModule } from '../../store/recipes/recipes.state.module';

@Directive({
  selector: '[ttRecentRecipes]'
})
export class RecentRecipesDirective {
  @Output() recipesList: Observable<RecipePreview[]>;
  @Output() recipesListLoading: Observable<boolean>;
  @Output() recipesListError: Observable<ApiLoadError | null>;

  constructor(@Inject(RECIPES_LIST_LINK) recipesLink: string, recipesStateFacade: RecipesStateFacade) {
    this.recipesList = recipesStateFacade.recipeList$(recipesLink);
    this.recipesListLoading = recipesStateFacade.recipeListLoading$(recipesLink);
    this.recipesListError = recipesStateFacade.recipeListError$(recipesLink);
  }
}

@NgModule({
  declarations: [RecentRecipesDirective],
  exports: [RecentRecipesDirective],
  imports: [RecipesStateModule]
})
export class RecentRecipesDirectiveModule {}
