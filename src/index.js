import './css/styles.css';
import Notiflix from 'notiflix';
import searchImages from './components/search_images';
import createGalleryMarkup from './components/create_gallery_markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input[name = searchQuery]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.loadMoreBtn'),
};

const lightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
  captionsData: 'alt',
});

refs.form.addEventListener('submit', handleForm);
refs.loadMoreBtn.addEventListener('click', loadMoreImg);

function handleForm(e) {
  e.preventDefault();

  page = 1;

  searchImages(refs.input.value, page).then(renderGallery).catch(handleError);
}

function loadMoreImg(e) {
  e.preventDefault();

  page += 1;

  searchImages(refs.input.value, page).then(renderGallery).catch(handleError);
}

function handleError(error) {
  if (page === 1) {
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('hidden');
  }

  page === 1
    ? Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      )
    : Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results.",
      );
}

function renderGallery(response) {
  if (response.hits.length === 0) {
    throw new Error();
  }

  if (page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
  }

  refs.loadMoreBtn.classList.remove('hidden');

  page === 1
    ? (refs.gallery.innerHTML = response.hits
        .map(image => createGalleryMarkup(image))
        .join(''))
    : refs.gallery.insertAdjacentHTML(
        'beforeend',
        response.hits.map(image => createGalleryMarkup(image)).join(''),
      );

  lightbox.refresh();
}
