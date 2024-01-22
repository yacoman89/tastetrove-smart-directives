import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard.component').then((mod) => mod.DashboardComponent)
  },
  {
    path: 'view/:recipeLink',
    loadComponent: () => import('./components/recipe-view/recipe-view.component').then((mod) => mod.RecipeViewComponent)
  },
  {
    path: 'list/:tag',
    loadComponent: () => import('./components/recipe-list/recipe-list.component').then((mod) => mod.RecipeListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./components/create-recipe/create-recipe.component').then((mod) => mod.CreateRecipeComponent)
  },
  // Error page
  {
    path: '**',
    loadComponent: () => import('./components/error/error.component').then((mod) => mod.ErrorComponent)
  }
];
