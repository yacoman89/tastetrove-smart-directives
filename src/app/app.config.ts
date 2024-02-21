import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import { CommentsLinkProvider, CreateReadyProvider, ErrorPageImageLinkProvider, RecipesLinkProvider, USER, UserLinkProvider, UserProvider, WindowProvider } from './providers';
import { CommentsStateModule } from './store/comments/comments.state.module';
import { CommentsStateFacade } from './store/comments/comments.state.facade';
import { Observable } from 'rxjs';

export function initializeApp(commentsStateFacade: CommentsStateFacade, username: string): () => Observable<unknown> {
  return () => commentsStateFacade.fetchUser(username);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot(
        [],
        {
          developmentMode: !environment.production,
          selectorOptions: {
            suppressErrors: false,
            injectContainerState: false
          }
        }
      ),
      NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
      HttpClientModule,
      CommentsStateModule
    ),
    RecipesLinkProvider,
    WindowProvider,
    UserLinkProvider,
    UserProvider,
    CommentsLinkProvider,
    ErrorPageImageLinkProvider,
    CreateReadyProvider,
    {
      provide: IMAGE_CONFIG, useValue: { disableImageSizeWarning: true }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [CommentsStateFacade, USER],
    }
  ]
};
