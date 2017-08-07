import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import {Minefield} from '../model/minefield';
import {FieldState} from '../model/fieldState';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.less']
})
export class MinefieldComponent implements OnInit {
  @Input() model: Minefield;

  @Output() onWin = new EventEmitter();
  @Output() onGameOver = new EventEmitter();
  @Output() onChange = new EventEmitter();

  rowRange: number[];
  columnRange: number[];

  ngOnInit(): void {
    this.rowRange = _.range(0, this.model.rows);
    this.columnRange = _.range(0, this.model.columns);
  }

  isGameOver() {
    return this.model.isGameOver;
  }

  reveal(event): void {
    this.model.reveal(event.row, event.column);

    this.onChange.emit();
    if (this.model.isGameOver) {
      this.onGameOver.emit();
    }
  }

  mark(event): void {
    this.model.mark(event.row, event.column);

    this.onChange.emit();
    if (this.model.checkWin()) {
      this.onWin.emit();
    }
  }

  isRevealed(row: number, column: number): boolean {
    return this.model.checkFlag(row, column, FieldState.REVEALED);
  }

  isMarked(row: number, column: number): boolean {
    return this.model.checkFlag(row, column, FieldState.MARKED);
  }

  isTriggered(row: number, column: number): boolean {
    return this.model.checkFlag(row, column, FieldState.TRIGGERED);
  }

  numberOfBombsAround(row: number, column: number): number {
    return this.model.bombsAround(row, column);
  }
}
