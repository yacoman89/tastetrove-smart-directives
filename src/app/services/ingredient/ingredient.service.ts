import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { DbIngredient, Ingredient, IngredientLinkRegex, IngredientLinkTemplate } from '../../models/ingredient.model';
import { Link } from '../../models/hateoas.model';
import { RecipeService } from '../recipe/recipe.service';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  static buildSelfLink(id: number): Link {
    return { href: IngredientLinkTemplate.replace(IngredientLinkRegex, `${id}`) };
  }

  constructor(private http: HttpClient) {}

  fetchIngredients(url: string): Observable<Ingredient[]> {
    return this.http.get<DbIngredient[]>(url).pipe(
      map((ingredients) => this.addLinkRelations(ingredients)),
      catchError((error) => throwError(() => new ApiLoadError('Failed to load ingredients', error)))
    );
  }

  private addLinkRelations(ingredients: DbIngredient[]): Ingredient[] {
    return ingredients.map((ingredient) => ({
      ...ingredient,
      _links: {
        self: IngredientService.buildSelfLink(ingredient.id),
        recipe: RecipeService.buildSelfLink(ingredient.recipeId)
      }
    }));
  }
}
