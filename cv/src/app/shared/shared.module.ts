import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HumanizePipe } from './pipes/humanize.pipe';
import { MenuComponent } from './components/menu/menu.component';
import { ResumeRoutingModule } from '../resume/resume-routing.module';

@NgModule({
  declarations: [
      HumanizePipe,
      MenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResumeRoutingModule,
  ],
  exports: [
    HumanizePipe,
    MenuComponent
  ]
})
export class SharedModule {
}
