import React, { Component, PropTypes } from 'react';
import { connect }                     from 'react-redux';
import { Grid, Row, Col }              from 'react-bootstrap';

// components
import TitleBar                        from '../components/TitleBar';
import ZipCodeEntry                    from '../components/ZipCodeEntry';
import CongressPersonDetail            from '../components/CongressPersonDetail';
import CongressPersonTable             from '../components/CongressPersonTable';
import AboutUs                         from '../components/AboutUs';
import ZipError                        from '../components/ZipError';
import ZipMultiSelect                  from '../components/ZipMultiSelect';

// actions
import { ACTIONS, SECTIONS, } from '../../constants/Constants';

/** The app entry point */
class AppRepYourself extends Component {
  render() {
    // injected by connect call
    const { dispatch, data } = this.props;
    var displaySection;
    switch (this.props.section) {
    case SECTIONS.INTRO:
      displaySection = <ZipCodeEntry dispatch={dispatch}/>;
      break;
    case SECTIONS.REPS:
      displaySection = <CongressPersonTable dispatch={dispatch} reps={data.reps}/>;
      break;
    case SECTIONS.ABOUT:
      displaySection = <AboutUs/>;
      break;
    case SECTIONS.ZIPERROR:
      displaySection = <ZipError dispatch={dispatch}/>;
      break;
    case SECTIONS.ZIPSELECT:
      displaySection = <ZipMultiSelect dispatch={dispatch} backendResponse={data.backendResponse}/>;
      break;
    case SECTIONS.DETAILREP:
      displaySection = <CongressPersonDetail dispatch={dispatch} detailRep={data.detailRep}/>;
      break;
    default:
      displaySection = <ZipCodeEntry dispatch={dispatch}/>;
      break;
    }
    return (
      <div className="root-class-style">
        <TitleBar/>
        <Grid style={{width: "inherit"}}>
          <div className="navBar">{"   "}</div>
          <div>
            {displaySection}
          </div>
        </Grid>
      </div>
    );
  }
}

AppRepYourself.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(AppRepYourself);
