import React, {Component} from 'react';
import './App.css';

class Gallery extends Component {
  render() {
    const { tracks } = this.props;
    return (
        <div className="gallery">
          {tracks.map((track, k) => {
            const trackImg = track.album.images[0].url;
            return (
              <div
                key={k}
                className="track"
              >
                <img
                  src={trackImg}
                  className="track-img"
                  alt="Track"
                />
                <span className="track-text">
                  {track.name}
                </span>
              </div>
            )
          })}
        </div>
    )
  }
}

export default Gallery;