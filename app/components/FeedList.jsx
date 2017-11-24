import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import List from 'preact-material-components/List'
import Icon from 'preact-material-components/Icon'
import { Timeline } from 'react-twitter-widgets'

import { ACTIONS, CARD_TYPES, }          from '../constants/Constants'
import ZipEntry                          from './ZipEntry.jsx'
import MissingFeedList                   from './MissingFeedList.jsx'


class FeedList extends Component {
  render() {
    const stateDistrict = this.props.stateDistrict.toLowerCase().replace(" ", "-")
    if (stateDistrict == 'na-0') {
      return <MissingFeedList />;
    }
    return (
      <Timeline
        dataSource={{
          sourceType: 'list',
          ownerScreenName: 'repyourselforg',
          slug: `repyourself-${stateDistrict}`,
        }}
        options={{
          chrome: 'noheader, nofooter, noborders',          
          height: '100vh',
          dnt: true,
        }}
      />
    )
  }
}

const select = state => state
export default connect(select)(FeedList)
