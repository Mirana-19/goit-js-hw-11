import './css/styles.css';
import Notiflix from 'notiflix';
import searchImages from './components/search_images';
import createGalleryMarkup from './components/create_gallery_markup';
import SimpleLightbox from 'simplelightbox';

let page = 1;

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input[name = searchQuery]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.loadMoreBtn'),
};

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

  var lightbox = new SimpleLightbox('.gallery a', {
    /* options */
  });
}

function renderGallery(response) {
  if (response.hits.length === 0) {
    throw new Error();
  }

  if (page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
  }

  refs.loadMoreBtn.classList.remove('hidden');
  console.log(response.hits.map(image => createGalleryMarkup(image)).join(''));
  page === 1
    ? (refs.gallery.innerHTML = response.hits
        .map(image => createGalleryMarkup(image))
        .join(''))
    : refs.gallery.insertAdjacentHTML(
        'beforeend',
        response.hits.map(image => createGalleryMarkup(image)).join(''),
      );

  const gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
}
