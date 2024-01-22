import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Tag } from '../../../models/tags.model';
import { RecipePreview } from '../../../models/recipe.model';
import { RatingComponent } from '../../common/rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { DifficultyComponent } from '../../common/difficulty/difficulty.component';
import { ChipComponent } from '../../common/chip/chip.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tt-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrl: './recipe-list-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, RatingComponent, FontAwesomeModule, DifficultyComponent, ChipComponent]
})
export class RecipeListItemComponent {
  @Input({ required: true }) recipe!: RecipePreview;
  @Input() excludeTags?: Tag[];
  @Output() recipeHoverEnter = new EventEmitter<RecipePreview>();
  @Output() recipeHoverLeave = new EventEmitter<RecipePreview>();
  @HostBinding('class.w-full') get full(): boolean { return true; }
  readonly clockIcon = faClock;
}
