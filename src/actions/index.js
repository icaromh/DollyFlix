import axios from 'axios';

const ROOT_URL = `https://dollyflix-api.herokuapp.com`;

export const FETCH_SHOWS = 'FETCH_SHOWS';
export const GET_SHOW = 'GET_SHOW';

export const SEARCH_TERM = 'SEARCH_TERM';

export const SELECT_SHOW = 'SELECT_SHOW';
export const SELECT_EPISODE = 'SELECT_EPISODE';

export function searchTerm(serie) {
  return {
    type: SEARCH_TERM,
    payload: serie,
  }
}

export function fetchSeries(serie = "") {
  let url = `${ROOT_URL}`;
  if (serie !== "") {
    url += `/search/?q=${serie}`;
  }else{
    url += '/series/1';
  }

  const request = axios.get(url);

  return {
    type: FETCH_SHOWS,
    payload: request,
  };
}

export function getSerie(slug = "") {
  let url = `${ROOT_URL}/serie/${slug}`;
  const request = axios.get(url);

  return {
    type: GET_SHOW,
    payload: request,
  };
}

export function selectShow(media) {
  return {
    type: SELECT_SHOW,
    payload: media,
  };
}

export function selectEpisode(episode) {
  return {
    type: SELECT_EPISODE,
    payload: episode,
  };
}
