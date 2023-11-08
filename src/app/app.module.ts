import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoScreenComponent } from './screens/demo-screen/demo-screen.component';
import { TooltipModule } from './components/tooltip/tooltip.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { ChipsComponent } from './components/chips/chips.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule,
    DropdownComponent,
    ButtonComponent,
    ChipsComponent,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
