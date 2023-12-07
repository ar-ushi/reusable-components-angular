import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TooltipModule } from './components/tooltip/tooltip.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { ChipsComponent } from './components/chips/chips.component';
import { autocompleteModule } from './components/autocomplete/autocomplete.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TooltipModule,
    DropdownComponent,
    ButtonComponent,
    ChipsComponent,
    FormsModule,
    autocompleteModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
