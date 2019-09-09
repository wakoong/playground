import React from 'react';

import Button from '../Common/Material-UI/button.tsx';
import SimpleCard from '../Common/Material-UI/simpleCard.tsx';
import SimpleTable from '../Common/Material-UI/simpleTable.tsx';
import { SimplePieChart } from '../D3/PieChart';

import './robinhood-account.css';

class RobinhoodAccount extends React.Component {
  // DRY: extract account.payload.results.results[0] into a variable
  // Handling states using this.setStates vs. using redux

  render() {
    const cash = Math.round(this.props.account.cash).toLocaleString();
    const stock = Math.round(
      this.props.portfolio.market_value
    ).toLocaleString();

    const data = [this.props.account.cash, this.props.portfolio.market_value];
    const updated_at = new Date(this.props.account.updated_at).toLocaleString(
      'en-US',
      {
        timeZone: 'America/Los_Angeles',
      }
    );

    const {
      onLogin,
      onLogout,
      authenticated,
      instruments,
      positions,
    } = this.props;

    return (
      <div className="tab-body">
        {authenticated ? (
          <React.Fragment>
            <h1 className="tab-body-title">Total Portfolio Value</h1>
            <h2>{`Cash: $ ${cash} `}</h2>
            <h2>{`Stock: $ ${stock} `}</h2>
            <h2>{`Updated at: ${updated_at} `}</h2>
            <div>
              <SimpleCard piechart={<SimplePieChart data={data} />} />
              <SimpleTable instruments={instruments} positions={positions} />
            </div>
            <Button
              buttonColor="primary"
              class_name="position"
              on_click={onLogout}
              text="LOGOUT FROM YOUR ROBINHOOD ACCOUNT"
            />
          </React.Fragment>
        ) : (
          <Button
            buttonColor="default"
            class_name="position"
            on_click={onLogin}
            text="LOGIN TO YOUR ROBINHOOD ACCOUNT"
          />
        )}
      </div>
    );
  }
}

export default RobinhoodAccount;
