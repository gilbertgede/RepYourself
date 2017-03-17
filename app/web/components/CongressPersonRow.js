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
    var iconList = [["phoneDC", "fa-phone", "tel:"],
                    ["twitter", "fa-twitter", "http://twitter.com/"],
                    ["wikipedia", "fa-wikipedia-w", ""],
                    ["website", "fa-safari", ""],
                    ["facebook", "fa-facebook-official", "http://www.facebook.com/"]];
    iconList.forEach( function(item) {
      var [prop, icon, lead] = item;
      var val = rep[prop].split(", ")[0]
      if (val != "") {
        var temp = <FontAwesome onClick={()=>{window.open(lead + val);}} className={icon} name={prop} key={rep.name + prop}/>;
      } else {
        var temp = <FontAwesome style={{color:"lightGray"}} className={icon} name={prop} key={rep.name + prop}/>;
      }
      buttonIcons.push(temp);
      buttonIcons.push(<span>{" "}</span>);
    });

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
