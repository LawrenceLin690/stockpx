import React, { Component } from 'react';
import Right from './right';
import Navbar from './navbar';
import { connect } from 'react-redux';
import { fetchGroupedHoldings } from '../store/holding';
import axios from 'axios';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: {},
    };
    this.getMarketInfo = this.getMarketInfo.bind(this);
    this.getAccountValue = this.getAccountValue.bind(this);
  }

  componentDidMount() {
    this.props.userHoldings(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.holdings[0]) {
      if (
        this.props.holdings.length !== prevProps.holdings.length ||
        this.props.holdings[0].totalAmount !== prevProps.holdings[0].totalAmount
      ) {
        this.props.userHoldings(this.props.userId);
        let searchString = this.props.holdings
          .map(stock => stock.ticker.toLowerCase())
          .join();
        if (searchString) {
          this.getMarketInfo(searchString);
        }
      }
    } else {
      if (this.props.holdings.length !== prevProps.holdings.length) {
        this.props.userHoldings(this.props.userId);
        let searchString = this.props.holdings
          .map(stock => stock.ticker.toLowerCase())
          .join();
        if (searchString) {
          this.getMarketInfo(searchString);
        }
      }
    }
  }

  async getMarketInfo(symbols) {
    let res = await axios.get(`/api/iex/group/${symbols}`);
    this.setState({ portfolio: res.data });
  }

  getAccountValue() {
    if (Object.keys(this.state.portfolio).length) {
      return this.props.holdings.reduce((sum, stock) => {
        let stockPrice = this.state.portfolio[stock.ticker]
          ? this.state.portfolio[stock.ticker].quote.latestPrice
          : stock.price;
        return sum + stock.totalAmount * stockPrice;
      }, 0);
    }
  }

  render() {
    let sum = this.getAccountValue();

    return (
      <React.Fragment>
        <Navbar />
        <div id="account">
          <div id="left">
            <div style={{ color: 'burlywood', fontWeight: 'bold' }}>
              Portfolio and Total Account Value : $
              {sum
                ? sum.toLocaleString(
                    ('en',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  )
                : 0}
            </div>

            <br />
            {Object.keys(this.state.portfolio).length ? (
              this.props.holdings.map((stock, idx) => {
                return (
                  <div
                    className={
                      !this.state.portfolio[stock.ticker]
                        ? 'line'
                        : this.state.portfolio[stock.ticker].quote.open ===
                          this.state.portfolio[stock.ticker].quote.latestPrice
                        ? 'grey line'
                        : this.state.portfolio[stock.ticker].quote.open ===
                          this.state.portfolio[stock.ticker].quote.latestPrice
                        ? 'green line'
                        : 'red line'
                    }
                    key={stock.ticker + idx.toString()}
                  >
                    <div className="lineItem">
                      {stock.ticker.toUpperCase()} - {stock.totalAmount} shares
                    </div>

                    {this.state.portfolio[stock.ticker] ? (
                      <React.Fragment>
                        <div className="lineItem">
                          <div>
                            Latest:
                            {
                              this.state.portfolio[stock.ticker].quote
                                .latestPrice
                            }
                          </div>
                          <div>
                            Open:
                            {this.state.portfolio[stock.ticker].quote.open}
                          </div>
                        </div>

                        <div className="lineItem">
                          Market Value : $
                          {(
                            this.state.portfolio[stock.ticker].quote
                              .latestPrice * stock.totalAmount
                          ).toLocaleString(
                            ('en',
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          )}
                        </div>
                      </React.Fragment>
                    ) : (
                      <div>${(stock.price * stock.totalAmount).toFixed(2)}</div>
                    )}
                  </div>
                );
              })
            ) : (
              <div />
            )}
          </div>
          <div id="right">
            <Right />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  holdings: state.holding,
});

const mapDispatchToProps = dispatch => ({
  userHoldings: id => dispatch(fetchGroupedHoldings(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
