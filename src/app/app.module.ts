import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MinefieldComponent} from './minefield/minefield.component';
import {FieldComponent} from './field/field.component';
import {TimerComponent} from './timer/timer.component';
import {ResetButtonComponent} from './resetButton/resetButton.component';

@NgModule({
  declarations: [
    AppComponent,
    MinefieldComponent,
    FieldComponent,
    TimerComponent,
    ResetButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
