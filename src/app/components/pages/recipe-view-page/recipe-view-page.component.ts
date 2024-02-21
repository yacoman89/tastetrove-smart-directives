import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, Inject } from '@angular/core';
import { RecipeHeaderComponent } from '../../feature/recipe-header/recipe-header.component';
import { RecipeInstructionsComponent } from '../../feature/recipe-instructions/recipe-instructions.component';
import { RecipeIngredientsComponent } from '../../feature/recipe-ingredients/recipe-ingredients.component';
import { CardComponent } from '../../common/card/card.component';
import { Recipe, RecipePreview } from '../../../models/recipe.model';
import { CommentsComponent } from '../../feature/comments/comments.component';
import { Ingredient } from '../../../models/ingredient.model';
import { Instruction } from '../../../models/instruction.model';
import { Comment } from '../../../models/comment.model';
import { RecipesStateFacade } from '../../../store/recipes/recipes.state.facade';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, shareReplay, switchMap } from 'rxjs';
import { ApiLoadError } from '../../../models/errors.model';
import { IngredientsStateFacade } from '../../../store/ingredients/ingredients.state.facade';
import { RecipesStateModule } from '../../../store/recipes/recipes.state.module';
import { IngredientsStateModule } from '../../../store/ingredients/ingredients.state.module';
import { InstructionsStateModule } from '../../../store/instructions/instructions.state.module';
import { CommentsStateModule } from '../../../store/comments/comments.state.module';
import { InstructionsStateFacade } from '../../../store/instructions/instructions.state.facade';
import { CommentsStateFacade } from '../../../store/comments/comments.state.facade';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../../models/user.model';

@Component({
  selector: 'tt-recipe-view-page',
  templateUrl: './recipe-view-page.component.html',
  styleUrl: './recipe-view-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CardComponent,
    RecipeHeaderComponent,
    RecipeIngredientsComponent,
    RecipeInstructionsComponent,
    CommentsComponent,
    RecipesStateModule,
    IngredientsStateModule,
    InstructionsStateModule,
    CommentsStateModule
  ]
})
export class RecipeViewPageComponent {
  recipe$: Observable<Recipe | RecipePreview>;
  recipeLoading$: Observable<boolean>;
  recipeLoadError$: Observable<ApiLoadError | null>;

  ingredients$: Observable<Ingredient[]>;
  ingredientsLoading$: Observable<boolean>;
  ingredientsError$: Observable<ApiLoadError | null>;

  instructions$: Observable<Instruction[]>;
  instructionsLoading$: Observable<boolean>;
  instructionsError$: Observable<ApiLoadError | null>;

  comments$: Observable<Comment[]>;
  commentsLoading$: Observable<boolean>;
  commentsError$: Observable<ApiLoadError | null>;

  user$: Observable<User>;
  private currentRecipe!: Recipe | RecipePreview;

  constructor(
    route: ActivatedRoute,
    destroyRef: DestroyRef,
    recipesStateFacade: RecipesStateFacade,
    ingredientsStateFacade: IngredientsStateFacade,
    instructionsStateFacade: InstructionsStateFacade,
    private commentsStateFacade: CommentsStateFacade
  ) {
    const recipeLink$ = route.params.pipe(map((params) => params?.['recipeLink']));
    this.recipe$ = recipeLink$.pipe(switchMap((link) => recipesStateFacade.recipe$(link)), shareReplay(1));
    this.recipeLoading$ = recipeLink$.pipe(switchMap((link) => recipesStateFacade.recipeLoading$(link)), shareReplay(1));
    this.recipeLoadError$ = recipeLink$.pipe(switchMap((link) => recipesStateFacade.recipeError$(link)));

    const ingredientsLink$ = this.recipe$.pipe(map((recipe) => recipe._links.ingredients.href));
    this.ingredients$ = ingredientsLink$.pipe(switchMap((link) => ingredientsStateFacade.ingredients$(link)));
    this.ingredientsLoading$ = ingredientsLink$.pipe(switchMap((link) => ingredientsStateFacade.loading$(link)));
    this.ingredientsError$ = ingredientsLink$.pipe(switchMap((link) => ingredientsStateFacade.error$(link)));

    const instructionsLink$ = this.recipe$.pipe(map((recipe) => recipe._links.instructions.href));
    this.instructions$ = instructionsLink$.pipe(switchMap((link) => instructionsStateFacade.instructions$(link)));
    this.instructionsLoading$ = instructionsLink$.pipe(switchMap((link) => instructionsStateFacade.loading$(link)));
    this.instructionsError$ = instructionsLink$.pipe(switchMap((link) => instructionsStateFacade.error$(link)));

    const commentsLink$ = this.recipe$.pipe(map((recipe) => recipe._links.comments.href));
    this.comments$ = commentsLink$.pipe(switchMap((link) => commentsStateFacade.comments$(link)));
    this.commentsLoading$ = commentsLink$.pipe(switchMap((link) => commentsStateFacade.loading$(link)));
    this.commentsError$ = commentsLink$.pipe(switchMap((link) => commentsStateFacade.error$(link)));

    this.user$ = commentsStateFacade.user$;

    this.recipe$.pipe(takeUntilDestroyed(destroyRef), filter((recipe) => !!recipe)).subscribe((recipe) => {
      this.currentRecipe = recipe;
      const links = recipe._links;
      ingredientsStateFacade.fetchIngredients(links.ingredients.href);
      instructionsStateFacade.fetchInstructions(links.instructions.href);
      commentsStateFacade.fetchComments(links.comments.href);
    });
  }

  onComment(comment: Comment): void {
    this.commentsStateFacade.postComment(this.currentRecipe, comment);
  }
}
