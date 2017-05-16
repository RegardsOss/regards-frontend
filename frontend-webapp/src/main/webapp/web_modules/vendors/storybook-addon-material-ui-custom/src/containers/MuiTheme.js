import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { EVENT_ID_DATA, CSS_CLASS } from '../' // future: add CSS_CLASS
// future: [x] remove ThemeToolbar
import ThemeSideBar from '../components/ThemeSideBar'
import SplitPane from 'react-split-pane'
// const stringify = require('json-stringify-safe');

const propTypes = {
  themesAppliedListInit: PropTypes.arrayOf(PropTypes.object),
  themeName: PropTypes.string,
  themeNameArr: PropTypes.arrayOf(PropTypes.string),
  story: PropTypes.object.isRequired,
  onChangeState: PropTypes.func.isRequired,
  onThemeOverride: PropTypes.func.isRequired,
  themeListRender: PropTypes.func.isRequired,
  initState: PropTypes.object,
  channel: PropTypes.object,
}

export default class MuiTheme extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = props.initState
    this.state.themesAppliedList = props.themesAppliedListInit
    this.state.muiTheme = getMuiTheme(props.themesAppliedListInit[props.initState.themeInd])
    this.state.isMount = false
    this.isChannelData = false
    this.UpdateList = {}

    this.changeTheme = this.changeTheme.bind(this)
    this.onChannel = this.onChannel.bind(this)
    this.openSideBar = this.openSideBar.bind(this)
    this.onThemeOverride = this.onThemeOverride.bind(this)
    this.subState = this.subState.bind(this)
    this.wouldComponentUpdate = this.wouldComponentUpdate.bind(this)
    this.needComponentUpdate = this.needComponentUpdate.bind(this)

    this.dataChannelSend = this.dataChannelSend.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      themesAppliedList: nextProps.themesAppliedListInit,
      muiTheme: getMuiTheme(nextProps.themesAppliedListInit[nextProps.initState.themeInd])
    })
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.onChangeState(nextState)
    this.dataChannelSend(nextState)
    this.isChannelData = false
  }

  onChannel(state) {
    // this.needComponentUpdate('ThemeSideBar')
    this.isChannelData = true
    // fixme: onThemeOverride - to store theme
    this.setState({
      ...state,
      isMount: false,
    }, () => setTimeout(() => {
      const override = this.onThemeOverride()
      override(this.state.themesAppliedList[this.state.themeInd])
      this.isChannelData = true
      this.setState({ isMount: true })
    }, 10))
  }

  onThemeOverride() {
    const propsThemeOverFunc = this.props.onThemeOverride(this.state.themeInd)
    return (overTheme) => {
      const themesAppliedList = propsThemeOverFunc(overTheme)
      // this.needComponentUpdate('ThemeSideBar')
      this.setState({ themesAppliedList })
    }
  }

  dataChannelSend(data) {
    if (this.isChannelData || !this.state.isMount) return false
    //        const dataStr = stringify(data);
    // this.props.channel.emit(EVENT_ID_DATA, data);
    return true
  }

  changeTheme(ind) {
    // this.needComponentUpdate('ThemeSideBar')
    this.setState({
      muiTheme: getMuiTheme(this.state.themesAppliedList[ind]),
      themeInd: ind,
    })
  }

  openSideBar(f) {
    // this.needComponentUpdate('ThemeSideBar')
    this.setState({
      isSideBarOpen: f,
    })
  }

  subState(componentName, prop) {
    return (val) => {
      if (val == undefined) {
        return this.state[prop]
      }
      const subState = {}
      subState[prop] = val
      this.setState(subState)
      // this.needComponentUpdate(componentName)
      return val
    }
  }

  wouldComponentUpdate(componentName) {
    if (this.UpdateList[componentName] == undefined) {
      this.UpdateList[componentName] = false
    }
    const upd = this.UpdateList[componentName]
    this.UpdateList[componentName] = false
    return upd
  }

  needComponentUpdate(componentName) {
    this.UpdateList[componentName] = true
  }

  render() {
    const ThemesNameList = this.state.themesAppliedList
      .map((val, ind) => (val.themeName || `Theme ${ind + 1}`))
    const muiTheme = getMuiTheme(
      this.props.themeListRender(this.state.themesAppliedList[this.state.themeInd]),
    )

    const isSideBarOpen = true // this.state.isSideBarOpen
    return (

      <SplitPane
        split="vertical"
        // minSize={isSideBarOpen ? 200 : 0}
        defaultSize={isSideBarOpen ? 450 : 0}
        // primary="second"
        pane1Style={{
          margin: '20px 20px 0px 20px',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
        pane2Style={{
          margin: '10px 10px 0px 10px',
          padding: 10,
          overflowY: 'auto',
          //  width: isSideBarOpen ? 'auto' : 0
        }}
        resizerStyle={{ display: isSideBarOpen ? 'auto' : 'none' }}>
        <ThemeSideBar
          shouldComponentUpdate
          shouldShowData
          open
          theme={this.state.themesAppliedList[this.state.themeInd]}
          muiTheme={muiTheme}
          themeName={ThemesNameList[this.state.themeInd]}
          fullTheme={() => true}
          collapseList={this.subState('ThemeSideBar', 'collapseList')}
          themesOverrideList={this.subState('ThemeSideBar', 'currentThemeOverride')}
          onThemeOverride={this.onThemeOverride()}
        />
        <MuiThemeProvider muiTheme={muiTheme}>
          {this.props.story}
        </MuiThemeProvider>
      </SplitPane>
    )
  }
}

MuiTheme.propTypes = propTypes
