import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-reset',
  template: '<div class="reset-button" [ngClass]="{\'disabled\': !enabled}" (click)="click()"></div>',
  styleUrls: ['./resetButton.component.less']
})
export class ResetButtonComponent {
  @Input() enabled? = true;
  @Output() onClick = new EventEmitter<any>();

  click() {
    if (this.enabled) {
      this.onClick.emit();
    }
  }
}
