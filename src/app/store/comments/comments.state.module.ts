import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommentsState } from './comments.state';
import { CommentsStateFacade } from './comments.state.facade';

@NgModule({
  imports: [NgxsModule.forFeature([CommentsState])],
  providers: [CommentsStateFacade]
})
export class CommentsStateModule {}
