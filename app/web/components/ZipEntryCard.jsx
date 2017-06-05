import React, { Component, PropTypes }       from 'react';
import Paper       from 'material-ui/Paper';
import Avatar       from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { enteredZipCode }                    from '../../actions/actions';
import { connect }                           from 'react-redux';
import { respondedToBadZip }                    from '../../actions/actions';
import { handleZipResponse }              from '../../actions/actions';
import { removedCard, }                      from '../../actions/actions';
import { CARD_TYPES, CARD_MODIFIERS, }       from '../../constants/Constants';


class ZipEntryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    if (event.target.value.length == 5) {
      this.setState({value: ''});
      this.props.dispatch(enteredZipCode(event.target.value));
    }
  }
  render() {
    const { data, modifier, } = this.props.card;
    var closeButton = () => {this.props.dispatch(removedCard(this.props.card))};

    var fillText = "";
    switch (modifier) {
    case CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].BASE:
      fillText = (<div>
                    <h3>Welcome to RepYourself.org</h3>
                    <p>Enter your ZIP Code to be matched with your representative:</p>
                    <TextField type="number" size="5" pattern="\d*" hintText="Zip Code" hintStyle={{color: "#C0C0C0"}} value={this.state.value} onChange={this.handleChange} inputStyle={{color: "white"}} style={ { paddingLeft: "10px" } } /><br />
                  </div>);
      break;
    case CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].ZIPSELECT:
      var districtOptions = [];
      for (var key in this.props.backendResponse) {
        var dist = this.props.backendResponse[key];
        var rep = dist.filter(function(r) {
          return r.isSenator == false;
        })[0];
        var temp = (key) => {return ()=>{this.props.dispatch(handleZipResponse(key));};};
        districtOptions.push(<RaisedButton style={{ marginLeft: "10px", marginBottom: "10px" }} backgroundColor="#596368" label={key + " - " + rep.name} labelStyle={{color: "#fff"}} onClick={temp(key)} />);
      }
      fillText = (<div>
                    <h3>Which Rep is yours?</h3>
                    <p>Looks like your ZIP Code is in multiple congressional districts. Does one of these reps look familiar?</p>
                    {districtOptions}
                  </div>);
      break;
    case CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].ZIPERROR:
      fillText = (<div>
                    <h3>Uh-oh</h3>
                    <p>It looks like the ZIP Code you entered doesn't match anything we have on record.</p>
                    <RaisedButton style={{ marginLeft: "10px", marginBottom: "10px" }} backgroundColor="#596368" label="Try again?" labelStyle={{color: "#fff"}} onClick={() => {this.props.dispatch(respondedToBadZip());}} />
                  </div>);
      break;
    }


    return (
      <div className="base-card">
        <Paper zDepth={2} style={ { position: "relative", top: "0px", left: "0px", width: "320px" } }>
          {fillText}
        </Paper>
      </div>
    );
  }
}

ZipEntryCard.propTypes = {
  card: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  backendResponse: PropTypes.object.isRequired,
};
const select = state => state;
export default connect(select)(ZipEntryCard);
