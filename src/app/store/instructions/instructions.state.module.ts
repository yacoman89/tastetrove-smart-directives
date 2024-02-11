import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { InstructionsState } from './instructions.state';
import { InstructionsStateFacade } from './instructions.state.facade';

@NgModule({
  imports: [NgxsModule.forFeature([InstructionsState])],
  providers: [InstructionsStateFacade]
})
export class InstructionsStateModule {}
