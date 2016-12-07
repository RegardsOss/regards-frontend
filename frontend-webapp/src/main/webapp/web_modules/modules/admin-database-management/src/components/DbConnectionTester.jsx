import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import OnHoverSwitchRaisedButton from './OnHoverSwitchRaisedButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Warning from 'material-ui/svg-icons/alert/warning'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {fullWhite, orange500} from 'material-ui/styles/colors'
import LinearProgress from 'material-ui/LinearProgress'

const muiTheme = getMuiTheme()

const NOT_TESTED = Symbol('The connection has not been tested yet')
const PENDING = Symbol('The connection is being established')
const SUCCESS = Symbol('The connection has successfuly been established')
const WARNING = Symbol('TODO')
const ERROR = Symbol('The connection could not be established')

class DbConnectionTester extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      status: NOT_TESTED,
      completed: 0
    }
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100})
    } else {
      this.setState({completed})
      const diff = Math.random() * 10
      setTimeout(() => this.progress(completed + diff), 10)
    }
  }

  handleTouchTap = () => {
    this.setState({
      status: PENDING
    })
    // Make API call instead
    this.progress(0)
    const possibleResultStates = [SUCCESS, WARNING, ERROR]
    const randomResult = possibleResultStates[Math.floor(Math.random()*possibleResultStates.length)]
    setTimeout(() => {
      this.setState({
        status: randomResult,
        completed: 0
      })
      clearTimeout(this.timer)
    }, 1000)
  }

  render() {
    const testButton = <RaisedButton
      label={'Test'}
      icon={<PlayArrow />}
      onTouchTap={this.handleTouchTap}
    />
    const successButton = <OnHoverSwitchRaisedButton
      baseLabel={'Connected'}
      baseColor={muiTheme.palette.primary1Color}
      baseIcon={Check}
      hoverLabel={'Rerun test'}
      hoverColor={fullWhite}
      hoverIcon={PlayArrow}
      onTouchTap={this.handleTouchTap}
    />
    const warningButton = <OnHoverSwitchRaisedButton
      baseLabel={'Warning'}
      baseColor={orange500}
      baseIcon={Warning}
      hoverLabel={'Rerun test'}
      hoverColor={fullWhite}
      hoverIcon={PlayArrow}
      onTouchTap={this.handleTouchTap}
    />
    const errorButton = <OnHoverSwitchRaisedButton
      baseLabel={'Not connected'}
      baseColor={muiTheme.palette.accent1Color}
      baseIcon={Error}
      secondary={true}
      hoverLabel={'Rerun test'}
      hoverColor={fullWhite}
      hoverIcon={PlayArrow}
      onTouchTap={this.handleTouchTap}
    />
    const pendingProgress = <div>
      Testing connection...
      <LinearProgress style={{width:200, margin:'auto'}} mode='determinate' value={this.state.completed} />
    </div>

    let result = testButton
    switch (this.state.status) {
      case NOT_TESTED:
        result = testButton
        break
      case PENDING:
        result = pendingProgress
        break
      case SUCCESS:
        result = successButton
        break
      case WARNING:
        result = warningButton
        break
      case ERROR:
        result = errorButton
        break
      default:
        result = testButton
    }
    return result
  }
}

export default DbConnectionTester
