import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApiLoadError } from '../../../models/errors.model';
import { Instruction } from '../../../models/instruction.model';

@Component({
  selector: 'tt-recipe-instructions',
  templateUrl: './recipe-instructions.component.html',
  styleUrl: './recipe-instructions.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeInstructionsComponent {
  @Input() instructions?: Instruction[];
  @Input() loading?: boolean;
  @Input() error?: ApiLoadError | null;
}
