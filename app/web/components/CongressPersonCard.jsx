import React, { Component, PropTypes }    from 'react';
import { connect }                        from 'react-redux';
import FontAwesome                        from 'react-fontawesome';
import CardXElement                       from './CardXElement.jsx';
import { removedCard, }                   from '../../actions/actions';
import { CARD_TYPES, }                    from '../../constants/Constants';
import { userMadeContact, }               from '../../backendRequests';
import { formatPhoneNumber, }             from '../../formattingHelpers';


class CongressPersonCard extends Component {
  render() {
    const { rep, userID, dispatch } = this.props;
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
    var closeButton = () => {dispatch(removedCard(CARD_TYPES.REP, rep));};
    var userRefURL = "&url=http://repyouself.org/?s=" + userID;
    var buttonIcons = [];
    var iconList = [["phoneDC", "fa-phone", "tel:", ""],
                    ["twitter", "fa-twitter", "https://twitter.com/intent/tweet?text=.", "%20I%20want%20you%20to%20%2E%2E%2E%20%23repyourself" + userRefURL],
                    ["facebook", "fa-facebook-official", "http://www.facebook.com/", ""]];
    iconList.forEach( function(item) {
      let [prop, icon, lead, trail] = item;
      let val = rep[prop].split(", ")[0]
      if (prop == "phoneDC") {
        val = formatPhoneNumber(val);
      }
      var contactFunction = ()=>{
        window.open(lead + val + trail);
        userMadeContact(userID, prop, rep.bioguide_id);
      };
      if (val != "") {
        var temp = <FontAwesome onClick={contactFunction} className={icon} name={prop} key={prop}/>;
      } else {
        var temp = <FontAwesome style={{color:"lightGray"}} className={icon} name={prop} key={prop}/>;
      }
      buttonIcons.push(temp);
      buttonIcons.push(<span key={prop + "span"}>{" "}</span>);
    });

    return (
        <li>
          <div className={cardColor}>
            <CardXElement execute={closeButton} />
            <div className="flex-card-content">
              <h2 className="flex-card-title">{repName}</h2>
            </div>
            <div className="flex-card-stuff">
              <div className="flex-card-stuff-img" style={{backgroundImage: `url(${imgURL})`}}>
                {/* <img src={imgURL} /> */}
              </div>
              <div className="flex-card-actions">
                <h3 style={{margin: "0"}}>Contact</h3>
                {buttonIcons}
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
  userID: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}
const select = state => state;
export default connect(select)(CongressPersonCard);
