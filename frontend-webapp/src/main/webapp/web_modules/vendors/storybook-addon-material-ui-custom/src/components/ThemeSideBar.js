import React from 'react'
import { CSS_CLASS } from '../'
import ThemePropBlock from './ThemePropBlock'
import { copyToClipboardThis } from '../Utils'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
const BAR_WIDTH = 400

const propTypes = {
  open: React.PropTypes.bool.isRequired,
  themeName: React.PropTypes.string.isRequired,
  theme: React.PropTypes.object.isRequired,
  muiTheme: React.PropTypes.object.isRequired,
  fullTheme: React.PropTypes.func.isRequired,
  collapseList: React.PropTypes.func.isRequired,
  shouldComponentUpdate: React.PropTypes.bool.isRequired,
  shouldShowData: React.PropTypes.bool.isRequired,
  specificProp: React.PropTypes.string,
}

export default class ThemeSideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTable: '',
      selectedProp: '',
      selectedVal: '',
      isSelectedStyleObj: true,
      specificProperty: 'palette'
    }

    this.clipString = this.clipString.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onSwitchStyleObj = this.onSwitchStyleObj.bind(this)
    this.onCopy = this.onCopy.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // fixme shouldComponentUpdate - remove
    return nextProps.shouldComponentUpdate
  }

  onSelect(sel) {
    this.setState(sel)
  }

  onSwitchStyleObj() {
    const isObj = this.state.isSelectedStyleObj
    this.setState({ isSelectedStyleObj: !isObj })
  }

  onCopy() {
    const text = this.clipString()
    copyToClipboardThis(text)
  }

  clipString() {
    const table = this.state.selectedTable
    const prop = this.state.selectedProp
    const val = this.state.selectedVal
    const isObj = this.state.isSelectedStyleObj

    const strTbl = table
    const strVal = isObj ? `${prop}: ${val},` : `${table}.${prop} = ${val};`
    return prop ? strVal : strTbl
  }

  themesList = (themeObj, _props, onSelect) => {
    const onThemeTableOverride = tableName => (propName, value) => {
      const overTheme = {}
      if (tableName === 'miscellaneous') {
        overTheme[propName] = value
        _props.onThemeOverride(overTheme)
        return
      }
      overTheme[tableName] = {}
      overTheme[tableName][propName] = value
      _props.onThemeOverride(overTheme)
    }

    const themePropTable = (tableName, table) => (
      <ThemePropBlock
        key={tableName}
        settingsObj={table}
        settingsName={tableName}
        open={() => true}
        override={forTable(tableName, _props.themesOverrideList)}
        onThemeTableOverride={onThemeTableOverride(tableName)}
        onSelect={onSelect}
        hideBlockHeader
      />
    )

    const keyList = Object.keys(themeObj)

    const strList = {}
    keyList.forEach((val) => {
      if (typeof (themeObj[val]) === 'string') {
        strList[val] = themeObj[val]
      }
    })

    const { specificProperty } = this.state
    const specificPropertyBlock = themePropTable(specificProperty, themeObj[specificProperty])

    const scrollStyle = {
      height: '100%',
      overflowY: 'auto',
    }
    return (
      <div
        className={`${CSS_CLASS}-theme_sidebar-tables`}
        style={{
          flexGrow: 1,
          flexShrink: 1,
        }}
      >
        <div
          className={`${CSS_CLASS}-theme_sidebar-tables-scroll`}
          style={scrollStyle}
        >
          <div
            style={{
              paddingLeft: 3,
              paddingRight: 12,

            }}
          >
            <div>
              {specificPropertyBlock}
              <div style={{ height: 16 }}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderContent() {
    return (
      <div
        className={`${CSS_CLASS}-theme_sidebar-content`}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',

        }}
      >
        {this.props.shouldShowData ?
          this.themesList(
            this.props.fullTheme() ? this.props.muiTheme : this.props.theme,
            this.props, this.onSelect,
          )
          : null}
      </div>
    )
  }

  handleChange = (event, index, value) => this.setState({specificProperty: value})

  render() {
    const { muiTheme } = this.props
    const keyList = Object.keys(muiTheme)

    return (
      <div className={`${CSS_CLASS}-theme_sidebar`}>
        <SelectField
          floatingLabelText="Component"
          value={this.state.specificProperty}
          onChange={this.handleChange}
        >
          {keyList.map(key => (
            <MenuItem key={key} value={key} primaryText={key}/>
          ))}
        </SelectField>
        {this.props.open ? this.renderContent() : null}
      </div>
    )
  }

}

ThemeSideBar.propTypes = propTypes

ThemeSideBar.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

function forTable(tableTame, objListFunc) {
  return (val) => {
    const objList = objListFunc()
    const obj = objList[tableTame]
    if (val == undefined) {
      return obj
    }
    objList[tableTame] = val
    objListFunc(objList)
    return val
  }
}

