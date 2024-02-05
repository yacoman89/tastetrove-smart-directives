import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RecipeHeaderComponent } from '../../feature/recipe-header/recipe-header.component';
import { RecipeInstructionsComponent } from '../../feature/recipe-instructions/recipe-instructions.component';
import { RecipeIngredientsComponent } from '../../feature/recipe-ingredients/recipe-ingredients.component';
import { CardComponent } from '../../common/card/card.component';
import { Difficulty, RecipePreview, RecipeTag} from '../../../models/recipe.model';
import { Color } from '../../../models/colors.model';
import { CommentsComponent } from '../../feature/comments/comments.component';
import { Ingredient } from '../../../models/ingredient.model';
import { Instruction } from '../../../models/instruction.model';
import { Comment } from '../../../models/comment.model';

const tagLinks = { self: { href: '' }, tag: { href: '' }, recipe: { href: '' } };
const veggiesTag: RecipeTag = {
  id: 0,
  recipeId: 0,
  tagId: 0,
  title: 'Veggies',
  color: Color.GREEN_1,
  _links: tagLinks
};
const dinnerTag: RecipeTag = {
  id: 0,
  recipeId: 0,
  tagId: 0,
  title: 'Dinner',
  color: Color.INDIGO_1,
  _links: tagLinks
};

@Component({
  selector: 'tt-recipe-view-page',
  templateUrl: './recipe-view-page.component.html',
  styleUrl: './recipe-view-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CardComponent, RecipeHeaderComponent, RecipeIngredientsComponent, RecipeInstructionsComponent, CommentsComponent]
})
export class RecipeViewPageComponent implements OnInit {
  readonly user = 'Test user';
  readonly preview: RecipePreview = {
    id: 0,
    name: 'Roasted Brussels Sprouts',
    difficulty: Difficulty.INTERMEDIATE,
    duration: '45 mins',
    rating: 2,
    tags: [veggiesTag, dinnerTag],
    imageUrl: 'assets/brussels-sprouts.jpg',
    _links: {
      self: { href: '' },
      comments: { href: '' },
      ingredients: { href: '' },
      instructions: { href: '' },
      tags: { href: '' }
    }
  };
  readonly ingredients: Ingredient[] = [
    { id: 0, recipeId: 0, name: 'Fresh Brussels Sprouts', quantity: '3 lbs', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, name: 'Thick Cut Bacon', quantity: '1 lb', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, name: 'Olive Oil', quantity: '3 tbsp', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, name: 'Salt', quantity: 'to taste', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, name: 'Pepper', quantity: 'to taste', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, name: 'Balsamic Glaze', quantity: 'for serving', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, name: 'Parmesan Cheese', quantity: 'for serving', _links: { self: { href: '' }, recipe: { href: '' } } }
  ];
  readonly instructions: Instruction[] = [
    { id: 0, recipeId: 0, number: 1, instructions: 'Preheat oven to 400F.', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, number: 2, instructions: 'Wash and cut all Brussels sprouts in half then spread out on a baking sheet.', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, number: 3, instructions: 'Cut bacon into small chunks, about 1/2" x 1/2", and distribute all around brussels sprouts on the baking sheet.', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, number: 4, instructions: 'Spread olive oil, salt, and pepper on top of everything.', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, number: 5, instructions: 'Mix all items in the baking sheet around to coat everything and evenly spread out.', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, number: 6, instructions: 'Put baking sheet in the oven for 25 minutes.', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, number: 7, instructions: 'After 25 minutes, take out baking sheet and mix everything up and spread back out on baking sheet.', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, number: 8, instructions: 'Put baking sheet back in the oven for 20 more minutes.', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, number: 10, instructions: 'Take baking sheet out and let cool for 5 minutes.', _links: { self: { href: '' }, recipe: { href: '' } } },
    { id: 0, recipeId: 0, number: 11, instructions: 'Take baking sheet out and let cool for 5 minutes.', _links: { self: { href: '' }, recipe: { href: '' } } }
  ];
  readonly comments: Comment[] = [
    { id: 0, recipeId: 0, userId: 0, user: 'Mike', date: (new Date()).toISOString(), comment: 'this was way to hard for me', _links: { self: { href: '' }, recipe: { href: '' }, user: { href: '' } } },
    // { id: 0, recipeId: 0, userId: 0, user: 'Mary', date: (new Date()).toISOString(), comment: 'this was way to hard for me', _links: { self: { href: '' }, recipe: { href: '' }, user: { href: '' } } },
    // { id: 0, recipeId: 0, userId: 0, user: 'Linda', date: (new Date()).toISOString(), comment: 'this was way to hard for me', _links: { self: { href: '' }, recipe: { href: '' }, user: { href: '' } } },
    // { id: 0, recipeId: 0, userId: 0, user: 'Steve', date: (new Date()).toISOString(), comment: 'this was way to hard for me', _links: { self: { href: '' }, recipe: { href: '' }, user: { href: '' } } },
  ];

  readonly loading = signal(true);

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 5000);
  }
}
