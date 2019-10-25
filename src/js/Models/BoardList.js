import uniqeid from 'uniqid';
import Card from './Card';
export class BoardList extends Card {
  constructor() {
    super();
  }

  addBoard(name, snaps) {
    const board = {
      name,
      id: uniqeid(),
      snaps,
    }

    this.cards.push(board);
    return board.id;
  }

  static fromJSON(jsonObj) {
    return Object.assign(new BoardList(), jsonObj);
  }
}