import React, { Component } from 'react'
import List from 'preact-material-components/List'

import MissingRepList from './MissingRepList.jsx'
import RepListItem from './RepListItem.jsx'


class RepList extends Component {
  render() {
    const { reps, userID, } = this.props

    let senatorList = []
    let repList = []
    for (let i=0; i<reps.length; i++) {
      let rep = reps[i]
      if (rep.isSenator) {
        senatorList.push(
          <RepListItem
            rep={rep}
            userID={userID}
            key={rep.bioguide_id}
          />
        )
      }
      else {
        repList.push(
          <RepListItem
            rep={rep}
            userID={userID}
            key={rep.bioguide_id}
          />
        )
      }
    }

    if (reps.length == 0) {
      return <MissingRepList/>
    }

    return (
      <List>
        <List.Item>
          <List.SecondaryText>
            U.S. Senate
          </List.SecondaryText>
        </List.Item>
        {senatorList}
        <List.Item>
          <List.SecondaryText>
            U.S. House of Representatives
          </List.SecondaryText>          
        </List.Item>
        {repList}
      </List>
    )
  }
}

export default RepList
