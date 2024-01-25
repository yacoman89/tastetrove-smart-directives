import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeListComponent } from '../../feature/recipe-list/recipe-list.component';
import { RecipePreviewComponent } from '../../feature/recipe-preview/recipe-preview.component';
import { Difficulty, RecipePreview } from '../../../models/recipe.model';
import { RecipeLoadError } from '../../../models/errors.model';
import { Tag } from '../../../models/tags.model';
import { CardComponent } from '../../common/card/card.component';
import { Color } from '../../../models/colors.model';

const breakfastTag: Tag = { title: 'Breakfast', color: Color.YELLOW_2 };
const veggiesTag: Tag = { title: 'Veggies', color: Color.GREEN_1 };
const dinnerTag: Tag = { title: 'Dinner', color: Color.INDIGO_1 };
const desertTag: Tag = { title: 'Desert', color: Color.RED_1 };
const bakedTag: Tag = { title: 'Baked', color: Color.RED_2 };
const multiStepTag: Tag = { title: 'Multi-step', color: Color.BLUE_1 };

@Component({
  selector: 'tt-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RecipePreviewComponent, RecipeListComponent, CardComponent]
})
export class DashboardPageComponent {
  // readonly loading = true;
  readonly loading = false;
  // readonly error = new RecipeLoadError('Cannot load recipes!');
  readonly error = null;
  readonly recipes: RecipePreview[] = [
    {
      name: 'Rice',
      difficulty: Difficulty.EASY,
      recipeLink: 'rice',
      duration: '30 mins',
      rating: 3,
      imageUrl: 'assets/rice.jpg'
    },
    {
      name: 'Fried eggs',
      difficulty: Difficulty.INTERMEDIATE,
      recipeLink: 'fried-eggs',
      duration: '5 mins',
      rating: 4,
      tags: [breakfastTag],
      imageUrl: 'assets/fried-eggs.jpg'
    },
    {
      name: 'Roasted Brussle Sprouts',
      difficulty: Difficulty.INTERMEDIATE,
      recipeLink: 'brussel-sprouts',
      duration: '45 mins',
      rating: 2,
      tags: [veggiesTag, dinnerTag],
      imageUrl: 'assets/brussel-sprouts.jpg'
    },
    {
      name: 'Apple Pie',
      difficulty: Difficulty.HARD,
      recipeLink: 'apple-pie',
      duration: '1 Hr 45 mins',
      rating: 5,
      tags: [desertTag, dinnerTag, breakfastTag, multiStepTag, bakedTag],
      imageUrl: 'assets/apple-pie.jpg'
    }
  ];
}
