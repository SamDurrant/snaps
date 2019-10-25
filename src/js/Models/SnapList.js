import uniqeid from 'uniqid';
import Card from './Card';
export class SnapList extends Card {
  constructor() {
    super();
  }

  addSnap (name, parentId, color = '#91B0C7', fontSize = '18', size = '1x1', frontContent = '', backContent = '') {
    const snap = {
      name,
      parentId,
      id: uniqeid(),
      color,
      colorPicked: false,
      fontSize,
      size,
      frontContent,
      backContent
    }

    this.cards.push(snap);
    return snap.id;
  }

  updateColorPicked() {
    const updatedCards = this.cards.map(card => {
      if (card.id === this.activeCard.id) {
        card.colorPicked = true;
      }
      return card;
    });
    this.cards = updatedCards;
  }

  static fromJSON(jsonObj) {
    return Object.assign(new SnapList(), jsonObj);
  }
}