import { InjectionToken, Provider } from '@angular/core';

export const createValueProvider = <T>(provide: InjectionToken<T>, value: unknown): Provider => ({ provide, useValue: value });

export const WINDOW = new InjectionToken<Window>('window');
export const WindowProvider = createValueProvider(WINDOW, window);
