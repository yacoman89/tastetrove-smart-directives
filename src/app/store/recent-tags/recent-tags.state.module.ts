import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { RecentTagsState } from './recent-tags.state';
import { RecentTagsStateFacade } from './recent-tags.state.facade';

@NgModule({
  imports: [NgxsModule.forFeature([RecentTagsState])],
  providers: [RecentTagsStateFacade]
})
export class RecentTagsStateModule {}