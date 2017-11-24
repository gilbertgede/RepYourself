import React, { Component, }    from 'react'
import List from 'preact-material-components/List'
import Icon from 'preact-material-components/Icon'
import Menu from 'preact-material-components/Menu'
import Button from 'preact-material-components/Button'

import { userMadeContact, } from '../utils/backendRequests'
import { formatPhoneNumber, } from '../utils/formattingHelpers'


const linkList = [
  ["phoneDC", "Capitol Office: ", "tel:"],
  ["phoneHome", "Home Office: ", "tel:"],
  ["twitter", "Twitter: ", "https://twitter.com/"],
  ["website", "Website: ", ""],
  ["wikipedia", "Wikipedia: ", ""],
  ["facebook", "Facebook: ", "http://www.facebook.com/"]
]

class RepListItem extends Component {
  constructor(props) {
    super(props)
    this.state = { repExpanded: false }
  }
  handleClick = () => {
    this.setState({ repExpanded: !this.state.repExpanded })
  }
  render() {
    const { userID, rep, } = this.props
    const userRefURL = `http://repyouself.org%2F%3Fs%3D${userID}`
    let repName = `${rep.name} (${rep.party[0]})`

    let links = []
    linkList.forEach( function(item) {
      let [prop, name, lead] = item
      let answers = rep[prop].split(",")
      answers.forEach(function (a) {
        if (a != undefined && a != "") {
          let val = a
          if (prop == "phoneDC" || prop == "phoneHome") {
            val = formatPhoneNumber(val)
          }
          let contactFunction = (event)=>{
            window.open(lead + val)
            event.stopPropagation()            
          }
          links.push(
            <a
              href="#"
              onClick={contactFunction}
              key={name + prop + val}
              style={{color: "#000"}}>
              {name + a}
            </a>
          )
          links.push(
            <br key={"br" + name + prop + val} />
          )
        }
      })
    })
    const textLines = rep.bio.split('\n').map((item, key) => {
      return <span key={key}>{item}<br/></span>
    })
    const extraStuff = (
      <div>
        <h3 style={{ marginTop: "0", paddingTop: "0", paddingBottom: "0" }}>Bio</h3>
        <p>
          {textLines}
        </p>
        <h3 style={{ paddingBottom: "0" }}>Additional Contact Info</h3>
        <p>
          {links}
        </p>
      </div>
    )

    let actions = []
    const actionList = [
      [
        "phoneDC",
        "Call",
        "tel:",
        ""
      ],
      [
        "twitter",
        "Tweet",
        "https://twitter.com/intent/tweet?text=.",
        "%20I%20want%20you%20to%20%2E%2E%2E%20%23repyourselforg&url=" + userRefURL
      ],
      // [
      //   "facebook",
      //   "FB Post",
      //   "http://www.facebook.com/dialog/feed?app_id=184683071273&description=",
      //   (
      //     "%20I%20want%20you%20to%20%2E%2E%2E%20&hashtag=%23repyourselforg&link="
      //     + userRefURL + "&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F"
      //   )
      // ],
    ]

    actionList.forEach( function(item) {
      let [prop, actionName, lead, trail] = item
      let val = rep[prop].split(", ")[0]
      if (prop == "phoneDC") {
        val = formatPhoneNumber(val)
      }
      let contactFunction = (event)=>{
        event.stopPropagation()
        window.open(lead + val + trail)
        userMadeContact(userID, prop, rep.bioguide_id)
      }
      if (val != "") {
        actions.push(
          <Menu.Item
            key={prop}
            name={prop}
            key={prop}
            onClick={contactFunction}
          >
            {actionName}
          </Menu.Item>
        )
      }
    })

    const rightIconMenu = (
      <Menu.Anchor className="mdc-list-item__end-detail">
        <Button
          className="mdc-list-item__end-detail"
          dense
          compact
          onClick={(e) => {
            this.menu.MDComponent.open = !this.menu.MDComponent.open
            e.stopPropagation() 
          }}
          >
          <Icon>call</Icon>
        </Button>
        <Menu
          ref={(menu) => {
            this.menu = menu 
          }}
        >
          {actions}
        </Menu>
      </Menu.Anchor>
    )

    let bgColor = ""
    let minorBGColor = ""
    switch (rep.party[0]) {
    case "D":
      // bgColor = "rgba(33, 150, 243, 0.7)"
      minorBGColor = "rgba(33, 150, 243, 0.3)"
      break
    case "R":
      // bgColor = "rgba(244, 67, 54, 0.7)"
      minorBGColor = "rgba(244, 67, 54, 0.3)"
      break
    case "I":
      // bgColor = "rgba(66, 191, 73, 0.7)"
      minorBGColor = "rgba(66, 191, 73, 0.3)"
      break
    }
    let nestedItems = (
      <List.TextContainer
        style={{ backgroundColor: minorBGColor }}
        className="nested"
        onClick={this.handleClick}
        key="dummy1"
      >
        {extraStuff}
      </List.TextContainer>
    )

    let roundedImageURL = ""
    if (rep.image_url) {
      roundedImageURL = rep.image_url.substring(0, rep.image_url.length - 3) + 'png'
    }

    return (
      <div>
        <List.Item
          onClick={this.handleClick}
          style={{ backgroundColor: bgColor }}
        >
          <List.ItemAvatar
            start-detail
            style={{ width: "48px", height: "48px", }}
            src={roundedImageURL}
          />
          {repName}
          {rightIconMenu}
        </List.Item>
        {this.state.repExpanded && nestedItems}
      </div>
    )
  }
}

export default RepListItem
