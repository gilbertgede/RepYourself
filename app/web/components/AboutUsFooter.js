import React, { Component, PropTypes }                               from 'react';
import { Nav, Navbar, NavItem, OverlayTrigger, Popover, Button }     from 'react-bootstrap';


export default class AboutUsFooter extends Component {
  render() {
    const popoverTop = (
      <Popover id="popover-positioned-scrolling-top" style={{height: "350px", overflowY: "scroll"}}>
        <p><strong>HOW WE STARTED</strong><br/>After the election of 2016, we asked "how can we make it easier for all Americans to participate in democracy?" After several conversations and a desire to make a tangible impact, Rep Yourself was born in February of 2017. With our mission and vision realized, all Americans will have the tools at their disposal to effectively and easily reach our elected officials.</p>
        <p><strong>OUR VISION</strong><br/>Every citizen in the United States of America is able to inform their elected representation of their preferences as it relates to proposed and enacted policies with as little effort as possible.</p>
        <p><strong>OUR MISSION</strong><br/>What we promise: we provide resources, tools and information to help all Americans stay connected with what is happening in our government and take action as they see fit on the issues that matter. <a href="#contact">Contact</a> us with any feedback, comments or questions regarding how we can better empower you to affect real change.</p>
      </Popover>
    );
    return (
      <Navbar fluid collapseOnSelect fixedBottom className="navBar" style={{height: "34px", backgroundColor: "#2196F3"}}>
        <OverlayTrigger rootClose container={this} trigger="click" placement="top" overlay={popoverTop}>
          <Button style={{margin: "0%", width: "100%", height: "100%", borderRadius: "0", border: "0"}}>About Us</Button>
        </OverlayTrigger>
      </Navbar>
    )
  }
}
