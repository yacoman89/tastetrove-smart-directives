import { Directive, Input, NgModule, Output } from '@angular/core';
import { BehaviorSubject, Observable, filter, interval, map, of, shareReplay, startWith, switchMap } from 'rxjs';
import { RecipePreview } from '../../models/recipe.model';

@Directive({
  selector: '[ttRecipeSpotlight]',
  exportAs: 'ttRecipeSpotlightDir'
})
export class RecipeSpotlightDirective {
  private haveRecipes$ = new BehaviorSubject<boolean>(false);
  private recipesValue: RecipePreview[] = [];
  @Input() set recipes(recipes: RecipePreview[]) {
    this.recipesValue = recipes;
    this.haveRecipes$.next(recipes && recipes.length > 0);
  }
  get recipes(): RecipePreview[] {
    return this.recipesValue;
  }
  @Output() recipeSpotlight: Observable<RecipePreview | null>;

  constructor() {
    this.recipeSpotlight = this.haveRecipes$.pipe(
      switchMap((haveRecipes) => {
        if (haveRecipes) {
          return interval(5000).pipe(
              startWith(0),
              map((value) => this.recipes![value % this.recipes!.length] ),
              filter((recipe) => !!recipe),
              shareReplay(1)  // NOTE: If shareReplay is not provided, then first value in the template will be null from async
          );
        }
        return of(null);
      })
    );
  }
}

@NgModule({
  declarations: [RecipeSpotlightDirective],
  exports: [RecipeSpotlightDirective]
})
export class RecipeSpotlightDirectiveModule {}
