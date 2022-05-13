const BASE_URL =
  'https://pixabay.com/api/?key=27366068-7f092b690db13a9a2c4fde80b&image_type=photo&orientation=horizontal&safesearch=true';

export default async function searchImages(word, page) {
  const result = await fetch(`${BASE_URL}&q=${word}&page=${page}&per_page=20`);

  return result.json();
}
