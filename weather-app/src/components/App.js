import React from 'react';
import '../assets/App.css';
import SearchLocation from './SearchLocation';
import CurrentWeather from './CurrentWeather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      showCurrentWeather: true,
    }
  }
  handleChange = e => {
    this.setState({
      location: e.target.value,
      showCurrentWeather: false // showCurrentWeather is set false to prevent the current weather component to be loaded onkey press
    });
  }
  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({ showCurrentWeather: true });
  }
  componentWillUnmount() {
    this.setState({ location: '', showCurrentWeather: false }) // clearing all state onrefresh
  }
  render() {
    let { showCurrentWeather, location } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {'Weather Forecast'}
        </header>
        <SearchLocation handleChange={this.handleChange} handleFormSubmit={this.handleFormSubmit} />
        {location && showCurrentWeather ? <CurrentWeather location={location} /> : ''}
      </div>
    );
  }
}

export default App;
