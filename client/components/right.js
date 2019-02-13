import React from 'react';
import Search from './search';
import { connect } from 'react-redux';

const Right = props => {
  return (
    <React.Fragment>
      <div style={{ color: 'burlywood', fontWeight: 'bold' }}>
        Available Cash Balance : ${props.cash.toLocaleString()}
      </div>
      <br />
      <Search />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  cash: state.user.cash,
});

export default connect(
  mapStateToProps,
  null
)(Right);
