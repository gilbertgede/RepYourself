import React, { Component, PropTypes }   from 'react';
import { connect }                       from 'react-redux';
import CardXElement                      from './CardXElement';
import { CARD_TYPES, }                   from '../../constants/Constants';
import { removedCard, }                  from '../../actions/actions';

var FontAwesome = require('react-fontawesome');


class CongressPersonCard extends Component {
  render() {
    const { rep, dispatch } = this.props;
    var title = rep.isSenator == true ? "Sen." : "Rep.";
    var repName = title + " " + rep.name + " (" + rep.party[0] + ")";
    // var bioInfo = <p>• In office since {rep.incumbentSince}<br/></p>;
    var imgURL = rep.image_url;
    var cardColor = "";
    switch (rep.party[0]) {
      case "D":
        cardColor = "blueCard";
        break;
      case "R":
        cardColor = "redCard";
        break;
      case "I":
        cardColor = "greenCard";
        break;
    }
    var temp = () => {dispatch(removedCard(CARD_TYPES.REP, rep));}
    return (
        <li>
          <div className={cardColor}>
            <CardXElement execute={temp} />
            <div className="flex-card-content">
              <h2 className="flex-card-title">{repName}</h2>
            </div>
            <div className="flex-card-stuff">
              <div className="flex-card-stuff-img" style={{backgroundImage: `url(${imgURL})`}}>
                {/* <img src={imgURL} /> */}
              </div>
              <div className="flex-card-actions">
                <h3 style={{margin: "0"}}>Contact</h3>
                <FontAwesome style={{color:"lightGray"}} className="fa-phone"/>{" "}
                <FontAwesome style={{color:"lightGray"}} className="fa-twitter"/>{" "}
                <FontAwesome style={{color:"lightGray"}} className="fa-facebook-official"/>{" "}
              </div>
            </div>
            {/* <div className="flex-card-content">
              {bioInfo}
            </div> */}
            <a href="#" className="flex-card-button">More Info ></a>
          </div>
        </li>
    );
  }
}

CongressPersonCard.propTypes = {
  rep: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(CongressPersonCard);
