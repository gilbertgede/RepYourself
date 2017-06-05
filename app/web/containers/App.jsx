import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AboutUsFooter                    from '../components/AboutUsFooter.jsx';
import CardList                         from '../components/CardList.jsx';


class AppRepYourself extends Component {
  render() {
    const theme = getMuiTheme();
    theme.paper.color = "white";
    theme.paper.backgroundColor = "#808E95";
    theme.toolbar.backgroundColor = "#808E95";
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="root-class-style">
          <CardList cards={this.props.cards} />
          <AboutUsFooter />
        </div>
      </MuiThemeProvider>
    );
  }
}

AppRepYourself.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const select = state => state;
export default connect(select)(AppRepYourself);
