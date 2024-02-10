import { ApiLoadError } from '../../models/errors.model';
import { Instruction } from '../../models/instruction.model';

export interface InstructionsEntityModel {
  loading: boolean;
  error: ApiLoadError | null;
  instructions: Instruction[];
}

export interface InstructionsStateModel {
  [key: string]: InstructionsEntityModel;
}

export const defaultState: InstructionsStateModel = {};
