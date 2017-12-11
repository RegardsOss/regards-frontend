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
import { Tabs, Tab } from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'

import { CSS_CLASS } from '../'
import MaterialColorPicker from 'react-material-color-picker'

const propTypes = {
  val: PropTypes.string.isRequired,
  ind: PropTypes.number.isRequired,
  settingsObj: PropTypes.object.isRequired,
  valueHandler: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  onCollapsed: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isHeader: PropTypes.bool.isRequired,
}

const defaultProps = {
  val: 'val',
  ind: 7,
  settingsObj: {},
  valueHandler: () => {},
  isCollapsed: true,
  isOpen: true,
  isHeader: true,
}

const contextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

export default class ThemePropItem extends React.Component {
  constructor(props, ...args) {
    super(props, ...args)

    this.onToolTogle = this.onToolTogle.bind(this)
    this.renderProp = this.renderProp.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return true
// future: shouldComponentUpdate
//        const val = this.props.val;
//        const shouldCollapsed = (nextProps.isCollapsed !== this.props.isCollapsed);
//        const shouldOpen = (nextProps.isOpen !== this.props.isOpen);
//        const shouldsettingsObj = (nextProps.settingsObj[val] !== this.props.settingsObj[val]);
//        const shouldUpdate = (shouldCollapsed || shouldOpen || shouldsettingsObj);
//        if (shouldUpdate) {
//            console.log(
//      `shouldUpdate: ${val} ${shouldCollapsed} ${shouldOpen} ${shouldsettingsObj}`
//      );
//        }
//        return shouldUpdate;
  }

  onToolTogle() {
    this.props.onCollapsed(!this.props.isCollapsed)
  }

  renderProp(isNotHeader) {
    const { palette } = this.context.muiTheme
    const { ind, val, valueHandler, isCollapsed, isOpen, onSelect } = this.props
    const settingsObj = this.props.settingsObj || { isNotHeader }
    const onToolTogle = this.onToolTogle
    const styleHR = { borderBottom: `solid ${palette.borderColor} 1px` }
    return (
      <div>
        <PropItem
          {...{ ind, val, settingsObj, valueHandler, isNotHeader, onToolTogle, isOpen, onSelect }}
        />
        <PropToolPicker
          {...{ isCollapsed, onToolTogle }}
          settingsObj={isNotHeader ? settingsObj[val] : ''}
          valueHandler={valueHandler(val)}
        />
        <div style={{ height: isOpen ? 1 : 0, overflow: 'hidden' }}>
          <div style={styleHR} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderProp(!this.props.isHeader)}

      </div>
    )
  }
}

ThemePropItem.propTypes = propTypes
ThemePropItem.defaultProps = defaultProps
ThemePropItem.contextTypes = contextTypes

function PropItem(props, context) {
  const { palette } = context.muiTheme
  const { settingsObj, val, ind, valueHandler, isOpen, isNotHeader } = props
  const color = typeof (settingsObj[val]) === 'string' ? settingsObj[val] : ''
  const onSelect = () => {
    const select = {
      selectedProp: val,
      selectedVal: `'${settingsObj[val]}'`,
    }
    props.onSelect(select)
  }
  return (
    <div
      className={`${CSS_CLASS}-prop-item`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        paddingRight: 4,
        paddingTop: isNotHeader ? 4 : 16,
        fontSize: 12,
            // height: isOpen ? 50 : 0,
        transition: 'all 100ms ease 0ms',
        overflow: 'hidden',
        color: isNotHeader ? '' : palette.secondaryTextColor,
      }}
      onTouchTap={onSelect}
    >
      <PropHeader
        {...{ val, ind, isNotHeader }}
      />
      <div
        className={`${CSS_CLASS}-prop-value`}
        style={{
          width: 'auto',
          flexShrink: 1,
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <PropInput
          valueHandler={valueHandler(val) || null}
          settingsObj={settingsObj[val] || ''}
          isNotHeader={isNotHeader}
        />
        <PropTool
          color={color}
          onTool={props.onToolTogle}
          isNotHeader={isNotHeader}
        />
      </div>
    </div>
  )
}

PropItem.propTypes = {
  settingsObj: PropTypes.object.isRequired,
  val: PropTypes.string.isRequired,
  ind: PropTypes.number.isRequired,
  onToolTogle: PropTypes.func.isRequired,
  valueHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isNotHeader: PropTypes.bool.isRequired,
}
PropItem.contextTypes = contextTypes

function PropHeader(props, context) {
  const { ind, val, isNotHeader } = props
  return (
    <div
      className={`${CSS_CLASS}-prop-header`}
      title={val}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        flexShrink: 2,
        flexGrow: 10,
        width: 90,
      }}
    >
      <div style={{ color: context.muiTheme.palette.secondaryTextColor }} >
        {isNotHeader ? ind + 1 : '#'}
      </div>
      <div
        style={{
          marginLeft: 16,
          marginRight: 16,
          minWidth: 100,
          textAlign: 'left',
          overflow: 'hidden',
        }}
      >
        <div>{isNotHeader ? val : 'Prop Name'}</div>
      </div>
    </div>
  )
}
PropHeader.propTypes = {
  val: PropTypes.string.isRequired,
  ind: PropTypes.number.isRequired,
  isNotHeader: PropTypes.bool.isRequired,
}
PropHeader.contextTypes = contextTypes

