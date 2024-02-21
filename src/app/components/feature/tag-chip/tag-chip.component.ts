import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChipComponent } from '../../common/chip/chip.component';
import { ApiLoadError } from '../../../models/errors.model';
import { Tag } from '../../../models/tag.model';
import { Color } from '../../../models/colors.model';

@Component({
  selector: 'tt-tag-chip',
  templateUrl: './tag-chip.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ChipComponent]
})
export class TagChipComponent {
  @Input() tag?: Tag;
  @Input() loading?: boolean;
  @Input() error?: ApiLoadError | null;
  readonly placeholderChipTitle = '';
  readonly placeholderChipColor = Color.AQUA_1;
}
