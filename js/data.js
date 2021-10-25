/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntryJSON = localStorage.getItem('entry-form');
if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', updateStorage);

function updateStorage(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('entry-form', entriesJSON);
}
