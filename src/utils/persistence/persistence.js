const persistence = {
  save(pickedAnswers, dimensions) {
    const appData = {
      picked_answers: pickedAnswers,
      dimensions,
    };

    this.saveLS(appData);
  },

  saveLS(appData) {
    const appDataToStr = JSON.stringify(appData);
    localStorage.setItem('CA_LS', appDataToStr);
  },

  retrieveAll() {
    let ls = localStorage.getItem('CA_LS');

    if (!ls) {
      return;
    }

    try {
      ls = JSON.parse(ls);
    } catch (e) {
      console.log(`${'An error occured'
        + ' while parsing data from the'
        + ' Local Storage. Details: '}${e}`);

      return;
    }

    return ls || {};
  },

  dimensions() {
    const lsData = this.retrieveAll();
    return lsData.dimensions || undefined;
  },

  pickedAnswers() {
    const lsData = this.retrieveAll();
    return lsData.picked_answers || undefined;
  },

  isAssessed() {
    const lsData = this.retrieveAll();

    return !!(lsData
      && lsData.picked_answers
      && lsData.picked_answers.length
      && lsData.dimensions
      && lsData.dimensions.length);
  },

  reset() {
    localStorage.removeItem('CA_LS');
  },
};

export default persistence;
