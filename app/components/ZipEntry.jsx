import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import TextField from 'preact-material-components/TextField'
import List from 'preact-material-components/List'
import Button from 'preact-material-components/Button'
import LinearProgress from 'preact-material-components/LinearProgress'

import { ACTIONS, VISIBLE_PAGES, ZIP_DATA_STATE, } from '../constants/Constants'
import { enteredZipCode, handleZipError, handleZipResponse, } from '../actions/actions'


class ZipEntry extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }
  handleChange = (event) => {
    this.setState({value: event.target.value})
    if (event.target.value.length == 5) {
      this.setState({ value: '' })
      this.props.dispatch(enteredZipCode(event.target.value))
    }
  }
  handleClick = (event) => {
    this.props.dispatch(handleZipResponse(event.target.value))
  }
  handleReset = (event) => {
    this.props.dispatch(handleZipError())
  }
  render() {
    const { zipCode, zipDataState, backendResponse, dispatch, } = this.props

    switch (zipDataState) {
    case ZIP_DATA_STATE.NONE:
      return (
          <List.TextContainer>
            Enter or update your ZIP Code to be matched with your representatives:
            <TextField
              type="number"
              size="5"
              pattern="\d*"
              hintText="Zip Code"
              hintStyle={{ color: "#C0C0C0" }}
              value={this.state.value}
              onInput={this.handleChange}
              style={{ paddingLeft: "10px" }}
            />
            <br />
          </List.TextContainer>
      )
    case ZIP_DATA_STATE.REQUEST_OPEN:
      return (
        <List.Item>
          <LinearProgress indeterminate />
        </List.Item>
      )
    case ZIP_DATA_STATE.MULTI:
      let districtOptions = []
      for (let key in this.props.backendResponse) {
        let dist = this.props.backendResponse[key]
        let rep = dist.filter(function(r) {
          return r.isSenator == false
        })[0]
        let temp = (key) => {
          return () => { this.props.dispatch(handleZipResponse(key)) }
        }
        districtOptions.push(
          <Button
            className="mdc-theme--primary-bg"
            raised
            style={{ margin: "10px" }}
            value={key}
            onClick={this.handleClick}
          >
            {`${key} - ${rep.name}`}
          </Button>
        )
      }
      return (
        <List.TextContainer>
          <p>
            Looks like your ZIP Code is in multiple congressional districts.
            Does one of these reps look familiar?
          </p>
          {districtOptions}
        </List.TextContainer>
      )
    case ZIP_DATA_STATE.ERROR:
      return (
        <List.TextContainer>
          <p>
            It looks like the ZIP Code you entered doesn't match anything we
            have on record.
          </p>
          <Button
            className="mdc-theme--primary-bg"            
            raised
            style={{ margin: "10px" }}
            onClick={this.handleReset}
          >
            Try again?
          </Button>
        </List.TextContainer>
      )
    case ZIP_DATA_STATE.RESOLVED:
      return null
    case ZIP_DATA_STATE.MULTI_RESOLVED:
      return null
    }
  }
}

const select = state => state
export default connect(select)(ZipEntry)
