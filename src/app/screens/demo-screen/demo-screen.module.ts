import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoScreenComponent } from './demo-screen.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { TooltipModule } from 'src/app/components/tooltip/tooltip.module';
import { DropdownComponent } from 'src/app/components/dropdown/dropdown.component';



@NgModule({
  declarations: [
    DemoScreenComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule,
    DropdownComponent
  ],
})
export class DemoScreenModule { }
