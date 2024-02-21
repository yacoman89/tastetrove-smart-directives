import { ChangeDetectionStrategy, Component, DestroyRef, Inject } from '@angular/core';
import { RecipesStateModule } from '../../../store/recipes/recipes.state.module';
import { RecipesStateFacade } from '../../../store/recipes/recipes.state.facade';
import { RecipePreview } from '../../../models/recipe.model';
import { Observable, combineLatest, filter, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../common/card/card.component';
import { RecipeListComponent } from '../../feature/recipe-list/recipe-list.component';
import { ApiLoadError } from '../../../models/errors.model';
import { RECIPES_LIST_LINK } from '../../../providers';
import { Tag } from '../../../models/tag.model';
import { ChipComponent } from '../../common/chip/chip.component';
import { Color } from '../../../models/colors.model';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrl: './recipe-list-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CardComponent, RecipeListComponent, RecipesStateModule, ChipComponent]
})
export class RecipeListPageComponent {
  recipeList$: Observable<RecipePreview[]>;
  recipeListLoading$: Observable<boolean>;
  recipeListError$: Observable<ApiLoadError | null>;
  tag$: Observable<Tag>;
  readonly placeholderChipTitle = '';
  readonly placeholderChipColor = Color.AQUA_1;

  constructor(@Inject(RECIPES_LIST_LINK) recipesLink: string, recipesStateFacade: RecipesStateFacade, route: ActivatedRoute, title: Title, destroyRef: DestroyRef) {
    title.setTitle('TasteTrove | List');
    const tagLink$ = route.params.pipe(map((params) => params?.['tagLink']));
    this.recipeList$ = tagLink$.pipe(
      switchMap((link) => recipesStateFacade.recipesByTag$(link))
    );
    this.recipeListLoading$ = recipesStateFacade.recipeListLoading$(recipesLink);
    this.recipeListError$ = recipesStateFacade.recipeListError$(recipesLink);
    this.tag$ = combineLatest([tagLink$, this.recipeList$]).pipe(
      map(([tagLink, recipes]) => recipes[0].tags?.find((tag) => tag._links.tag.href === tagLink) ?? null),
      filter((tag) => !!tag)
    ) as Observable<Tag>;
    this.tag$.pipe(takeUntilDestroyed(destroyRef)).subscribe((tag) => title.setTitle(`TasteTrove | List '${tag.title}'`));
  }
}
