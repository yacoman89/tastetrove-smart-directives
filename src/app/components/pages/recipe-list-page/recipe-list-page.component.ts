import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RecipesStateModule } from '../../../store/recipes/recipes.state.module';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../common/card/card.component';
import { RecipeListComponent } from '../../feature/recipe-list/recipe-list.component';
import { RECIPES_LIST_LINK } from '../../../providers';
import { Tag } from '../../../models/tag.model';
import { Title } from '@angular/platform-browser';
import { RecipeListDirectiveModule } from '../../../directives/recipe-list/recipe-list.directive';
import { TagFromRecipesDirective } from '../../../directives/tag-from-recipes/tag-from-recipes.directive';
import { TagChipComponent } from '../../feature/tag-chip/tag-chip.component';

@Component({
  selector: 'tt-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrl: './recipe-list-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CardComponent,
    RecipeListComponent,
    RecipesStateModule,
    TagChipComponent,
    TagFromRecipesDirective,
    RecipeListDirectiveModule
  ]
})
export class RecipeListPageComponent {
  tagLink$: Observable<string>;

  constructor(@Inject(RECIPES_LIST_LINK) public recipesLink: string, route: ActivatedRoute, private title: Title) {
    title.setTitle('TasteTrove | List');
    this.tagLink$ = route.params.pipe(map((params) => params?.['tagLink']));
  }

  setTagInTitle(tag: Tag | null): void {
    if (tag) {
      this.title.setTitle(`TasteTrove | List '${tag.title}'`);
    }
  }
}
