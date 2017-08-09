import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {MinefieldComponent} from './minefield/minefield.component';
import {FieldComponent} from './field/field.component';
import {TimerComponent} from './timer/timer.component';
import {ResetButtonComponent} from './resetButton/resetButton.component';
import {SettingsComponent} from './settings/settings.component';
import {DigitsPipe} from './pipes/digits.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MinefieldComponent,
    FieldComponent,
    TimerComponent,
    ResetButtonComponent,
    SettingsComponent,
    DigitsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
