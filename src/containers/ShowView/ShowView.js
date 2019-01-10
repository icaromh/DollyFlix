import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'


import ShowHeader from '../../components/ShowHeader'
import EpisodesList from '../../components/EpisodesList'
import SeasonSelector from '../../components/SeasonSelector'
import Loader from '../../components/Loader'

import {
  EVENT_CATEGORY_NAVIGATION,
  NAVIGATION_SEASON_CLICK,
  NAVIGATION_SEASON_SELECT_CLICK,
} from '../../constants'

class ShowView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      seasonSelected: this.props.params.season ? parseInt(this.props.params.season, 10) : 1,
    }
  }

  componentWillMount() {
    this.props.fetchShow(this.props.params.slug)
  }

  changePath = (season) => {
    const { slug } = this.props.params
    const location = Object.assign({}, browserHistory.getCurrentLocation())
    location.pathname = `/show/${slug}/${season}`
    browserHistory.push(location)
  }


  handleOnClickEpisode = episode => (
    this.props.selectEpisode(episode)
  )

  handleSeasonClick = () => {
    ReactGA.event({ category: EVENT_CATEGORY_NAVIGATION, action: NAVIGATION_SEASON_SELECT_CLICK })
  }

  handleChangeSeason = (ev) => {
    const season = parseInt(ev.target.value, 10)
    ReactGA.event({ category: EVENT_CATEGORY_NAVIGATION, action: NAVIGATION_SEASON_CLICK })

    this.changePath(season)
    this.setState({
      seasonSelected: season,
    })
  }

  handleFavoriteClick = (show) => {
    this.props.favoriteShow(show)
  }

  handleUnfavoriteClick = (show) => {
    this.props.unfavoriteShow(show)
  }

  renderContent = () => {
    const { show, showHasErrored } = this.props
    const episodes = show.episodes && show.episodes.filter(ep => parseInt(ep.season, 10) === this.state.seasonSelected)

    if (showHasErrored) {
      return (
        <div className="container --center-content --full-height">
          <h1 className="page-title">
            Série não encontrada <span role="img" aria-label="sad face emoji">☹️</span>
          </h1>
        </div>
      )
    }

    return (
      <div>
        <Helmet title={`Dollyflix - assistir ${show.title}`}>
          <link rel="canonical" href={`https://flix.icaromh.com/serie/${show.slug}`} />
          <meta property="og:type" content="video.tv_show" />
          <meta property="og:title" content={show.title} />
          <meta property="og:url" content={`https://flix.icaromh.com/serie/${show.slug}`} />
          <meta property="og:image" content={show.images ? show.images.fanart : ''} />
        </Helmet>

        <ShowHeader
          onFavoriteClick={this.handleFavoriteClick}
          onUnfavoriteClick={this.handleUnfavoriteClick}
          show={show}
          isFavoritedShow={this.props.isFavoritedShow}
        />

        <div className="container container--padding">
          <SeasonSelector
            value={this.state.seasonSelected}
            seasons={this.props.seasons}
            onChange={this.handleChangeSeason}
            onClick={this.handleSeasonClick}
          />

          <EpisodesList
            show={show}
            season={this.state.seasonSelected}
            episodes={episodes}
            onClick={this.handleOnClickEpisode}
          />
        </div>
      </div>
    )
  }

  render() {
    const { showIsLoading, showHasErrored } = this.props
    const hasShow = Object.keys(this.props.show).length !== 0

    return (
      <Loader
        for={(!showIsLoading && hasShow) || showHasErrored}
        render={this.renderContent}
      />
    )
  }
}

ShowView.propTypes = {
  show: PropTypes.object,
  params: PropTypes.object.isRequired,
  fetchShow: PropTypes.func.isRequired,
  selectEpisode: PropTypes.func.isRequired,
  favoriteShow: PropTypes.func.isRequired,
  unfavoriteShow: PropTypes.func.isRequired,
  seasons: PropTypes.array,
  showIsLoading: PropTypes.bool.isRequired,
  isFavoritedShow: PropTypes.bool,
  showHasErrored: PropTypes.bool,
}

ShowView.defaultProps = {
  show: {},
  seasons: [],
  isFavoritedShow: false,
  showHasErrored: false,
}


export default ShowView
