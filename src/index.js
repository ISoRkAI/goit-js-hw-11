import fetchImg from './js/fetchCountries';
import markupGallery from './js/gallery';
import scroll from './js/scroll';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { searchForm, gallery, loadMoreBtn} = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener('submit', onSearch);

async function onSearch(evt) {
  evt.preventDefault();
  searchQuery = evt.currentTarget.searchQuery.value.trim();
  page = 1;

  if (!searchQuery) {
    gallery.innerHTML = '';
    return;
  }

  const response = await fetchImg(searchQuery, page);
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    loadMoreBtn.classList.remove('is-hidden');
  } else {
    loadMoreBtn.classList.add('is-hidden');
  }

  if (response.totalHits > 0) {
    Notify.success(`Hooray! We found ${response.totalHits} images.`);
    gallery.innerHTML = '';
    markupGallery(response.hits, gallery);
    scroll(-100);
  }

  if (response.totalHits === 0) {
    gallery.innerHTML = '';
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.classList.add('is-hidden');
  }
}

loadMoreBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  page += 1;
  const response = await fetchImg(searchQuery, page);
  markupGallery(response.hits, gallery);
  currentHits += response.hits.length;

  scroll(2);

  if (currentHits >= response.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}