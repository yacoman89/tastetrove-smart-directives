import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipePreview } from '../../../models/recipe.model';
import { ApiLoadError } from '../../../models/errors.model';
import { RecipeListItemComponent } from './recipe-list-item/recipe-list-item.component';
import { LoadingListItemComponent } from './loading-list-item/loading-list-item.component';
import { ErrorListItemComponent } from './error-list-item/error-list-item.component';
import { Tag } from '../../../models/tag.model';

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
  @Input() error?: ApiLoadError | null;
  @Input() excludeTags?: Tag[];
  @Input() ghostLoadingRowCount?: number;

  get ghostLoadingRows(): number[] {
    const rows = new Array<number>();
    for (let i = 0; i < (this.ghostLoadingRowCount || 0); i++) {
      rows.push(i);
    }
    return rows;
  }
}
