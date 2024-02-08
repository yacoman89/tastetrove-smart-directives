import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { RecipesState } from './recipes.state';
import { RecipesStateFacade } from './recipes.state.facade';

@NgModule({
  imports: [NgxsModule.forFeature([RecipesState])],
  providers: [RecipesStateFacade]
})
export class RecipesStateModule {}
