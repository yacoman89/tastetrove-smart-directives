import { Directive, Input, NgModule, Output } from '@angular/core';
import { RecipesStateFacade } from '../../store/recipes/recipes.state.facade';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { RecipePreview } from '../../models/recipe.model';
import { ApiLoadError } from '../../models/errors.model';
import { RecipesStateModule } from '../../store/recipes/recipes.state.module';

@Directive({
  selector: '[ttRecipeList]'
})
export class RecipeListDirective {
  private recipesLink$ = new BehaviorSubject<string | null>(null);
  @Input() set recipesLink(link: string) {
    if (link !== this.recipesLink) {
      this.recipesLink$.next(link);
    }
  }
  get recipesLink(): string | null { return this.recipesLink$.value; }
  private hasTagLink$ = new BehaviorSubject<boolean>(false);
  private tagLinkValue?: string;
  @Input() set tagLink(link: string | undefined) {
    this.tagLinkValue = link;
    this.hasTagLink$.next(!!link);
  }
  get tagLink(): string | undefined { return this.tagLinkValue }
  @Output() recipeList: Observable<RecipePreview[]>;
  @Output() recipeListLoading: Observable<boolean>;
  @Output() recipeListError: Observable<ApiLoadError | null>;

  constructor(recipesStateFacade: RecipesStateFacade) {
    this.recipeList = this.recipesLink$.pipe(switchMap((link) => {
      if (link) {
        return this.hasTagLink$.pipe(switchMap((hasTagLink) => hasTagLink ? recipesStateFacade.recipesByTag$(this.tagLink!) : recipesStateFacade.recipeList$(link)));
      }
      return of([]);
    }));
    this.recipeListLoading = this.recipesLink$.pipe(switchMap((link) => link ? recipesStateFacade.recipeListLoading$(link) : of(true)));
    this.recipeListError = this.recipesLink$.pipe(switchMap((link) => link ? recipesStateFacade.recipeListError$(link) : of(null)));
  }
}

@NgModule({
  declarations: [RecipeListDirective],
  exports: [RecipeListDirective],
  imports: [RecipesStateModule]
})
export class RecipeListDirectiveModule {}
