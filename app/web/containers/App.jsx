import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import { Grid, Row, Col }               from 'react-bootstrap';
import AboutUsFooter                    from '../components/AboutUsFooter.jsx';
import CardList                         from '../components/CardList.jsx';
import TitleBar                         from '../components/TitleBar.jsx';


class AppRepYourself extends Component {
  render() {
    return (
      <div className="root-class-style">
        <TitleBar />
        <CardList cardsTypes={this.props.cardsTypes} cardsDatas={this.props.cardsDatas} />
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
