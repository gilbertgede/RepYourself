import React, { Component, PropTypes }       from 'react';
import { enteredZipCode }                    from '../../actions/actions';
import { connect }                           from 'react-redux';
import CardXElement                          from './CardXElement.jsx';
import { removedCard, }                      from '../../actions/actions';
import { CARD_TYPES, }                       from '../../constants/Constants';


class ZipEntryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    if (event.target.value.length == 5) {
      this.props.dispatch(enteredZipCode(event.target.value));
    }
  }
  render() {
    var temp = () => {this.props.dispatch(removedCard(CARD_TYPES.ZIPENTER, {}))};
    return (
      <li>
        <div className="purpleCard">
          <CardXElement execute={temp} />
          <div className="flex-card-content">
            <h2 className="flex-card-heading">Welcome to RepYourself.org!</h2>
            <p>Tell us your zip code to be matched with your elected representatives!</p>
            <form className="flex-card-form">
              <label>
                <input type="number" size="5" pattern="\d*" placeholder="Zip Code" value={this.state.value} style={{textAlign: "center"}} onChange={this.handleChange} />
              </label>
            </form>
          </div>
        </div>
      </li>
    );
  }
}

ZipEntryCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const select = state => state;
export default connect(select)(ZipEntryCard);
