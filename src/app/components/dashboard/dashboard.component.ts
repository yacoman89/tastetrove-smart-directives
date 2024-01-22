import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipePreviewComponent } from '../recipe-preview/recipe-preview.component';
import { Difficulty, RecipePreview } from '../../models/recipe.model';
import { RecipeLoadError } from '../../models/errors.model';
import { Tag } from '../../models/tags.model';
import { CardComponent } from '../common/card/card.component';

const breakfastTag: Tag = { title: 'Breakfast', colors: { background: 'bg-yellow-100', font: 'text-yellow-800', accent: 'ring-yellow-600/20' } };
const veggiesTag: Tag = { title: 'Veggies', colors: { background: 'bg-green-100', font: 'text-green-700', accent: 'ring-green-600/20' } };
const dinnerTag: Tag = { title: 'Dinner', colors: { background: 'bg-indigo-100', font: 'text-indigo-700', accent: 'ring-indigo-700/10' } };
const desertTag: Tag = { title: 'Desert', colors: { background: 'bg-red-100', font: 'text-red-700', accent: 'ring-red-600/10' } };
const bakedTag: Tag = { title: 'Baked', colors: { background: 'bg-pink-100', font: 'text-pink-700', accent: 'ring-pink-700/10' } };
const multiStepTag: Tag = { title: 'Multi-step', colors: { background: 'bg-blue-100', font: 'text-blue-700', accent: 'ring-blue-700/10' } };

@Component({
  selector: 'tt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RecipePreviewComponent, RecipeListComponent, CardComponent]
})
export class DashboardComponent {
  // readonly loading = true;
  readonly loading = false;
  // readonly error = new RecipeLoadError('Cannot load recipes!');
  readonly error = null;
  readonly recipes: RecipePreview[] = [
    {
      name: 'Rice',
      difficulty: Difficulty.EASY,
      link: 'rice',
      duration: '30 mins',
      rating: 3
    },
    {
      name: 'Fried eggs',
      difficulty: Difficulty.INTERMEDIATE,
      link: 'fried-eggs',
      duration: '5 mins',
      rating: 4,
      tags: [breakfastTag]
    },
    {
      name: 'Roasted Brussle Sprouts',
      difficulty: Difficulty.INTERMEDIATE,
      link: 'sprouts',
      duration: '45 mins',
      rating: 2,
      tags: [veggiesTag, dinnerTag]
    },
    {
      name: 'Apple Pie',
      difficulty: Difficulty.HARD,
      link: 'apple-pie',
      duration: '1 Hr 45 mins',
      rating: 5,
      tags: [desertTag, dinnerTag, breakfastTag, multiStepTag, bakedTag]
    }
  ];
}
