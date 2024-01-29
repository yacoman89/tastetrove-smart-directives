import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RecipeHeaderComponent } from '../../feature/recipe-header/recipe-header.component';
import { RecipeInstructionsComponent } from '../../feature/recipe-instructions/recipe-instructions.component';
import { RecipeIngredientsComponent } from '../../feature/recipe-ingredients/recipe-ingredients.component';
import { CardComponent } from '../../common/card/card.component';
import { Difficulty, RecipeIngredient, RecipeInstruction, RecipePreview } from '../../../models/recipe.model';
import { Tag } from '../../../models/tags.model';
import { Color } from '../../../models/colors.model';

const veggiesTag: Tag = { title: 'Veggies', color: Color.GREEN_1 };
const dinnerTag: Tag = { title: 'Dinner', color: Color.INDIGO_1 };

@Component({
  selector: 'tt-recipe-view-page',
  templateUrl: './recipe-view-page.component.html',
  styleUrl: './recipe-view-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CardComponent, RecipeHeaderComponent, RecipeIngredientsComponent, RecipeInstructionsComponent]
})
export class RecipeViewPageComponent implements OnInit {
  readonly preview: RecipePreview = {
    name: 'Roasted Brussels Sprouts',
    difficulty: Difficulty.INTERMEDIATE,
    recipeLink: 'brussels-sprouts',
    duration: '45 mins',
    rating: 2,
    tags: [veggiesTag, dinnerTag],
    imageUrl: 'assets/brussels-sprouts.jpg'
  };
  readonly ingredients: RecipeIngredient[] = [
    { name: 'Fresh Brussels Sprouts', quantity: '3 lbs' },
    { name: 'Thick Cut Bacon', quantity: '1 lb' },
    { name: 'Olive Oil', quantity: '3 tbsp' },
    { name: 'Salt', quantity: 'to taste' },
    { name: 'Pepper', quantity: 'to taste' },
    { name: 'Balsamic Glaze', quantity: 'for serving' },
    { name: 'Parmesan Cheese', quantity: 'for serving' }
  ];
  readonly instructions: RecipeInstruction[] = [
    { number: 1, instructions: 'Preheat oven to 400F.' },
    { number: 2, instructions: 'Wash and cut all Brussels sprouts in half then spread out on a baking sheet.' },
    { number: 3, instructions: 'Cut bacon into small chunks, about 1/2" x 1/2", and distribute all around brussels sprouts on the baking sheet.' },
    { number: 4, instructions: 'Spread olive oil, salt, and pepper on top of everything.' },
    { number: 5, instructions: 'Mix all items in the baking sheet around to coat everything and evenly spread out.' },
    { number: 6, instructions: 'Put baking sheet in the oven for 25 minutes.' },
    { number: 7, instructions: 'After 25 minutes, take out baking sheet and mix everything up and spread back out on baking sheet.' },
    { number: 8, instructions: 'Put baking sheet back in the oven for 20 more minutes.' },
    { number: 10, instructions: 'Take baking sheet out and let cool for 5 minutes.' },
    { number: 11, instructions: 'Take baking sheet out and let cool for 5 minutes.' },
  ];

  readonly loading = signal(true);

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 5000);
  }
}
