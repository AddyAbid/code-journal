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
