import * as _ from 'lodash';

export enum FieldState {
  HIDDEN = 1 << 1,
  REVEALED = 1 << 2,
  MARKED = 1 << 3,
  TRIGGERED = 1 << 4,
  EMPTY = 1 << 5,
  BOMB = 1 << 6,
  DANGER = 1 << 7
}

const EMPTY_HIDDEN = FieldState.EMPTY | FieldState.HIDDEN;

export class FieldStateOperations {
  static defaultField() {
    return EMPTY_HIDDEN;
  }

  static hidden(state: FieldState = EMPTY_HIDDEN) {
    return (state & ~FieldState.REVEALED & ~FieldState.MARKED) | FieldState.HIDDEN;
  }

  static revealed(state: FieldState = EMPTY_HIDDEN) {
    return (state & ~FieldState.HIDDEN) | FieldState.REVEALED;
  }

  static marked(state: FieldState = EMPTY_HIDDEN) {
    return (state & ~FieldState.HIDDEN) | FieldState.MARKED;
  }

  static triggered(state: FieldState = EMPTY_HIDDEN) {
    return state | FieldState.TRIGGERED;
  }

  static empty(state: FieldState = EMPTY_HIDDEN) {
    return (state & ~FieldState.BOMB) | FieldState.EMPTY;
  }

  static bombed(state: FieldState = EMPTY_HIDDEN) {
    return (state & ~FieldState.EMPTY) | FieldState.BOMB;
  }

  static dangerous(state: FieldState = EMPTY_HIDDEN) {
    return (state & ~FieldState.EMPTY) | FieldState.DANGER;
  }

  static toString(state: FieldState): string {
    const result: string[] = [];
    _.forEach(FieldState, s => {
      if (state & s) {
        result.push(FieldState[s]);
      }
    });
    return result.join(', ');
  }
}
