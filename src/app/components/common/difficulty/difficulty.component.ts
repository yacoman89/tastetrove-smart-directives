import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Difficulty } from '../../../models/recipe.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFaceGrinTongueWink, faFaceMeh, faSkull } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule]
})
export class DifficultyComponent {
  @Input({ required: true }) value!: Difficulty;
  readonly EASY = Difficulty.EASY;
  readonly INTERMEDIATE = Difficulty.INTERMEDIATE;
  readonly HARD = Difficulty.HARD;
  readonly easyIcon = faFaceGrinTongueWink;
  readonly intermediateIcon = faFaceMeh;
  readonly hardIcon = faSkull;
}
