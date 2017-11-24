import React, { Component, } from 'react'
import List from 'preact-material-components/List'
import Icon from 'preact-material-components/Icon'

import { ZIP_DATA_STATE, } from '../constants/Constants'
import ZipEntry from './ZipEntry.jsx'
import ZipReset from './ZipReset.jsx'


const tempText1 = (
  <p>
    <strong>HOW WE STARTED</strong><br/>
    After the observing the very divisive election of 2016, we asked "how 
    can we make it easier for all Americans to participate in democracy?"
    After several conversations and a desire to make a tangible impact, 
    Rep Yourself was born in February of 2017. With our mission 
    realized, all Americans will have the tools at their disposal to 
    effectively and easily reach our elected officials.
  </p>
)

const tempText2 = (
  <p>
    <strong>OUR VISION</strong><br/>
    Every citizen in the United States of America is able to inform their
    elected representation of their preferences as it relates to proposed
    and enacted policies with as little effort as possible.
  </p>
)

const tempText3 = (
  <p>
    <strong>OUR MISSION</strong><br/>
    What we promise: we provide resources, tools and information to help all
    Americans stay connected with what is happening in our government and
    take action as they see fit on the issues that matter. Contact us with
    any feedback, comments or questions regarding how we can better empower
    you to affect real change.
  </p>
)

const aboutUsItems = [
  <List.TextContainer key={"about_us_1"}>{tempText1}</List.TextContainer>,
  <List.TextContainer key={"about_us_2"}>{tempText2}</List.TextContainer>,
  <List.TextContainer key={"about_us_3"}>{tempText3}</List.TextContainer>,
]

class AboutList extends Component {
  constructor(props) {
    super(props)
    this.state = { aboutUsExpanded: false }
  }
  handleClick = () => {
    this.setState({ aboutUsExpanded: !this.state.aboutUsExpanded })
  }
  handleEmail = () => {
    // window.open("mailto:feedback@repyourself.org?Subject=RepYourself.Org Feedback")
  }
  handleShare = () => {
    // 
  }
  render() {
    let zipEntry = ""
    if (
      (this.props.zipDataState != ZIP_DATA_STATE.RESOLVED) && 
      (this.props.zipDataState != ZIP_DATA_STATE.MULTI_RESOLVED)
    ) {
      zipEntry = <ZipEntry/>
    } else {
      zipEntry = <ZipReset key={this.props.stateDistrict}/>
    }

    return (
      <List>
        {zipEntry}
        <List.LinkItem ripple={true} onClick={this.handleShare}>
          <List.ItemIcon start-detail><Icon>share</Icon></List.ItemIcon>
          Share
        </List.LinkItem>
        <List.LinkItem ripple={true} onClick={this.handleEmail}>
          <List.ItemIcon start-detail><Icon>drafts</Icon></List.ItemIcon>
          Email Us
        </List.LinkItem>
        <List.LinkItem ripple onClick={this.handleClick}>
          <List.ItemIcon start-detail><Icon>info</Icon></List.ItemIcon>        
          About Us
        </List.LinkItem>
        {this.state.aboutUsExpanded && (<List>{aboutUsItems}</List>)}
      </List>
    )
  }
}

export default AboutList
