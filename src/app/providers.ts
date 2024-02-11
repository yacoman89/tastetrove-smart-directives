import { InjectionToken, Provider } from '@angular/core';

export const createValueProvider = <T>(provide: InjectionToken<T>, value: unknown): Provider => ({ provide, useValue: value });

export const WINDOW = new InjectionToken<Window>('window');
export const WindowProvider = createValueProvider(WINDOW, window);
export const RECIPES_LIST_LINK = new InjectionToken<String>('recipes list link');
export const RecipesLinkProvider = createValueProvider(RECIPES_LIST_LINK, '/api/recipes');
export const USER = new InjectionToken<string>('current user');
export const UserProvider = createValueProvider(USER, 'Gordon Ramsey');
