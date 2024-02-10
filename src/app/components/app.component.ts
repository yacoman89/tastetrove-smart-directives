import { ChangeDetectionStrategy, Component, HostBinding, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { RECIPES_LIST_LINK } from '../providers';
import { RecipesStateFacade } from '../store/recipes/recipes.state.facade';
import { RecipesStateModule } from '../store/recipes/recipes.state.module';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, NavbarComponent, RecipesStateModule]
})
export class AppComponent {
  @HostBinding('class.h-full') get full() { return true; }
  @HostBinding('class.flex') get flex() { return true; }
  @HostBinding('class.flex-col') get flexCol() { return true; }

  constructor(@Inject(RECIPES_LIST_LINK) recipesLink: string, recipesStateFacade: RecipesStateFacade) {
    recipesStateFacade.fetchRecipeList(recipesLink);
  }
}
