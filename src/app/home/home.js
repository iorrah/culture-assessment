import React from 'react';
import Assessment from '../assessment/assessment';
import persistence from '../../utils/persistence/persistence';
import './home.css';

class Home extends React.Component {
  constructor() {
    super();

    this.checkLsForPreviousData =
      this.checkLsForPreviousData.bind(this);
  }

  componentWillMount() {
    this.checkLsForPreviousData();
  }

  checkLsForPreviousData() {
    if (persistence.isAssessed()) {
      window.location.href = '/result';
    }
  }

  render() {
    return (
      <main className="home">
        <div className="wrapper">
          <div className="line">
            <div className="fit fit-1 fit-hidden-xs">
              &nbsp;
            </div>

            <div className="fit fit-8">
              <Assessment />
            </div>

            <div className="fit fit-1 xs-fit-0">
              &nbsp;
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