function PropInput(props, context) {
  const { palette } = context.muiTheme
  const { valueHandler, settingsObj, isNotHeader } = props
  const isInt = (settingsObj === parseInt(settingsObj, 10))
  const strStyle = {
    width: isInt ? 40 : 'auto',
    textAlign: isInt ? 'right' : 'left',
  }
  return (isNotHeader ?
    <input
      type="text"
      onChange={valueHandler}
      value={settingsObj}
      title={settingsObj}
      style={{
        border: 'none',
        fontStyle: 'italic',
        padding: 2,
        backgroundColor: palette.canvasColor,
        color: palette.primary2Color,
        ...strStyle,
      }}
    /> :
    <div
      style={{
        border: 'none',
        minWidth: 162,
        padding: 2,
        ...strStyle,
      }}
    >
        Prop Value
      </div>
  )
}
PropInput.propTypes = {
  settingsObj: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueHandler: PropTypes.func,
  isNotHeader: PropTypes.bool.isRequired,
}
PropInput.contextTypes = contextTypes

function PropTool(props, context) {
  const { palette } = context.muiTheme
  const { isNotHeader } = props
  const blockStyle = {
    width: 16,
    height: 16,
    marginLeft: 4,
    border: `solid 1px ${palette.borderColor}`,
    backgroundColor: isNotHeader ? props.color : 'rgba(0, 0, 0, 0)',
    cursor: isNotHeader ? 'pointer' : '',
  }
  const toolProps = {
    style: blockStyle,
    title: isNotHeader ? props.color : 'view',
    onClick: isNotHeader ? props.onTool : null,
  }
  return <div {...toolProps} />
}
PropTool.propTypes = {
  isNotHeader: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  onTool: PropTypes.func.isRequired,
}
PropTool.contextTypes = contextTypes


function PropToolPicker(props, context) {
  const { settingsObj, valueHandler, onToolTogle } = props
  const initColor = `${settingsObj}`
  const style = {
    height: props.isCollapsed ? 0 : 200,
    transition: 'height 300ms ease 0ms',
    overflow: 'hidden',
  }
  const onSubmit = (event) => {
    valueHandler(event)
    onToolTogle()
  }
    // fixme: check onReset
  return (
    <div {...{ style }}>
      <div style={{ border: 'solid 1px grey' }}>
        <MaterialColorPicker
          initColor={initColor}
          onSubmit={onSubmit}
          onSelect={valueHandler}
          onHover={valueHandler}
          onReset={onSubmit}
        />
      </div>
    </div>
  )
}
PropToolPicker.propTypes = {
  settingsObj: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isCollapsed: PropTypes.bool.isRequired,
  valueHandler: PropTypes.func.isRequired,
  onToolTogle: PropTypes.func.isRequired,
}
PropToolPicker.contextTypes = contextTypes

// future: we will use when all components be ready
function PropToolPickerFull(props, context) {
  const { settingsObj, valueHandler, onToolTogle } = props
  const initColor = `${settingsObj}`
  const style = {
    height: props.isCollapsed ? 0 : 200,
    transition: 'height 300ms ease 0ms',
    overflow: 'hidden',
  }
  const tabStyle = { height: 16, marginTop: -12, fontSize: 12 }
  const onSubmit = (event) => {
    valueHandler(event)
    onToolTogle()
  }
  return (
    <div {...{ style }}>
      <Tabs
        tabItemContainerStyle={{ height: 24 }}
      >
        <Tab
          label="Color"
          style={tabStyle}
        >
          <div style={{ border: 'solid 1px grey' }}>
            <MaterialColorPicker
              initColor={initColor}
              onSubmit={onSubmit}
              onSelect={valueHandler}
              onReset={onSubmit}
            />
          </div>
        </Tab>
        <Tab label="Number" style={tabStyle} >
          <div>
            <h2>Tab Two</h2>
            <p>
                This is another example tab.
              </p>
            <Slider name="slider0" defaultValue={0.5} />
          </div>
        </Tab>
        <Tab
          label="String"
          data-route="/home"
          onActive={null}
          style={tabStyle}
        >
          <div>
            <h2>Tab Three</h2>
            <p>
                This is a third example tab.
              </p>
          </div>
        </Tab>
        <Tab label="Palette" style={tabStyle} >
          <div>
            <h2>Tab Two</h2>
            <p>
                This is another example tab.
              </p>
            <Slider name="slider0" defaultValue={0.5} />
          </div>
        </Tab>
        <Tab label="Icon" style={tabStyle} >
          <div>
            <h2>Tab Two</h2>
            <p>
                This is another example tab.
              </p>
            <Slider name="slider0" defaultValue={0.5} />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
PropToolPickerFull.propTypes = {
  settingsObj: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  valueHandler: PropTypes.func.isRequired,
  onToolTogle: PropTypes.func.isRequired,
}
PropToolPickerFull.contextTypes = contextTypes
