import React, { Component, PropTypes }    from 'react';
import { handleZipResponse }              from '../../actions/actions';
import { connect }                        from 'react-redux';
import CardXElement                       from './CardXElement';
import { removedCard, }                   from '../../actions/actions';
import { CARD_TYPES, }                    from '../../constants/Constants';


class ZipSelectCard extends Component {
  render() {
    var districtOptions = [];
    for (var key in this.props.backendResponse) {
      var dist = this.props.backendResponse[key];
      var rep = dist.filter(function(r) {
        return r.isSenator == false;
      })[0];
      var temp = (key) => {console.log("key");console.log(key); return ()=>{this.props.dispatch(handleZipResponse(key));};};
      districtOptions.push(<a className="flex-card-multi-button" onClick={temp(key)}>{key} - {rep.name}</a>);
    }
    var temp = () => {this.props.dispatch(removedCard(CARD_TYPES.ZIPSELECT, {}))};
    return (
        <li>
          <div className="purpleCard">
            <CardXElement execute={temp} />
            <div className="flex-card-content">
              <h3 className="flex-card-heading">Which Rep is yours?</h3>
              <p>Looks like your ZIP Code is in multiple congressional districts. Does one of these reps look familiar?</p>
               {districtOptions}
            </div>
          </div>
        </li>
    );
  }
}


ZipSelectCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  backendResponse: PropTypes.object.isRequired,
}


const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(ZipSelectCard);
