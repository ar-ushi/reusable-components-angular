import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { DemoScreenComponent } from './screens/demo-screen/demo-screen.component';
import { CardComponent } from './components/card/card.component';
import { CardHeadingComponent } from './components/card/card-heading/card-heading.component';
import { CardTitleComponent } from './components/card/card-heading/card-title/card-title.component';
import { TooltipModule } from './components/tooltip/tooltip.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    DemoScreenComponent,
    CardComponent,
    CardHeadingComponent,
    CardTitleComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
