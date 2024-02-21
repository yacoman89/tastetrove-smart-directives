import { Directive, Input, Output } from '@angular/core';
import { RecipePreview } from '../../models/recipe.model';
import { Tag } from '../../models/tag.model';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Directive({
  selector: '[ttTagFromRecipes]',
  exportAs: 'ttTagFromRecipesDir',
  standalone: true
})
export class TagFromRecipesDirective {
  private recipes$ = new BehaviorSubject<RecipePreview[]>([]);
  private tagLink$ = new BehaviorSubject<string | undefined>(undefined);
  @Input() set recipes(recipes: RecipePreview[]) { this.recipes$.next(recipes); }
  get recipes(): RecipePreview[] { return this.recipes$.value; }
  @Input() set tagLink(link: string | undefined) { this.tagLink$.next(link); }
  get tagLink(): string | undefined { return this.tagLink$.value; }
  @Output() tag: Observable<Tag | null>;


  constructor() {
    this.tag = combineLatest([this.recipes$, this.tagLink$]).pipe(
      map(([recipes, tagLink]) => {
        if (!recipes || recipes.length === 0 || !tagLink) {
          return null;
        }
        return recipes[0].tags?.find((tag) => tag._links.tag.href === tagLink) ?? null
      })
    );
  }
}
