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

  private rows = 16;
  private columns = 30;
  private bombs = 60;
  private model = new Minefield(this.rows, this.columns, this.bombs);

  reset(): void {
    this.timer.reset();
    this.timer.stop();
    this.model = new Minefield(this.rows, this.columns, this.bombs);
  }

  won(): void {
    this.timer.stop();
  }

  gameOver(): void {
    this.timer.stop();
  }

  onChange() {
    if (!this.timer.isStarted()) {
      this.timer.start();
    }
  }
}
