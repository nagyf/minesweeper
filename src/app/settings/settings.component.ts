import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent {
  @Input() rows: number;
  @Input() columns: number;
  @Input() bombs: number;
  @Input() enabled = true;
  @Output() onChange: Subject<any> = new Subject();

  onModelChange(): void {
    this.onChange.next({
      rows: this.rows,
      columns: this.columns,
      bombs: this.bombs
    });
  }
}
