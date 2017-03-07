import React, { Component } from 'react';
import { connect } from 'react-redux';
import Album from '../components/Album';

class Albums extends Component {
  // componentDidMount() {
  // }
  constructor(props) {
    super(props);
    console.log('\n\n\nALBUMS CONTAINER', props);
  }

  render() {
    console.log('rendering albums!', this.props.albums);
    return (
        <div>
          <h1>Albums</h1>
          <div className="flexContainer">
            {
              this.props.albums ?
              this.props.albums.map(album => (
                <Album album={album} key={album.id} />
              ))
              :
              this.props.allAlbums.map(album => (
                <Album album={album} key={album.id} />
              ))
            }
          </div>
        </div>
    )
  }

}

const mapProps = state => {
  console.log('Mapping Props from state', state);
  return {
    message: state.products.message,
    allAlbums: state.products.products.albums
  };
};

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    // what other data might we want to fetch on app load?
  }
});

export default connect(mapProps, mapDispatch)(Albums);
