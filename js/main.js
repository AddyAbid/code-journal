/* global data */
/* exported data */
var $img = document.querySelector('.img-url');
var $url = document.querySelector('.url');

$img.addEventListener('input', renderImage);

function renderImage(event) {
  if ($img.value !== '') {
    $url.src = $img.value;
  } else {
    $url.src = 'images/placeholder-image-square.jpg';
  }
}
var $entryForm = document.querySelector('#entry-form');

$entryForm.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();
  var $formValues = {

    title: $entryForm.title.value,
    url: $entryForm.url.value,
    notes: $entryForm.notes.value,
    nextEntry: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push($formValues);
  $entryForm.reset();
  $url.src = 'images/placeholder-image-square.jpg';
}
