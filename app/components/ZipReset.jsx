import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import TextField from 'preact-material-components/TextField'
import Button from 'preact-material-components/Button'
import List from 'preact-material-components/List'
import LinearProgress from 'preact-material-components/LinearProgress'

import { handleZipError, } from '../actions/actions'
import { ACTIONS, VISIBLE_PAGES, ZIP_DATA_STATE, } from '../constants/Constants'


class ZipReset extends Component {
  handleReset = (event) => {
    this.props.dispatch(handleZipError())
  }
  render() {
    return (
      <List.TextContainer>      
        Current location: {this.props.stateDistrict}
        <br/>
        <Button
          style={{ margin: "10px" }}
          className="mdc-theme--primary-bg"
          raised
          onClick={this.handleReset}
        >
          Reset Location?
        </Button>
      </List.TextContainer>
    )
  }
}

const select = state => state
export default connect(select)(ZipReset)
