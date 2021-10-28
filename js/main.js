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
    // for (var i = 0; i < data.entries.length; i++) {
    // if (data.entries[i].entryId === data.editing.entryId) {
    data.editing.title = $formValues.title;
    data.editing.url = $formValues.url;
    data.editing.notes = $formValues.notes;
    $url.src = data.editing.url;

    var matchingEditId = document.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
    var newTree = renderEntry(data.editing);

    matchingEditId.replaceWith(newTree);

  } else {
    data.nextEntryId++;
    data.entries.unshift($formValues);
    $entryForm.reset();
    renderImage();
    swapViews(data.view);
    $ul.prepend(renderEntry($formValues));
  }
}
/* <li class="column-full">
  <div class="row">
    <div class="column-half">
      <img class="width-100"
        src="https://res.cloudinary.com/teepublic/image/private/s--17I0z7Hp--/c_scale,h_704/c_lpad,g_north_west,h_801,w_1802,x_174,y_48/c_crop,h_801,w_691,x_125/c_mfit,g_north_west,u_misc:Mug%20Effect%20Coffee3%20Left/e_displace,fl_layer_apply,x_14,y_-2/c_mfit,g_north_east,u_misc:Mug%20Effect%20Coffee3%20Right/e_displace,fl_layer_apply,x_-14,y_-2/c_crop,h_801,w_656/g_north_west,l_upload:v1466696262:production:blanks:w00xdkhjelyrnp8i8wxr,x_-410,y_-235/b_rgb:000000/c_limit,f_auto,h_630,q_90,w_630/v1539381322/production/designs/3309111_0.jpg">
    </div>
    <div class="column-half">

      <h2 class="f-gray font-weight inline">Javascript Mug</h2>
      <div class="text-right inline">
        <span class="ml"><i class="fas fa-pen "></i></span>
      </div>
      <p class="font-family">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum neque sapiente,
        nesciunt quaerat voluptatibus vitae sed provident ad odit error mollitia? Nemo at dolore expedita optio
        corporis culpa inventore quisquam?</p>
    </div>
  </div>
</li> */

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

$confirmButton.addEventListener('click', showModal);
$cancelButton.addEventListener('click', showModal);
$deleteButton.addEventListener('click', showModal);

function showModal(event) {
  $modal.classList.remove('hidden');
  $modalBox.classList.remove('hidden');
  if (event.target.matches('.cancel-button')) {
    $modal.classList.add('hidden');
    $modalBox.classList.add('hidden');
  } else if (event.target.matches('.confirm-button')) {
    $modal.classList.add('hidden');
    $modalBox.classList.add('hidden');
    swapViews('entries');
  }
}
