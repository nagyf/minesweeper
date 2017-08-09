import {Component, ViewChild} from '@angular/core';
import {TimerComponent} from './timer/timer.component';
import {Minefield} from './model/minefield';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  @ViewChild(TimerComponent) timer: TimerComponent;

  private options = {
    rows: 16,
    columns: 30,
    bombs: 60
  };

  private model = this.createModel();

  createModel() {
    return new Minefield(this.options.rows, this.options.columns, this.options.bombs);
  }

  reset(): void {
    this.timer.stop();
    this.timer.reset();
    this.model = this.createModel();
  }

  won(): void {
    this.timer.stop();
  }

  gameOver(): void {
    this.timer.stop();
  }

  onSettingsChange(options) {
    this.options = options;
    this.model = this.createModel();
  }

  onChange() {
    if (!this.timer.isStarted()) {
      this.timer.start();
    }
  }
}
