import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import {
  BaseRecipeTag,
  DbRecipe,
  DbRecipeTag,
  RecipeLinkRegex,
  RecipeLinkTemplate,
  RecipePreview,
  RecipeTag,
  RecipeTagsLinkRegex,
  RecipeTagsLinkTemplate,
  RecipeTagsRecipeLinkRegex,
  RecipeTagsRecipeLinkTemplate,
} from '../../models/recipe.model';
import { Link } from '../../models/hateoas.model';
import {
  IngredientLinkRegex,
  IngredientLinkTemplate,
} from '../../models/ingredient.model';
import {
  InstructionsLinkRegex,
  InstructionsLinkTemplate,
} from '../../models/instruction.model';
import {
  CommentsLinkRegex,
  CommentsLinkTemplate,
} from '../../models/comment.model';
import { ApiLoadError } from '../../models/errors.model';
import { TagLinkRegex, TagLinkTemplate } from '../../models/tag.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  static buildSelfLink(id: number): Link {
    return { href: RecipeLinkTemplate.replace(RecipeLinkRegex, `${id}`) };
  }

  private static buildTagsLink(id: number): Link {
    return {
      href: RecipeTagsRecipeLinkTemplate.replace(
        RecipeTagsRecipeLinkRegex,
        `${id}`
      ),
    };
  }

  private static buildIngredientsLink(id: number): Link {
    return {
      href: IngredientLinkTemplate.replace(IngredientLinkRegex, `${id}`),
    };
  }

  private static buildInstructionsLink(id: number): Link {
    return {
      href: InstructionsLinkTemplate.replace(InstructionsLinkRegex, `${id}`),
    };
  }

  private static buildCommentsLink(id: number): Link {
    return { href: CommentsLinkTemplate.replace(CommentsLinkRegex, `${id}`) };
  }

  private static buildRecipeTagSelfLink(id: number): Link {
    return {
      href: RecipeTagsLinkTemplate.replace(RecipeTagsLinkRegex, `${id}`),
    };
  }

  private static buildRecipeTagRecipeLink(id: number): Link {
    return {
      href: RecipeTagsRecipeLinkTemplate.replace(
        RecipeTagsRecipeLinkRegex,
        `${id}`
      ),
    };
  }

  private static buildRecipeTagTagLink(id: number): Link {
    return { href: TagLinkTemplate.replace(TagLinkRegex, `${id}`) };
  }

  constructor(private http: HttpClient) {}

  fetchRecipes(url: string): Observable<RecipePreview[]> {
    return this.http.get<DbRecipe[]>(url).pipe(
      map((recipes) => this.addRecipesLinkRelations(recipes)),
      switchMap((recipes) => this.fetchRecipesTagsAndAdd(recipes)),
      catchError((error) =>
        throwError(() => new ApiLoadError('Failed to load recipes', error))
      )
    );
  }

  fetchRecipe(url: string): Observable<RecipePreview> {
    return this.http.get<DbRecipe[]>(url).pipe(
      map((recipes) => this.addRecipeLinkRelations(recipes[0])),
      switchMap((recipe) => this.fetchRecipeTagsAndAdd(recipe)),
      catchError((error) =>
        throwError(() => new ApiLoadError('Failed to load recipes', error))
      )
    );
  }

  private addRecipesLinkRelations(recipes: DbRecipe[]): RecipePreview[] {
    return recipes.map((recipe) => this.addRecipeLinkRelations(recipe));
  }

  private addRecipeLinkRelations(recipe: DbRecipe): RecipePreview {
    return {
      ...recipe,
      _links: {
        self: RecipeService.buildSelfLink(recipe.id),
        tags: RecipeService.buildTagsLink(recipe.id),
        ingredients: RecipeService.buildIngredientsLink(recipe.id),
        instructions: RecipeService.buildInstructionsLink(recipe.id),
        comments: RecipeService.buildCommentsLink(recipe.id),
      },
    };
  }

  private fetchRecipesTagsAndAdd(
    recipes: RecipePreview[]
  ): Observable<RecipePreview[]> {
    return forkJoin(
      recipes.map((recipe) => this.fetchRecipeTagsAndAdd(recipe))
    );
  }

  private fetchRecipeTagsAndAdd(
    recipe: RecipePreview
  ): Observable<RecipePreview> {
    return this.fetchRecipeTags(recipe._links.tags.href).pipe(
      map((tags) => ({ ...recipe, tags }))
    );
  }

  private fetchRecipeTags(url: string): Observable<RecipeTag[] | any> {
    return this.http.get<DbRecipeTag[]>(url).pipe(
      map((recipeTags) => this.appRecipeTagsLinkRelations(recipeTags)),
      catchError((error) =>
        throwError(() => new ApiLoadError('Failed to load recipe tags', error))
      )
    );
  }

  private appRecipeTagsLinkRelations(
    recipeTags: DbRecipeTag[]
  ): BaseRecipeTag[] {
    return recipeTags.map((recipeTag) =>
      this.appRecipeTagLinkRelations(recipeTag)
    );
  }

  private appRecipeTagLinkRelations(recipeTag: DbRecipeTag): BaseRecipeTag {
    return {
      ...recipeTag,
      _links: {
        self: RecipeService.buildRecipeTagSelfLink(recipeTag.id),
        tag: RecipeService.buildRecipeTagTagLink(recipeTag.tagId),
        recipe: RecipeService.buildRecipeTagRecipeLink(recipeTag.recipeId),
      },
    };
  }
}
