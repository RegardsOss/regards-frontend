import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import OnHoverSwitchFlatButton from '@regardsoss/components/src/buttons/OnHoverSwitchFlatButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Warning from 'material-ui/svg-icons/alert/warning'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {fullWhite, orange500} from 'material-ui/styles/colors'
import LinearProgress from 'material-ui/LinearProgress'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FormattedMessage } from 'react-intl'

const NOT_TESTED = Symbol('The connection has not been tested yet')
const PENDING = Symbol('The connection is being established')
const SUCCESS = Symbol('The connection has successfuly been established')
const WARNING = Symbol('The connection could be established but errors occured')
const ERROR = Symbol('The connection could not be established')

class DatabaseConnectionTesterWithFlatButton extends React.Component {

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

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

    const style = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }

    const testButton = <FlatButton
      label={<FormattedMessage id='database.connectionTester.start'/>}
      icon={<PlayArrow/>}
      onTouchTap={this.handleTouchTap}
    />
    const successButton = <OnHoverSwitchFlatButton
      label={[<FormattedMessage id='database.connectionTester.connected'/>, <FormattedMessage id='database.connectionTester.restart'/>]}
      icon={[<Check/>, <PlayArrow/>]}
      primary={[true, false]}
      onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
    />
    const warningButton = <OnHoverSwitchFlatButton
      label={[<FormattedMessage id='database.connectionTester.warning'/>, <FormattedMessage id='database.connectionTester.restart'/>]}
      icon={[<Warning />, <PlayArrow />]}
      backgroundColor={[muiTheme.palette.warningColor, muiTheme.palette.secondary2Color]}
      onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
    />
    const errorButton = <OnHoverSwitchFlatButton
      label={[<FormattedMessage id='database.connectionTester.notConnected'/>, <FormattedMessage id='database.connectionTester.restart'/>]}
      icon={[<Error />, <PlayArrow />]}
      secondary={[true, false]}
      onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
    />
  const pendingProgress = <div>
      <p style={{textAlign: 'center'}}>
        <FormattedMessage id='database.connectionTester.pending'/>
      </p>
      <LinearProgress  mode='determinate' value={this.state.completed} />
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

    return (
      <div style={style}>
        {result}
      </div>
    )
  }
}

export default DatabaseConnectionTesterWithFlatButton
