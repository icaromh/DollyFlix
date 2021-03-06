import {
  SELECT_SHOW,
  SELECT_EPISODE,
  FETCH_SHOW_REQUEST,
  FETCH_SHOW_SUCCESS,
  FETCH_SHOW_FAILURE,
  FAVORITE_SHOW,
  UNFAVORITE_SHOW,
  FETCH_MEDIA_SUCCESS,
  FETCH_MEDIA_LOADING,
} from '../actions/show'

import {
  FETCH_SHOWS_REQUEST,
  FETCH_SHOWS_SUCCESS,
  FETCH_SHOWS_FAILURE,
} from '../actions/shows'


export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case FETCH_SHOWS_FAILURE:
      return action.hasErrored

    default:
      return state
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
    case FETCH_SHOWS_REQUEST:
      return action.isLoading

    default:
      return state
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case FETCH_SHOWS_SUCCESS:
      return action.items

    default:
      return state
  }
}

export function favoriteShowItems(state = [], action) {
  switch (action.type) {
    case FAVORITE_SHOW: {
      return [action.show, ...state]
    }
    case UNFAVORITE_SHOW: {
      return state.filter(show => show.slug !== action.show.slug)
    }
    default: {
      return [...state]
    }
  }
}

export function currentMedia(state = [], action) {
  switch (action.type) {
    case FETCH_MEDIA_SUCCESS: {
      const media = { ...action.media }
      let urls = []
      if (media.url) {
        urls = media.url.map(el => ({
          src: el.file,
          type: el.type || 'video/mp4',
        }))
      }

      return urls
    }
    case FETCH_MEDIA_LOADING: {
      return [...action.media]
    }
    default: {
      return state
    }
  }
}

export function selectItem(state = {}, action) {
  switch (action.type) {
    case FETCH_SHOW_SUCCESS: {
      return { ...action.item }
    }
    case SELECT_SHOW: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

export function showHasErrored(state = false, action) {
  switch (action.type) {
    case FETCH_SHOW_FAILURE:
      return action.hasErrored

    default:
      return state
  }
}

export function showIsLoading(state = false, action) {
  switch (action.type) {
    case FETCH_SHOW_REQUEST:
      return action.isLoading

    default:
      return state
  }
}


export function selectEpisode(state = {}, action) {
  switch (action.type) {
    case FETCH_SHOW_SUCCESS: {
      if (action.season && action.episode) {
        const filterSeason = ep => parseInt(ep.season, 10) === parseInt(action.season, 10)
        const filterEpisode = ep => parseInt(ep.number, 10) === parseInt(action.episode, 10)

        const currentEpisode = action.item.episodes
          .filter(filterSeason)
          .filter(filterEpisode)

        return { ...currentEpisode[0] }
      }

      return { ...state }
    }
    case SELECT_EPISODE:
      return action.payload

    default:
      return state
  }
}
