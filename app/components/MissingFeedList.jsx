import React, { Component } from 'react'
import List from 'preact-material-components/List'


export default class MissingFeedList extends Component {
  render() {
    return (
      <List>
        <List.Item>
          <List.PrimaryText>
            No Feed!
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