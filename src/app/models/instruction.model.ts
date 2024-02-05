import { HateoasObject, LinkRelations, SelfLinkRelation } from './hateoas.model';

export const InstructionsLinkTemplate = '/api/recipeInstructions?recipeId={recipeId}';
export const InstructionsLinkRegex = /\{recipeId\}/;
export interface DbInstruction {
  id: number;
  recipeId: number;
  number: number;
  instructions: string;
}

type InstructionLinkRelations = SelfLinkRelation & LinkRelations<'recipe'>;
type BaseInstruction = DbInstruction & HateoasObject<InstructionLinkRelations>;

export type Instruction = BaseInstruction;
