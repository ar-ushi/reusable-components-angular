import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoScreenComponent } from './demo-screen.component';
import { ButtonComponent } from 'src/app/components/button/button.component';



@NgModule({
  declarations: [
    DemoScreenComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class DemoScreenModule { }
