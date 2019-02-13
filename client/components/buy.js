import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makePurchase } from '../store/holding';
import { updateCashBalance } from '../store/user';

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      display: 'hidden',
    };
  }

  render() {
    const { tickerShow, company, price } = this.props.stock;
    const cash = this.props.cash;
    return (
      <React.Fragment>
        <div id="searchResults">
          <div style={{ color: 'burlywood', fontWeight: 'bold' }}>
            Search Results :{' '}
          </div>
          <br />
          <div>Ticker : {tickerShow}</div>
          <div>Company : {company}</div>
          <div>Share Price : {price}</div>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              if (this.state.display) {
                this.setState({ display: '' });
              } else {
                this.setState({ display: 'hidden' });
              }
            }}
          >
            TRADE THIS SYMBOL
          </button>
        </div>
        <form
          onSubmit={evt => {
            evt.preventDefault();
            if (cash - evt.target.price.value * evt.target.shares.value < 0) {
              this.setState({ error: 'Not enough funds available' });
            } else {
              this.setState({ error: '' });
              this.props.handleSubmit(evt, company, this.props.userId, cash);
            }
          }}
          id="buy"
          className={this.state.display}
        >
          <br />
          <div>
            <label htmlFor="taskName">Ticker : </label>
            <input name="ticker" type="text" value={tickerShow} readOnly />
          </div>
          <div>
            <label htmlFor="assignee">Price : </label>
            <input name="price" type="text" value={price} readOnly />
          </div>
          <div>
            <label htmlFor="assignee">Shares : </label>
            <input name="shares" type="number" step="1" required />
          </div>
          <br />
          <button type="submit">BUY</button>
          <div>{this.state.error}</div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  cash: state.user.cash,
});

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt, company, userId, cash) {
      const ticker = evt.target.ticker.value;
      const price = evt.target.price.value;
      const shares = evt.target.shares.value;
      dispatch(makePurchase(ticker, company, price, shares, userId));
      let newCash = cash - price * shares;
      dispatch(updateCashBalance(newCash, userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy);
