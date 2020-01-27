import React, {Component} from "react";
import './App.css';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search';
    let FETCH_URL =  `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    const TRACKS_URL = 'https://api.spotify.com/v1/artists/';

    fetch(FETCH_URL, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}` }
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

      //fetching artist`s top tracks
      FETCH_URL = `${TRACKS_URL}${artist.id}/top-tracks?country=PL&`
      fetch(FETCH_URL, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}` }
      })
      .then(response => response.json())
      .then(json => {
        /* const tracks = json.tracks; ES6 trick below that means the same
        if there are multiple values to declare, we can use const {tracks,albums} = json;
        to declare each of the variables */
        const {tracks} = json;
        this.setState({tracks});
      });
    });
  }

  render() {
    return(
      <div className="App">
        <div className="App-title">Music Search</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === 'Enter') {
                  this.search();
                }
              }}
            />
            <InputGroup.Append onClick={() => this.search()}>
            <Button><FaSearch/></Button>
            </InputGroup.Append>
          </InputGroup>

        </FormGroup>
        {
          this.state.artist !== null
          ? <div>
                <Profile
                  artist={this.state.artist}
                />
                <Gallery
                  tracks={this.state.tracks}
                />
              </div>
          : <div></div>
        }

      </div>
    )
  }
}

export default App;