import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeListComponent } from '../../feature/recipe-list/recipe-list.component';
import { RecipePreviewComponent } from '../../feature/recipe-preview/recipe-preview.component';
import { Difficulty, RecipePreview, RecipeTag } from '../../../models/recipe.model';
import { CardComponent } from '../../common/card/card.component';
import { Color } from '../../../models/colors.model';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { CommentService } from '../../../services/comment/comment.service';

const links = { self: { href: '' }, tag: { href: '' }, recipe: { href: '' } };
const breakfastTag: RecipeTag = { id: 0, recipeId: 0, tagId: 0, title: 'Breakfast', color: Color.YELLOW_2, _links: links };
const veggiesTag: RecipeTag = { id: 0, recipeId: 0, tagId: 0, title: 'Veggies', color: Color.GREEN_1, _links: links };
const dinnerTag: RecipeTag = { id: 0, recipeId: 0, tagId: 0, title: 'Dinner', color: Color.INDIGO_1, _links: links };
const desertTag: RecipeTag = { id: 0, recipeId: 0, tagId: 0, title: 'Desert', color: Color.RED_1, _links: links };
const bakedTag: RecipeTag = { id: 0, recipeId: 0, tagId: 0, title: 'Baked', color: Color.RED_2, _links: links };
const multiStepTag: RecipeTag = { id: 0, recipeId: 0, tagId: 0, title: 'Multi-step', color: Color.BLUE_1, _links: links };

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
  readonly links = { self: { href: '/api/recipes?id=0' }, tags: { href: '' }, comments: { href: '' }, ingredients: { href: '' }, instructions: { href: '' } };
  readonly recipes: RecipePreview[] = [
    {
      id: 0,
      name: 'Rice',
      difficulty: Difficulty.EASY,
      duration: '30 mins',
      rating: 3,
      imageUrl: 'assets/rice.jpg',
      _links: this.links
    },
    {
      id: 0,
      name: 'Fried eggs',
      difficulty: Difficulty.INTERMEDIATE,
      duration: '5 mins',
      rating: 4,
      tags: [breakfastTag],
      imageUrl: 'assets/fried-eggs.jpg',
      _links: this.links
    },
    {
      id: 0,
      name: 'Roasted Brussels Sprouts',
      difficulty: Difficulty.INTERMEDIATE,
      duration: '45 mins',
      rating: 2,
      tags: [veggiesTag, dinnerTag],
      imageUrl: 'assets/brussels-sprouts.jpg',
      _links: this.links
    },
    {
      id: 0,
      name: 'Apple Pie',
      difficulty: Difficulty.HARD,
      duration: '1 Hr 45 mins',
      rating: 5,
      tags: [desertTag, dinnerTag, breakfastTag, multiStepTag, bakedTag],
      imageUrl: 'assets/apple-pie.jpg',
      _links: this.links
    }
  ];

  constructor(private recipeService: RecipeService, private commentService: CommentService) {}

  ngOnInit(): void {
    this.recipeService.fetchRecipes('/api/recipes').subscribe((recipes) => {
      console.log('recipes:', recipes);
    });

    this.commentService.fetchComments('/api/recipeComments?recipeId=2').subscribe((comments) => {
      console.log('comments:', comments);
    });
  }
}
