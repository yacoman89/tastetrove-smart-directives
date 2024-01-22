import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipePreview } from '../../models/recipe.model';
import { RecipeLoadError } from '../../models/errors.model';
import { RecipeListItemComponent } from './recipe-list-item/recipe-list-item.component';
import { Tag } from '../../models/tags.model';
import { LoadingListItemComponent } from './loading-list-item/loading-list-item.component';
import { ErrorListItemComponent } from './error-list-item/error-list-item.component';

@Component({
  selector: 'tt-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RecipeListItemComponent, LoadingListItemComponent, ErrorListItemComponent]
})
export class RecipeListComponent {
  @Input() recipes?: RecipePreview[];
  @Input() loading?: boolean;
  @Input() error?: RecipeLoadError | null;
  @Input() excludeTags?: Tag[];
  @Input() ghostLoadingRowCount?: number;

  get ghostLoadingRows(): number[] {
    const rows = new Array<number>();
    for (let i = 0; i < (this.ghostLoadingRowCount || 0); i++) {
      rows.push(i);
    }
    return rows;
  }

  showRecipeHover(recipe: RecipePreview): void {
    console.log('hover', recipe.name);
  }

  hideRecipeHover(recipe: RecipePreview): void {
    console.log('hide', recipe.name);
  }
}
