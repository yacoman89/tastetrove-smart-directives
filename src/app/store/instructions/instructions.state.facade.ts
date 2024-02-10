import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { FetchInstructions } from './instructions.state.actions';
import { InstructionsState } from './instructions.state';
import { Instruction } from '../../models/instruction.model';

@Injectable()
export class InstructionsStateFacade {
  constructor(private store: Store) {}

  instructions$(fetchLink: string): Observable<Instruction[]> {
    return this.store.select(InstructionsState.instructions(fetchLink));
  }

  loading$(fetchLink: string): Observable<boolean> {
    return this.store.select(InstructionsState.loading(fetchLink));
  }

  error$(fetchLink: string): Observable<ApiLoadError | null> {
    return this.store.select(InstructionsState.error(fetchLink));
  }

  fetchInstructions(link: string, options?: { force: boolean }): Observable<unknown> {
    return this.store.dispatch(new FetchInstructions(link, options));
  }
}
