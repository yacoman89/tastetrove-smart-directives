import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { RecipePreview } from '../../../../models/recipe.model';
import { RatingComponent } from '../../../common/rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { DifficultyComponent } from '../../../common/difficulty/difficulty.component';
import { ChipComponent } from '../../../common/chip/chip.component';
import { RouterModule } from '@angular/router';
import { OverlayComponent } from '../../../common/overlay/overlay.component';
import { RecipePreviewComponent } from '../../recipe-preview/recipe-preview.component';
import { Tag } from '../../../../models/tag.model';

@Component({
  selector: 'tt-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrl: './recipe-list-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, RatingComponent, FontAwesomeModule, DifficultyComponent, ChipComponent, OverlayComponent, RecipePreviewComponent]
})
export class RecipeListItemComponent {
  @Input({ required: true }) recipe!: RecipePreview;
  @Input() excludeTags?: Tag[];
  @HostBinding('class.w-full') get full(): boolean { return true; }
  readonly clockIcon = faClock;
  isHovering = false;
}
