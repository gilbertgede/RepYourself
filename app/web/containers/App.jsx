import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import { Grid, Row, Col }               from 'react-bootstrap';
import AboutUsFooter                    from '../components/AboutUsFooter.jsx';
import CardList                         from '../components/CardList.jsx';
import TitleBar                         from '../components/TitleBar.jsx';


class AppRepYourself extends Component {
  render() {
    var temp = window.location.search;
    history.pushState({}, null, "/");
    return (
      <div className="root-class-style">
        <TitleBar />
          {/* <div className="navBar">{"   "}</div> */}
        <CardList cardsTypes={this.props.cardsTypes} cardsDatas={this.props.cardsDatas} />
        <p>{temp}</p>
        <AboutUsFooter />
      </div>
    );
  }
}

AppRepYourself.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const select = state => state;
export default connect(select)(AppRepYourself);
