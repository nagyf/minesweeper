import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.less']
})
export class FieldComponent {
  @Input() row: number;
  @Input() column: number;
  @Input() enabled = true;
  @Input() revealed = false;
  @Input() marked = false;
  @Input() triggered = false;
  @Input() bombsAround? = 0;

  @Output() onClicked?: EventEmitter<any> = new EventEmitter();
  @Output() onMarked?: EventEmitter<any> = new EventEmitter();

  /**
   * Called when the user clicks on the field
   */
  fieldClicked(event) {
    if (!this.enabled) {
      return;
    }

    if (event.ctrlKey) {
      this.onMarked.emit({
        row: this.row,
        column: this.column
      });
    } else if (!this.marked) {
      this.onClicked.emit({
        row: this.row,
        column: this.column
      });
    }
  }
}
