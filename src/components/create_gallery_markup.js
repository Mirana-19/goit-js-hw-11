export default function createGalleryMarkup(image) {
  return `<div class="photo-card gallery"><a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width= 300px height=200px /></a><div class="info"><p class="info-item"><b>Likes </b>${image.likes}</p><p class="info-item"><b>Views </b>${image.views}</p><p class="info-item"><b>Comments </b>${image.comments}</p><p class="info-item"><b>Downloads </b>${image.downloads}</p></div></div>`;
}
