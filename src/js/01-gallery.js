import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryContainer = document.querySelector('.gallery');
const markup = createGallery(galleryItems);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div><a class="gallery__item" href="${original}" onclick="event.preventDefault()">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
          title="${description}"/></a></div>`;
    })
    .join('');
}

galleryContainer.insertAdjacentHTML('beforeend', markup);

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

console.log(galleryItems);
