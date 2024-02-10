import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Color, ColorMatcher } from '../../../models/colors.model';

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
  @Input({ required: true }) set color(color: Color) {
    this.colors.color = color;
  }
  get color(): Color {
    return this.colors.color;
  }
  @Input() removable?: boolean;
  @Input() asButton?: boolean;
  @Input() asLink?: string | string[];
  @Output() clicked = new EventEmitter<string>();
  @Output() removed = new EventEmitter<string>();
  colors = new ColorMatcher();
}
