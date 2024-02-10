import { Action, State, StateContext, createSelector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { InstructionsEntityModel, InstructionsStateModel, defaultState } from './instructions.state.model';
import { FetchInstructions } from './instructions.state.actions';
import { Instruction } from '../../models/instruction.model';
import { InstructionService } from '../../services/instruction/instruction.service';

class StateManager {
  constructor(private ctx: StateContext<InstructionsStateModel>, private link: string) {}

  set patch(patch: Partial<InstructionsEntityModel>) {
    const subState = this.ctx.getState();
    const entityState = subState[this.link];
    this.ctx.patchState({ ...subState, [this.link]: { ...entityState, ...patch } });
  }

  get entity(): InstructionsEntityModel {
    return this.ctx.getState()[this.link];
  }
}

@State<InstructionsStateModel>({
  name: 'instructionsState',
  defaults: defaultState
})
@Injectable()
export class InstructionsState {
  private static entity(key: string): (state: InstructionsStateModel) => InstructionsEntityModel {
    return createSelector([InstructionsState], (state) => state[key] || { loading: true, error: null, ingredients: null });
  }

  static instructions(key: string): (entity: InstructionsEntityModel) => Instruction[] {
    return createSelector([InstructionsState.entity(key)], (entity) => entity.instructions);
  }

  static loading(key: string): (entity: InstructionsEntityModel) => boolean {
    return createSelector([InstructionsState.entity(key)], (entity) => entity.loading);
  }

  static error(key: string): (entity: InstructionsEntityModel) => ApiLoadError | null {
    return createSelector([InstructionsState.entity(key)], (entity) => entity.error);
  }

  constructor(private service: InstructionService) {}

  @Action(FetchInstructions)
  fetchInstructions(ctx: StateContext<InstructionsStateModel>, { link, options }: FetchInstructions): Observable<unknown> {
    const manager = new StateManager(ctx, link);
    if (manager.entity && !options?.force) {
      return of(manager.entity);
    }

    manager.patch = { loading: true, error: null };
    return this.service.fetchInstructions(link).pipe(
      tap((instructions) => {
        instructions.sort((a, b) => a.number - b.number);
        manager.patch = { loading: false, instructions };
      }),
      catchError((error) => {
        manager.patch = { loading: false, error };
        return throwError(() => error);
      })
    );
  }
}
