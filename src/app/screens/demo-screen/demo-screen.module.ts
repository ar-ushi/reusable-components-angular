import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoScreenComponent } from './demo-screen.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { TooltipModule } from 'src/app/components/tooltip/tooltip.module';



@NgModule({
  declarations: [
    DemoScreenComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule
  ]
})
export class DemoScreenModule { }
