import React, { Component, } from 'react'
import { connect } from 'react-redux'
import Elevation from 'preact-material-components/Elevation'
import Tabs from 'preact-material-components/Tabs'
import Toolbar from 'preact-material-components/Toolbar';
import injectTapEventPlugin from 'react-tap-event-plugin'

import Logo from '../../assets/logo6.png'
import { ACTIONS, VISIBLE_PAGES, } from '../constants/Constants'
import { changeVisiblePage } from '../actions/actions'
import ZipEntry from './ZipEntry.jsx'
import RepList from './RepList.jsx'
import FeedList from './FeedList.jsx'
import AboutList from './AboutList.jsx'


injectTapEventPlugin()

class PageContainer extends Component {
  handleChange = (event) => {
    let value = event.target.attributes.value.value
    this.props.dispatch(changeVisiblePage(value))
  }
  render() {
    let pageContent = null
    if (this.props.visiblePage == VISIBLE_PAGES.REPS) {
      pageContent = (
        <RepList
          key={`RepList-${this.props.zipDataState}`}
          reps={this.props.reps}
          userID={this.props.userID}
        />
      )
    } else if (this.props.visiblePage == VISIBLE_PAGES.FEED) {
      pageContent = (
        <FeedList
          key={`FeedList-${this.props.zipDataState}`}
        />
      )
    } else if (this.props.visiblePage == VISIBLE_PAGES.ABOUT) {
      pageContent = (
        <AboutList
          key={`AboutList-${this.props.zipDataState}`}
          zipDataState={this.props.zipDataState}
        />
      )
    }

    const repsTabActive = this.props.visiblePage == VISIBLE_PAGES.REPS
    const feedTabActive = this.props.visiblePage == VISIBLE_PAGES.FEED
    const aboutTabActive = this.props.visiblePage == VISIBLE_PAGES.ABOUT

    return (
      <div>
        <Toolbar className="mdc-elevation--z2">
          <Toolbar.Row>
            <img
              style={{ verticalAlign: "top", maxWidth: "100%", height: "auto" }}
              src={Logo}
              alt="RepYourself.org Logo"
            />
          </Toolbar.Row>
          <Toolbar.Row
            style={{ marginTop: 0, marginBottom: 0, minHeight: 0, }}
          >
            <Tabs
              indicator-accent
            >
              <Tabs.Tab
                active={repsTabActive}
                value={VISIBLE_PAGES.REPS}
                onClick={this.handleChange}
              >
                Reps
              </Tabs.Tab>
              <Tabs.Tab
                active={feedTabActive}
                value={VISIBLE_PAGES.FEED}
                onClick={this.handleChange}
              >
                Feed
              </Tabs.Tab>
              <Tabs.Tab
                active={aboutTabActive}
                value={VISIBLE_PAGES.ABOUT}
                onClick={this.handleChange}
              >
                Info
              </Tabs.Tab>
            </Tabs>
          </Toolbar.Row>
        </Toolbar>
        {pageContent}
      </div>
    )
  }
}

const select = state => state
export default connect(select)(PageContainer)
