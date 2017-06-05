import React, { Component, PropTypes }    from 'react';
import { connect }                        from 'react-redux';
import FontAwesome                        from 'react-fontawesome';
import Paper       from 'material-ui/Paper';
import Avatar       from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { modifiedCard, removedCard, }     from '../../actions/actions';
import { CARD_TYPES, CARD_MODIFIERS, }    from '../../constants/Constants';
import { userMadeContact, }               from '../../backendRequests';
import { formatPhoneNumber, }             from '../../formattingHelpers';


class CongressPersonCard extends Component {
  render() {
    const { userID, dispatch, } = this.props;
    const { data, modifier, } = this.props.card;
    const rep = data;
    const userRefURL = "http://repyouself.org%2F%3Fs%3D" + userID;
    var title = rep.isSenator == true ? "Sen." : "Rep.";
    var repName = title + " " + rep.name + " (" + rep.party[0] + ")";

    var bgColor = "";
    switch (rep.party[0]) {
      case "D":
        bgColor = "#2196F3";
        break;
      case "R":
        bgColor = "#F44336";
        break;
      case "I":
        bgColor = "#42BF49";
        break;
    }

    var buttonIcons = [];
    var iconList = [["phoneDC", "fa-phone", "tel:", ""],
                    ["twitter", "fa-twitter", "https://twitter.com/intent/tweet?text=.", "%20I%20want%20you%20to%20%2E%2E%2E%20%23repyourselforg&url=" + userRefURL],
                    ["facebook", "fa-facebook-official", "http://www.facebook.com/dialog/feed?app_id=184683071273&description=", "%20I%20want%20you%20to%20%2E%2E%2E%20&hashtag=%23repyourselforg&link=" + userRefURL + "&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F"]];
    iconList.forEach( function(item) {
      let [prop, icon, lead, trail] = item;
      let val = rep[prop].split(", ")[0]
      if (prop == "phoneDC") {
        val = formatPhoneNumber(val);
      }
      var contactFunction = (event)=>{
        event.stopPropagation();
        window.open(lead + val + trail);
        userMadeContact(userID, prop, rep.bioguide_id);
      };
      if (val != "") {
        var temp = <FontAwesome onClick={contactFunction} style={{cursor: "pointer"}} className={icon} name={prop} key={prop}/>;
      } else {
        var temp = <FontAwesome style={{color:"lightGray"}} className={icon} name={prop} key={prop}/>;
      }
      buttonIcons.push(temp);
      buttonIcons.push(<span key={prop + "span"}>{"  "}</span>);
    });

    var detailChange = ()=>{
      var newModifier = CARD_MODIFIERS[this.props.card.type].BASE;
      if (this.props.card.modifier == newModifier) {
        newModifier = CARD_MODIFIERS[this.props.card.type].DETAIL;
      }
      console.log("detailChange");
      console.log(newModifier);
      this.props.dispatch(modifiedCard(this.props.card, newModifier));
    }

    var extraStuff = "";
    if (modifier == CARD_MODIFIERS[CARD_TYPES.REP].DETAIL) {
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
            var contactFunction = (event)=>{
              event.stopPropagation();
              window.open(lead + val);
            };
            links.push(<a href="#" onClick={contactFunction}>{name + a}</a>);
            links.push(<br/>);
          }
        }
      });
      extraStuff = (<div>
        <h3 style={{ paddingTop: "0px", paddingBottom: "0px" }}>Bio</h3>
        <p style={{ width: "270px", fontSize: "12px", paddingTop: "0px"}}>
          {rep.bio.split('\n').map((item, key)=>{return <span key={key}>{item}<br/></span>})}
        </p>
        <h3 style={{ paddingBottom: "0px" }}>Additional Contact Info</h3>
        <p style={{ width: "270px", fontSize: "12px", paddingTop: "0px" }}>
          {links}
        </p>
      </div>);
    }

    return (
      <div className="base-card">
        <Paper onClick={detailChange} zDepth={2} style={ { position: "relative", top: "0px", left: "40px", minHeight: '126px', width: '280px', backgroundColor: bgColor } }>
           <IconButton style={{position: "absolute", top: "0px", right: "0px", padding: "0px" }} iconStyle={{color: "#fff"}}><NavigationClose onClick={() => {dispatch(removedCard(this.props.card));}}/></IconButton>
           <h3 style={ { width: "220px", paddingTop: "10px", paddingLeft: "50px" } }> {repName} </h3>
           <div style={ { textAlign: "right", fontSize: "48px", paddingTop: "10px", paddingRight: "10px"} }>
             {buttonIcons}
           </div>
         {extraStuff}
         </Paper>
         <Paper circle zDepth={1} style={{ position: "absolute", top: "30px", left: "0px", height: "88px" }}>
           <Avatar src={rep.image_url} size={88} style={{objectFit: "cover", }}/>
         </Paper>
      </div>
    );
  }
}

CongressPersonCard.propTypes = {
  card: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}
const select = state => state;
export default connect(select)(CongressPersonCard);
