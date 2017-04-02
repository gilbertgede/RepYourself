import React, { Component, PropTypes }    from 'react';
import { connect }                        from 'react-redux';
import FontAwesome                        from 'react-fontawesome';
import CardXElement                       from './CardXElement.jsx';
import { replacedCard, removedCard, }     from '../../actions/actions';
import { CARD_TYPES, }                    from '../../constants/Constants';
import { userMadeContact, }               from '../../backendRequests';
import { formatPhoneNumber, }             from '../../formattingHelpers';


class CongressPersonDetailCard extends Component {
  render() {
    const { rep, userID, dispatch } = this.props;
    var repName = rep.name;
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
    var closeButton = () => {dispatch(removedCard(CARD_TYPES.DETAILREP, rep));};
    var backButton = () => {dispatch(replacedCard(CARD_TYPES.DETAILREP, rep, CARD_TYPES.REP, rep));};
    // var userRefURL = "&url=http://repyouself.org/?s=" + userID;
    // var buttonIcons = [];
    // var iconList = [["phoneDC", "fa-phone", "tel:", ""],
    //                 ["twitter", "fa-twitter", "https://twitter.com/intent/tweet?text=.", "%20I%20want%20you%20to%20%2E%2E%2E%20%23repyourself" + userRefURL],
    //                 ["facebook", "fa-facebook-official", "http://www.facebook.com/", ""]];
    // iconList.forEach( function(item) {
    //   let [prop, icon, lead, trail] = item;
    //   let val = rep[prop].split(", ")[0]
    //   if (prop == "phoneDC") {
    //     val = formatPhoneNumber(val);
    //   }
    //   var contactFunction = ()=>{
    //     window.open(lead + val + trail);
    //     userMadeContact(userID, prop, rep.bioguide_id);
    //   };
    //   if (val != "") {
    //     var temp = <FontAwesome onClick={contactFunction} className={icon} name={prop} key={prop}/>;
    //   } else {
    //     var temp = <FontAwesome style={{color:"lightGray"}} className={icon} name={prop} key={prop}/>;
    //   }
    //   buttonIcons.push(temp);
    //   buttonIcons.push(<span key={prop + "span"}>{" "}</span>);
    // });
    var links = [];
    const linkList = [["phoneDC", "Capitol Office: ", "tel:"],
                      ["phoneHome", "Home Office: ", "tel:"],
                      ["twitter", "Twitter: ", "https://twitter.com/"],
                      ["website", "Website: ", ""],
                      ["wikipedia", "Wikipedia: ", ""],
                        ["facebook", "Facebook: ", "http://www.facebook.com/"]];
    linkList.forEach( function(item) {
      let [prop, name, lead] = item;
      let answers = rep[prop].split(",");
      for (var a of answers) {
        if (a != undefined && a != "") {
          let val = a;
          if (prop == "phoneDC" || prop == "phoneHome") {
            val = formatPhoneNumber(val);
          }
          var contactFunction = ()=>{
            window.open(lead + val);
          };
          links.push(<a href="#" onClick={contactFunction}>{name + a}</a>);
          links.push(<br/>);
        }
      }
    });
    return (
      <li>
        <div className={cardColor}>
          <CardXElement back={backButton} execute={closeButton} />
          <div className="flex-card-content">
            <h2 className="flex-card-title">{repName}</h2>
          </div>
          <div className="flex-card-content">
            <p style={{overflowY: "scroll", height: "170px"}}>
              <div style={{fontSize: "1.5em"}}>Bio</div>
              {rep.bio.split('\n').map((item, key)=>{return <span key={key}>{item}<br/></span>})}
            </p>
          </div>
          <div className="flex-card-stuff" style={{height: "auto"}}>
            <div className="flex-card-actions" style={{margin: "inherit", width: "100%", marginTop: "0", fontSize: "1em", padding: "0.5em .75em", overflowX: "hidden", overflowY: "scroll", height: "120px"}}>
              <h3 style={{margin: "0"}}>Additional Contact Info</h3>
              {links}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

CongressPersonDetailCard.propTypes = {
  rep: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}
const select = state => state;
export default connect(select)(CongressPersonDetailCard);
