export default class Card {
  constructor() {
    this.cards = [];
    this.activeCard = {};
  }

  deleteCard() {
    this.cards = this.cards.filter(card => card.id !== this.activeCard.id);
  }

  setActiveCard(id) {
    this.activeCard = this.cards.find(card => card.id === id);
  }

  setNoActiveCard() {
    this.activeCard = {};
  }

  updateCardData(formValues) {
    const updatedCards = this.cards.map(card => {
      if (card.id === this.activeCard.id) {
        card = {...card, ...formValues};
      }
      return card;
    });
    this.cards = updatedCards;
  }
}