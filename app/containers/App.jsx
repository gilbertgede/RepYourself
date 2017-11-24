import React, { Component, } from 'react'
import { Provider, connect, } from 'react-redux'
// With the total number of material components used, cheaper to import all
import 'preact-material-components/style.css'

import PageContainer from '../components/PageContainer.jsx'
import './style.scss'


class AppRepYourself extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <PageContainer />
      </Provider>
    )
  }
}

const select = state => state
export default connect(select)(AppRepYourself)
