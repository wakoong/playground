import React from 'react';
import { connect } from 'react-redux';

import {
  getOrders,
  getInstrument,
  getPositions,
} from './robinhood-account-redux.tsx';
import SortingTable from '../Common/sortingTable.tsx';

class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instruments: [],
    };
  }

  componentDidMount() {
    console.log('didmount');
  }

  componentDidUpdate() {
    console.log('did update');
    if (this.props.authenticated && this.props.orders === '') {
      this.props
        .onOrders()
        .then(() => console.log('Orders retrieved'))
        .catch(e => console.error(e));
    }

    if (this.props.authenticated && this.props.positions === '') {
      this.props
        .onPositions()
        .then(positions =>
          positions.payload.results.results.filter(
            r => parseInt(r.quantity) > 0
          )
        )
        .then(positions =>
          positions.map(p => this.props.onInstrument(p.instrument))
        )
        .catch(e => console.error(e));
    }

    // if (this.props.orders && this.props.instruments.toString() === '') {
    //   this.props.orders.map(order => this.props.onInstrument(order.instrument)
    //     .then(result => console.log('Instruments received'))
    // }
  }

  componentWillMount() {
    console.log('willMount');
  }

  // componentWillReceiveProps() {
  //   console.log('1');
  //   if (this.props.order) {
  //     console.log('willReceive');
  //   }
  // }

  render() {
    const { authenticated, orders, instruments } = this.props;
    // console.log('render', this.props.orders);

    return (
      <div>
        {authenticated ? (
          <React.Fragment>
            <h1 className="tab-body-title">Stocks Overview</h1>
            {instruments.map((inst, index) => (
              <div key={index}>{inst.simple_name}</div>
            ))}
            <SortingTable />
          </React.Fragment>
        ) : (
          <div>no</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.robinhoodAccount.logged_in,
  orders: state.robinhoodAccount.orders,
  instruments: state.robinhoodAccount.instruments,
  positions: state.robinhoodAccount.positions,
});

const mapDispatchToProps = dispatch => ({
  onOrders: () => dispatch(getOrders()),
  onInstrument: url => dispatch(getInstrument(url)),
  onPositions: () => dispatch(getPositions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocks);