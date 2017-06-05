import React, { Component, PropTypes }                                 from 'react';
import { connect }                         from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import FontAwesome                                                     from 'react-fontawesome';
import { persistor, store }                                            from '../index';
import { addedCard }                       from '../../actions/actions';
import { ACTIONS, CARD_TYPES, CARD_MODIFIERS, }     from '../../constants/Constants';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class AboutUsFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleAboutUsOpen = this.handleAboutUsOpen.bind(this);
    this.handleAboutUsClose = this.handleAboutUsClose.bind(this);
  }
  handleAboutUsOpen() {
    this.setState({open: true});
  };
  handleAboutUsClose() {
    console.log("fired");
    this.setState({open: false});
  };
  render() {
    const emailOpen = ()=>{window.open("mailto:feedback@repyourself.org?Subject=Feedback for RepYourself.Org");};
    return (
      <Toolbar style={{color:"white", fontSize:"24px", height:"50px"}} >
        <ToolbarGroup style={{margin: "auto"}}>
          <IconMenu iconButtonElement={<FontAwesome className="fa-cog" name="settings"/>} >
            <MenuItem style={{color:"white"}} primaryText="Reset All Info" onClick={()=>{persistor.purge();location.reload();}} />
          </IconMenu>
        </ToolbarGroup>
        <ToolbarGroup style={{margin: "auto"}}>
          {/* <FontAwesome className="fa-share-alt" name="shareButton" onClick={()=>{this.props.dispatch(addedCard({type: CARD_TYPES.ADDREPZIP, data: {}, modifier: CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].BASE}));}}/> */}
          <FontAwesome className="fa-share-alt" name="shareButton" style={{color:"lightGray"}} />
        </ToolbarGroup>
        <ToolbarGroup style={{margin: "auto"}}>
          <FontAwesome className="fa-comments-o" name="feedbackButton" onClick={emailOpen}/>
        </ToolbarGroup>
        <ToolbarGroup style={{margin: "auto"}}>
          <FontAwesome className="fa-info" name="infoButton" onClick={this.handleAboutUsOpen}/>
          <Dialog title="About Us" open={this.state.open} onRequestClose={this.handleAboutUsClose} bodyStyle={{backgroundColor: "#DDD", overflowY: "scroll"}} titleStyle={{backgroundColor: "#DDD"}} contentStyle={{backgroundColor: "clear"}}>
              <p><strong>HOW WE STARTED</strong><br/>After the election of 2016, we asked "how can we make it easier for all Americans to participate in democracy?" After several conversations and a desire to make a tangible impact, Rep Yourself was born in February of 2017. With our mission and vision realized, all Americans will have the tools at their disposal to effectively and easily reach our elected officials.</p>
              <p><strong>OUR VISION</strong><br/>Every citizen in the United States of America is able to inform their elected representation of their preferences as it relates to proposed and enacted policies with as little effort as possible.</p>
              <p><strong>OUR MISSION</strong><br/>What we promise: we provide resources, tools and information to help all Americans stay connected with what is happening in our government and take action as they see fit on the issues that matter. <a href="mailto:feedback@repyourself.org?Subject=Feedback for RepYourself.Org">Contact</a> us with any feedback, comments or questions regarding how we can better empower you to affect real change.</p>
          </Dialog>
        </ToolbarGroup>
        <ToolbarGroup style={{margin: "auto"}}>
          <FontAwesome className="fa-plus" name="addButton" onClick={()=>{this.props.dispatch(addedCard({type: CARD_TYPES.ADDREPZIP, data: {}, modifier: CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].BASE}));}}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}



AboutUsFooter.propTypes = {
  dispatch: PropTypes.func.isRequired
};
const select = state => state;
export default connect(select)(AboutUsFooter);
