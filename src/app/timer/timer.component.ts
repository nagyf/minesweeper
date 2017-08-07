import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';
import {isNull, isUndefined} from 'lodash';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.less']
})
export class TimerComponent {
  private seconds = 0;
  private timer: Observable<number>;
  private timerSubscription: Subscription;

  start() {
    this.timer = Observable.interval(1000);
    this.timerSubscription = this.timer.subscribe(() => this.seconds += 1);
  }

  isStarted() {
    return !isUndefined(this.timer) && !isNull(this.timer);
  }

  stop() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timer = null;
    }
  }

  reset() {
    this.seconds = 0;
  }
}
