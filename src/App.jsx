import React, {Component} from "react";
import './App.css';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL =  `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    fetch(FETCH_URL, { method: 'GET', headers: { 'Authorization': `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}` } })
        .then(response => response.json())
        .then(json => console.log('json', json));
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
        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;