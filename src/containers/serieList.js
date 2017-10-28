import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { selectMedia } from '../actions/index';
import Spinner from '../components/spinner';


class SerieList extends Component{
  constructor(props){
    super(props);

    this.renderSerie = this.renderSerie.bind(this);
    this.selectMedia = this.selectMedia.bind(this);
  }

  selectMedia(media){
    this.props.selectMedia(media);
  }

  renderSerie(serie){
    const itemStyle = {
      backgroundImage: `url(${serie.images.banner})`,
    };

    return (
      <Link
        key={serie.imdb_id}
        className="thumbnail serielist__item"
        onClick={() => this.selectMedia(serie)}
        to={`/serie/${serie.slug}`}
        style={itemStyle}
      >
        <span className="serielist__item__meta">
          {serie.title}
        </span>
      </Link>
    );
  }

  renderLoader(){
    if(this.props.search.term !== null){
      return (
        <div>
          <h1 className="page-title">
            Searching for "{this.props.search.term}"
          </h1>
          <Spinner />
        </div>
      )
    }

    return false;

  }

  renderTitle() {
    if (this.props.search.loading) {
      return this.renderLoader();
    }

    if (this.props.search.term !== null) {
      return (
        <div>
          <h1 className="page-title">
            Results for "{this.props.search.term}"
          </h1>
        </div>
      )
    }

    return (
      <div>
        <h1 className="page-title">Latest Series</h1>
      </div>
    )
  }

  renderList(){
    return (
      <div className="medialist">
        {this.props.series.map(this.renderSerie)}
      </div>
    )
  }

  render(){
    return (
      <div className="container">
        {this.renderTitle()}
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps({ series, search }) {
  return { series, search };
}

export default connect(mapStateToProps, {
  selectMedia: selectMedia
})(SerieList);
