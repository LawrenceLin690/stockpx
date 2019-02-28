import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Buy from './buy';
import { timingSafeEqual } from 'crypto';

class Indices extends Component {
  constructor() {
    super();
    this.state = {
      tickers: [
        ['DIA', 'DOW ETF-DIA'],
        ['SPY', 'S&P 500 ETF-SPY'],
        ['QQQ', 'NASDAQ ETF-QQQ'],
      ],
      indices: {},
    };
    this.getIndexInfo = this.getIndexInfo.bind(this);
  }

  componentDidMount() {
    this.getIndexInfo();
  }

  async getIndexInfo() {
    let res = await axios.get(`/api/iex/group/spy,dia,qqq`);
    console.log(res.data);
    this.setState({ indices: res.data });
  }

  render() {
    console.log('state', this.state.indices.SPY);
    return (
      <div>
        <h2>Today's Markets:</h2>
        <div id="indices">
          {Object.keys(this.state.indices).length ? (
            this.state.tickers.map(ticker => {
              return (
                <div key={ticker} className="index">
                  <h5>{ticker[1]}:</h5>
                  <div>
                    change:{' '}
                    {(
                      this.state.indices[ticker[0]].quote.latestPrice -
                      this.state.indices[ticker[0]].quote.open
                    ).toFixed(3)}
                  </div>
                  <div>
                    % change:{' '}
                    {(
                      (100 *
                        (this.state.indices[ticker[0]].quote.latestPrice -
                          this.state.indices[ticker[0]].quote.open)) /
                      this.state.indices[ticker[0]].quote.open
                    ).toFixed(2)}
                  </div>
                  <div>
                    current: {this.state.indices[ticker[0]].quote.latestPrice}
                  </div>
                  <div> open: {this.state.indices[ticker[0]].quote.open} </div>
                </div>
              );
            })
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default Indices;
