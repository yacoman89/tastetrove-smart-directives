import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorCombo } from '../../../models/tags.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tt-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule]
})
export class ChipComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) colors!: ColorCombo;
  @Input() removable?: boolean;
  @Input() asButton?: boolean;
  @Input() asLink?: string;
  @Output() clicked = new EventEmitter<string>();
  @Output() removed = new EventEmitter<string>();
}
