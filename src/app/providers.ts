import { InjectionToken, Provider } from '@angular/core';

export const createValueProvider = <T>(provide: InjectionToken<T>, value: unknown): Provider => ({ provide, useValue: value });

export const WINDOW = new InjectionToken<Window>('window');
export const WindowProvider = createValueProvider(WINDOW, window);
export const RECIPES_LIST_LINK = new InjectionToken<string>('recipes list link');
export const RecipesLinkProvider = createValueProvider(RECIPES_LIST_LINK, '/api/recipes');
export const USER_LINK = new InjectionToken<string>('users link');
export const UserLinkProvider = createValueProvider(USER_LINK, '/api/users?name={name}');
export const USER = new InjectionToken<string>('current user');
export const UserProvider = createValueProvider(USER, 'Gordon Ramsay');
export const COMMENTS_LINK = new InjectionToken<string>('comments link');
export const CommentsLinkProvider = createValueProvider(COMMENTS_LINK, '/api/recipeComments');
export const ERROR_PAGE_IMAGE_LINK = new InjectionToken<string>('error page image link');
export const ErrorPageImageLinkProvider = createValueProvider(ERROR_PAGE_IMAGE_LINK, '/assets/sad-plate.avif');
export const CREATE_READY = new InjectionToken<boolean>('create ready');
export const CreateReadyProvider = createValueProvider(CREATE_READY, false);
