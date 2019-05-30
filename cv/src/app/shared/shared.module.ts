import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HumanizePipe } from './pipes/humanize.pipe';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
      HumanizePipe,
      MenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    HumanizePipe,
  ]
})
export class SharedModule {
}
