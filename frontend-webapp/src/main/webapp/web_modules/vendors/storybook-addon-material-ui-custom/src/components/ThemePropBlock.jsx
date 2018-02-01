/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import React from 'react'
import Paper from 'material-ui/Paper'
import SclToggle from '../material-desktop/SclToggle'
import SclAvatar from '../material-desktop/SclAvatar'
import ThemePropItem from './ThemePropItem'
import { CSS_CLASS } from '../'

const propTypes = {
  settingsObj: PropTypes.object.isRequired,
  settingsName: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  onThemeTableOverride: PropTypes.func.isRequired,
  hideBlockHeader: PropTypes.bool,
}

const contextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

export default class ThemePropBlock extends React.Component {

  static defaultProps = {
    hideBlockHeader: false,
  }

  constructor(props, ...args) {
    super(props, ...args)
    this.state = {
      toolCollapsedList: {},
    }
    this.valueHandler = this.valueHandler.bind(this)
    this.onToolCollapse = this.onToolCollapse.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.renderProp = this.renderProp.bind(this)
    this.renderColl = this.renderColl.bind(this)
  }

  onToolCollapse(val) {
    return (isCol) => {
      const { toolCollapsedList } = this.state
      toolCollapsedList[val] = isCol
      this.setState({ toolCollapsedList })
    }
  }

  onSelect(sel) {
    const select = {
      selectedTable: this.props.settingsName,
      selectedProp: '',
      selectedVal: '',
    }
    const fullSelect = Object.assign(select, sel)
    this.props.onSelect(fullSelect)
  }

  valueHandler(propName) {
    return (event) => {
      this.props.onThemeTableOverride(propName, event.target.value)
    }
  }

  renderProp(val, ind, isOpen, isHeader) {
    return (
      <div
        key={val}
        style={{
          minHeight: isOpen ? 32 + (isHeader ? 12 : 0) : 0,
          transition: 'all 200ms linear 0ms',
        }}
      >
        {isOpen ? <ThemePropItem
          val={val}
          ind={ind}
          settingsObj={this.props.settingsObj}
          valueHandler={this.valueHandler}
          isCollapsed={this.state.toolCollapsedList[val]}
          onCollapsed={this.onToolCollapse(val)}
          isOpen={isOpen || false}
          isHeader={isHeader || false}
          onSelect={this.onSelect}
        /> : null}
      </div>
    )
  }

  renderColl() {
    const settingsObj = this.props.settingsObj
    const keyList = Object.keys(settingsObj)
    const rowList = keyList.map((val, ind) => (this.renderProp(val, ind, this.props.open())))
    return (
      <div>
        {this.renderProp(`${this.props.settingsName}-header`, 0, this.props.open(), true)}
        {rowList}
      </div>)
  }

  render() {
    const { settingsName, open, hideBlockHeader } = this.props
    const onSelect = this.onSelect
    const openThis = (f) => {
      if (typeof (f) === 'undefined') return open()
      open(f)
      return null
    }
    return (
      <Paper
        style={{
          paddingLeft: 16,
          paddingRight: 4,
          paddingTop: 8,
          paddingBottom: 8,
          marginTop: 8,
        }}
      >
        {!hideBlockHeader ? <BlockHeader {...{settingsName,openThis,onSelect}} /> : null}
        {this.renderColl()}
      </Paper>
    )
  }
}

ThemePropBlock.propTypes = propTypes
ThemePropBlock.contextTypes = contextTypes

function BlockHeader(props, context) {
  const toggleHeadStyle = {
    color: context.muiTheme.palette.primary1Color,
    fontSize: context.muiTheme.flatButton.fontSize,
  }
  const toggleOpen = () => {
    props.openThis(!props.openThis())
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <SclAvatar
        onClick={props.onSelect}
        text={props.settingsName}
      />
      <div>
        <SclToggle
          label=""
          labelPosition="right"
          labelStyle={toggleHeadStyle}
          toggled={props.openThis() || false}
          onToggle={toggleOpen}
        />
      </div>
    </div>
  )
}

BlockHeader.contextTypes = contextTypes
BlockHeader.propTypes = {
  openThis: PropTypes.func.isRequired,
  settingsName: PropTypes.string.isRequired,
}
