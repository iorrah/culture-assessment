import React from 'react';
import './header.css';
import persistence from '../../utils/persistence/persistence';
import result from '../../data/result/result';

class Header extends React.Component {
  retakeTest() {
    persistence.reset();
    window.location.href = '/';
  }

  useMockData() {
    persistence.saveLS(result);
    window.location.href = '/result';
  }

  renderRetakeButton() {
    return (
      <button
        className="btn btn-link pull-right"
        onClick={this.retakeTest}
      >
        Retake the test
      </button>
    );
  }

  renderMockButton() {
    return (
      <button
        className="btn btn-link pull-right hidden"
        onClick={this.useMockData}
      >
        Mock data
      </button>
    );
  }

  render() {
    const canRenderRetakeButton = persistence.isAssessed();

    return (
      <header>
        <div className="wrapper">
          <button className="logo">
            Culture Assessment
          </button>

          {canRenderRetakeButton ? (
            this.renderRetakeButton()
          ) : (
            this.renderMockButton()
          )}
        </div>
      </header>
    );
  }
}

export default Header;
