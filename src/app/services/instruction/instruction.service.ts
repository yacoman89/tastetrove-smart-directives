import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { Link } from '../../models/hateoas.model';
import { RecipeService } from '../recipe/recipe.service';
import { DbInstruction, Instruction, InstructionsLinkRegex, InstructionsLinkTemplate } from '../../models/instruction.model';

@Injectable({ providedIn: 'root' })
export class InstructionService {
  static buildSelfLink(id: number): Link {
    return { href: InstructionsLinkTemplate.replace(InstructionsLinkRegex, `${id}`) };
  }

  constructor(private http: HttpClient) {}

  fetchInstructions(url: string): Observable<Instruction[]> {
    return this.http.get<DbInstruction[]>(url).pipe(
      map((instruction) => this.addLinkRelations(instruction)),
      catchError((error) => throwError(() => new ApiLoadError('Failed to load instruction', error)))
    );
  }

  private addLinkRelations(instructions: DbInstruction[]): Instruction[] {
    return instructions.map((instruction) => ({
      ...instruction,
      _links: {
        self: InstructionService.buildSelfLink(instruction.id),
        recipe: RecipeService.buildSelfLink(instruction.recipeId)
      }
    }));
  }
}
