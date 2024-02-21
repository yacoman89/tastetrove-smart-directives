import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { CREATE_READY } from './providers';



export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/pages/dashboard-page/dashboard-page.component').then((mod) => mod.DashboardPageComponent)
  },
  {
    path: 'view/:recipeLink',
    loadComponent: () => import('./components/pages/recipe-view-page/recipe-view-page.component').then((mod) => mod.RecipeViewPageComponent)
  },
  {
    path: 'list/:tagLink',
    loadComponent: () => import('./components/pages/recipe-list-page/recipe-list-page.component').then((mod) => mod.RecipeListPageComponent)
  },
  {
    path: 'create',
    canActivate: [() => inject(CREATE_READY) || inject(Router).parseUrl('/error')],
    loadComponent: () => import('./components/pages/create-recipe-page/create-recipe-page.component').then((mod) => mod.CreateRecipePageComponent)
  },
  // Error page
  {
    path: 'error',
    loadComponent: () => import('./components/pages/error-page/error-page.component').then((mod) => mod.ErrorPageComponent)
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];
