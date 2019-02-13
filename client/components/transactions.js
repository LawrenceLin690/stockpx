import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import { fetchHoldings } from '../store/holding';

class Transactions extends Component {
  componentDidMount() {
    this.props.userHoldings(this.props.userId);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div id="transactions">
          <div style={{ color: 'burlywood', fontWeight: 'bold' }}>
            Purchase History :
          </div>
          <br />
          {this.props.holdings[0] &&
            this.props.holdings.map(stock => {
              return (
                <div className="lineT" key={stock.id}>
                  <div> Date : {stock.date}</div>
                  <div>
                    BUY ( {stock.ticker.toUpperCase()} ) -{' '}
                    {stock.quantity + ' '}
                    Shares @ ${stock.price}
                  </div>

                  <br />
                </div>
              );
            })}
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
  userHoldings: id => dispatch(fetchHoldings(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
