import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { WrapperComponent } from './wrapper.component';
import { CircleVisComponent } from './circlevis.component';
import { DisplayComponent } from './display.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    WrapperComponent,
    CircleVisComponent,
    DisplayComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
