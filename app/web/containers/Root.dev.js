import React, { Component, PropTypes }                   from 'react';
import { Provider }                                      from 'react-redux';
import DevTools                                          from './DevTools';
import AppRepYourself                                    from './App';


export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <AppRepYourself />
          {/* <DevTools /> */}
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
