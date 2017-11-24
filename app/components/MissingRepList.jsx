import React, { Component } from 'react'
import List from 'preact-material-components/List'


export default class MissingRepList extends Component {
  render() {
    return (
      <List>
        <List.Item>
          <List.PrimaryText>
            No reps!
          </List.PrimaryText>
        </List.Item>
        <List.Item>            
          <List.SecondaryText>
            Have you selected your district yet?
          </List.SecondaryText>          
        </List.Item>
      </List>
    )
  }
}