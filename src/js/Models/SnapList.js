import uniqeid from 'uniqid';

export class SnapList {
  constructor() {
    this.snaps = [];
    this.activeSnap = {};
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

    this.snaps.push(snap);
    return snap.id;
  }

  deleteSnap() {
    this.snaps = this.snaps.filter(snap => snap.id !== this.activeSnap.id)
  }

  setActiveSnap(id) {
    this.activeSnap = this.snaps.find(snap => snap.id === id);
  }

  setNoActiveSnap() {
    this.activeSnap = {};
  }

  updateSnapData(formValues) {
    const updatedSnaps = this.snaps.map(snap => {
      if (snap.id === this.activeSnap.id) {
        snap = {...snap, ...formValues};
      }
      return snap;
    });
    this.snaps = updatedSnaps;
  }

  updateColorPicked() {
    const updatedSnaps = this.snaps.map(snap => {
      if (snap.id === this.activeSnap.id) {
        snap.colorPicked = true;
      }
      return snap;
    });
    this.snaps = updatedSnaps;
  }

  static fromJSON(jsonObj) {
    return Object.assign(new SnapList(), jsonObj);
  }
}