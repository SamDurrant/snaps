import uniqeid from 'uniqid';

export class BoardList {
  constructor() {
    this.boards = [];
    this.activeBoard = {};
  }

  addBoard(name, snaps) {
    const board = {
      name,
      id: uniqeid(),
      snaps,
    }

    this.boards.push(board);
    return board.id;
  }

  deleteBoard() {
    this.boards = this.boards.filter(board => board.id !== this.activeBoard.id)
  }

  setActiveBoard(id) {
    this.activeBoard = this.boards.find(board => board.id === id);
  }

  setNoActiveBoard() {
    this.activeBoard = {};
  }

  updateBoardData(formValues) {
    const updatedBoards = this.boards.map(board => {
      if (board.id === this.activeBoard.id) {
        board = {...board, ...formValues};
      }
      return board;
    });
    this.boards = updatedBoards;
  }

  static fromJSON(jsonObj) {
    return Object.assign(new BoardList(), jsonObj);
  }
}