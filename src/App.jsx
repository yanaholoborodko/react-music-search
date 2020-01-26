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
    console.log('state', this.state);
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