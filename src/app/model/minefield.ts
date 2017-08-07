import {FieldState, FieldStateOperations} from './fieldState';
import {forEach, map, some, flatten, chain, times, constant, range, random} from 'lodash';

type Field = FieldState[][];

export class Minefield {
  private _field: Field;
  private _gameOver = false;

  constructor(public readonly rows: number, public readonly columns: number, public readonly bombs: number) {
    // Generate an empty field
    this._field = map(range(0, rows), () => {
      return times(columns, constant(FieldStateOperations.defaultField()));
    });

    forEach(range(0, bombs), () => {
      const row = random(0, this.rows - 1);
      const col = random(0, this.columns - 1);
      // Place the bombs
      this._field[row][col] = FieldStateOperations.bombed();

      // Mark the fields next to bombs as dangerous (these will be the numbered fields)
      forEach(this.around(row, col), pos => {
        if (this.checkFlag(pos[0], pos[1], FieldState.EMPTY)) {
          this._field[pos[0]][pos[1]] = FieldStateOperations.dangerous();
        }
      });
    });
  }

  get field() {
    return this._field;
  }

  get isGameOver() {
    return this._gameOver;
  }

  _checkFlag(field: FieldState, flag: FieldState): boolean {
    return (field & flag) === flag;
  }

  checkFlag(row: number, column: number, flag: FieldState): boolean {
    return this._checkFlag(this.getField(row, column), flag);
  }

  anyFlags(row: number, column: number, flags: FieldState[]): boolean {
    return some(map(flags, flag => this.checkFlag(row, column, flag)));
  }

  getField(row: number, column: number): FieldState {
    return this.field[row][column];
  }

  bombsAround(row: number, column: number): number {
    const around = this.around(row, column);
    return chain(around)
      .map(pos => this.checkFlag(pos[0], pos[1], FieldState.BOMB))
      .filter(state => state === true)
      .value().length;
  }

  triggerBombs(): void {
    for (let row = 0; row < this.rows; ++row) {
      for (let column = 0; column < this.columns; ++column) {
        if (this.checkFlag(row, column, FieldState.BOMB)) {
          this._field[row][column] = FieldStateOperations.triggered(this._field[row][column]);
        }
      }
    }

    this._gameOver = true;
  }

  reveal(row: number, column: number): void {
    if (this.checkFlag(row, column, FieldState.BOMB)) {
      this.triggerBombs();
    } else {
      this.field[row][column] = FieldStateOperations.revealed(this.field[row][column]);

      // Only reveal the neighbouring fields, if this is empty
      if (this.checkFlag(row, column, FieldState.EMPTY)) {
        const around = this.around(row, column);
        forEach(around, pos => {
          const childRow = pos[0];
          const childColumn = pos[1];
          // Reveal danger or empty fields
          if (this.anyFlags(childRow, childColumn, [FieldState.EMPTY, FieldState.DANGER])
            && this.checkFlag(childRow, childColumn, FieldState.HIDDEN)) {
            this.reveal(childRow, childColumn);
          }
        });
      }
    }
  }

  mark(row: number, column: number): void {
    if (this.checkFlag(row, column, FieldState.HIDDEN)) {
      this.field[row][column] = FieldStateOperations.marked(this.field[row][column]);
    } else if (this.checkFlag(row, column, FieldState.MARKED)) {
      this.field[row][column] = FieldStateOperations.hidden(this.field[row][column]);
    }
  }

  around(row: number, column: number): number[][] {
    const range: [number] = [-1, 0, 1];
    const coords: number[][][] = map(range, i => {
      return map(range, j => {
        return [row + i, column + j];
      }).filter(pos => {
        // Predicate to ensure only valid coordinates are returned
        return (pos[0] !== row || pos[1] !== column) && pos[0] >= 0 && pos[1] >= 0 && pos[0] < this.rows && pos[1] < this.columns;
      });
    });

    return flatten<number[]>(coords, false);
  }

  toString() {
    return map(this._field, row => {
      return map(row, field => {
        return (field & FieldState.EMPTY) ? '.' : '*';
      }).join(' ');
    }).join('\r\n');
  }

  checkWin() {
    const flatFields: FieldState[] = flatten<FieldState>(this._field, true);
    return chain<FieldState>(flatFields)
      .filter((field: FieldState) => this._checkFlag(field, FieldState.BOMB))
      .map((field: FieldState) => this._checkFlag(field, FieldState.MARKED))
      .every()
      .value();
  }
}
