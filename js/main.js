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
    entryId: data.nextEntryId
  };
  if (data.editing !== null) {

    data.editing.title = $formValues.title;
    data.editing.url = $formValues.url;
    data.editing.notes = $formValues.notes;
    $url.src = data.editing.url;

    var matchingEditId = document.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
    var newTree = renderEntry(data.editing);

    matchingEditId.replaceWith(newTree);
    data.editing = null;
  } else {
    data.nextEntryId++;
    data.entries.unshift($formValues);
    $entryForm.reset();
    renderImage();
    swapViews(data.view);
    $ul.prepend(renderEntry($formValues));
  }
}

function renderEntry(entry) {

  var $li = document.createElement('li');
  $li.setAttribute('class', 'column-full li');
  $li.setAttribute('data-entry-id', entry.entryId);
  $ul.appendChild($li);

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $li.appendChild($divRow);

  var $divColHalf = document.createElement('div');
  $divColHalf.setAttribute('class', 'column-half');
  $divRow.appendChild($divColHalf);

  var $img = document.createElement('img');
  $img.setAttribute('class', 'width-100 img-size');
  $img.setAttribute('src', entry.url);
  $divColHalf.appendChild($img);

  var $divColHalf2 = document.createElement('div');
  $divColHalf2.setAttribute('class', 'column-half');
  $divRow.appendChild($divColHalf2);

  var $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'f-gray font-weight mt-none inline');
  $h2.textContent = entry.title;
  $divColHalf2.appendChild($h2);

  var $editDiv = document.createElement('div');
  $editDiv.setAttribute('class', 'text-right align');
  $divColHalf2.appendChild($editDiv);

  var $span = document.createElement('span');
  $span.setAttribute('class', 'ml');
  $editDiv.appendChild($span);

  var $editPen = document.createElement('i');
  $editPen.setAttribute('class', 'fas fa-pen pen');
  $span.appendChild($editPen);

  var $description = document.createElement('p');
  $description.setAttribute('class', 'font-family');
  $description.textContent = entry.notes;
  $divColHalf2.appendChild($description);

  return $li;
}
var $ul = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', createDOM);

function createDOM(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var eachEntry = renderEntry(data.entries[i]);
    $ul.append(eachEntry);

  }
  swapViews(data.view);
}

var $view = document.querySelectorAll('.view');

document.addEventListener('click', viewHandler);

function swapViews(viewName) {

  for (var i = 0; i < $view.length; i++) {
    var view = $view[i].getAttribute('data-view');

    if (viewName === view) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
  data.view = viewName;
}

function viewHandler(event) {
  if (!event.target.matches('.button')) {
    return;
  }
  swapViews(event.target.getAttribute('data-view'));

}

$ul.addEventListener('click', editForm);
var $deleteButton = document.querySelector('.delete');
function editForm(event) {
  if (!event.target.matches('.pen')) {
    return;
  }
  $deleteButton.classList.remove('hidden');
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === Number(event.target.closest('li').getAttribute('data-entry-id'))) {
      data.editing = data.entries[i];
      $entryForm.title.value = data.entries[i].title;
      $entryForm.url.value = data.entries[i].url;
      $entryForm.notes.value = data.entries[i].notes;
      $url.src = data.entries[i].url;
      swapViews('entry-form');
      var headerText = document.querySelector('.edit-text');
      headerText.textContent = 'Edit Entry';

    }
  }
}

var $modalBox = document.querySelector('.modal-box');
var $modal = document.querySelector('.overlay');
var $cancelButton = document.querySelector('.cancel-button');
var $confirmButton = document.querySelector('.confirm-button');

$confirmButton.addEventListener('click', deleteEntry);
$cancelButton.addEventListener('click', deleteEntry);
$deleteButton.addEventListener('click', deleteEntry);

function deleteEntry(event) {
  $modal.classList.remove('hidden');
  $modalBox.classList.remove('hidden');
  if (event.target.matches('.cancel-button')) {
    $modal.classList.add('hidden');
    $modalBox.classList.add('hidden');
  } else if (event.target.matches('.confirm-button')) {
    $modal.classList.add('hidden');
    $modalBox.classList.add('hidden');
    var matchingEntry = document.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(matchingEntry.getAttribute('data-entry-id'))) {
        data.entries.splice(i, 1);
        matchingEntry.remove();
        data.editing = null;
      }
    }
    swapViews('entries');
  }
}
