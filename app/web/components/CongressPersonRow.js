import React, { Component, PropTypes }                   from 'react';
import { Grid, Row, Col }                                from 'react-bootstrap';
import { displayDetailRep }                               from '../../actions/actions';

var FontAwesome = require('react-fontawesome');


export default class CongressPersonRow extends Component {
  render() {
    const { rep, dispatch } = this.props;
    var color = rep.party[0] == "D" ? "congress-person-row-blue" : "congress-person-row-red";
    var title = rep.isSenator == true ? "Sen." : "Rep.";
    var buttonIcons = [];
    buttonIcons.push(<span>{" "}</span>);
    if (rep.phoneDC.split(", ")[0] != "") {
      buttonIcons.push(<FontAwesome onClick={()=>{window.open("tel:9712850131");}} className='fa-phone' name="phone"/>);
    } else {
      buttonIcons.push(<FontAwesome style={{color:"lightGray"}} className='fa-phone' name="phone"/>);
    }
    buttonIcons.push(<span>{" "}</span>);
    var twitter = rep.twitter.split(", ")[0]
    if (twitter != "") {
      buttonIcons.push(<FontAwesome onClick={()=>{window.open("http://twitter.com/" + twitter);}} className='fa-twitter' name="twitter"/>);
    } else {
      buttonIcons.push(<FontAwesome style={{color:"lightGray"}} className='fa-twitter' name="twitter"/>);
    }
    buttonIcons.push(<span>{" "}</span>);
    var wikipedia = rep.wikipedia.split(", ")[0];
    if (wikipedia != "") {
      buttonIcons.push(<FontAwesome onClick={()=>{window.open(wikipedia);}} className='fa-wikipedia-w' name="wiki"/>);
    } else {
      buttonIcons.push(<FontAwesome style={{color:"lightGray"}} className='fa-wikipedia-w' name="wiki"/>);
    }
    buttonIcons.push(<span>{" "}</span>);
    var website = rep.website.split(", ")[0];
    if (website != "") {
      buttonIcons.push(<FontAwesome onClick={()=>{window.open(website);}} className='fa-safari' name="web"/>);
    } else {
      buttonIcons.push(<FontAwesome style={{color:"lightGray"}} className='fa-safari' name="web"/>);
    }
    buttonIcons.push(<span>{" "}</span>);
    var facebook = rep.facebook.split(", ")[0];
    if (facebook != "") {
      buttonIcons.push(<FontAwesome onClick={()=>{window.open("http://www.facebook.com/" + facebook);}} className='fa-facebook-square' name="facebook"/>);
    } else {
      buttonIcons.push(<FontAwesome style={{color:"lightGray"}} className='fa-facebook-official' name="facebook"/>);
    }
    buttonIcons.push(<span>{" "}</span>);

    return (
      <Col xs={12} sm={4} md={4} className={color}>
        <Col xs={11} sm={11} md={11}>
          <Row>
            <Col xs={3} sm={3} md={3} className="congress-person-row-pic">
              <img src={rep.image_url} className="congress-person-pic"/>
            </Col>
            <Col xs={9} sm={9} md={9}>
              <Row className="congress-person-row-name">
                {title} {rep.name}
              </Row>
              <Row className="congress-person-row-party">
                {rep.party[0]} - In office since {rep.incumbentSince}
              </Row>
            </Col>
          </Row>
          <Row className="congress-person-row-icons">
            {buttonIcons}
          </Row>
        </Col>
        <Col xs={1} sm={1} md={1} className="congress-person-detail-icon" onClick={() => {this.props.dispatch(displayDetailRep(rep));}}>
          <FontAwesome className='fa-angle-right' name="disclosure"/>
        </Col>
      </Col>
    );
  }
}

CongressPersonRow.propTypes = {
  rep: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}
