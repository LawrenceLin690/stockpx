import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Buy from './buy';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      ticker: '',
      tickerShow: '',
      company: '',
      price: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    if (event.key === 'Enter') {
      const res = await axios.get(
        `/api/iex/${this.state.ticker.toLowerCase()}`
      );

      if (res.data === 'Unknown symbol') {
        this.setState({ error: 'Unknown Symbol' });
      } else {
        this.setState({
          ticker: res.data.quote.symbol,
          tickerShow: res.data.quote.symbol,
          company: res.data.quote.companyName,
          price: res.data.quote.close,
          error: '',
        });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div>
            Ticker Look Up :
            <input
              name="ticker"
              type="text"
              placeholder="Enter Ticker Here"
              value={this.state.ticker}
              onChange={this.handleChange}
              onKeyPress={this.handleSubmit}
            />
          </div>
        </div>
        <div id="error">{this.state.error}</div>
        {this.state.price ? <Buy stock={this.state} /> : <div />}
      </React.Fragment>
    );
  }
}

export default Search;
