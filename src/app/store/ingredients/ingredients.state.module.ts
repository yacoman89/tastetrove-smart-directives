import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { IngredientsState } from './ingredients.state';
import { IngredientsStateFacade } from './ingredients.state.facade';

@NgModule({
  imports: [NgxsModule.forFeature([IngredientsState])],
  providers: [IngredientsStateFacade]
})
export class IngredientsStateModule {}
