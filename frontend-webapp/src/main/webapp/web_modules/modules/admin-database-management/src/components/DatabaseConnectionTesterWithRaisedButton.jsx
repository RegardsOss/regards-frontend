import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import OnHoverSwitchRaisedButton from '@regardsoss/components/src/buttons/OnHoverSwitchRaisedButton'
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
const WARNING = Symbol('TODO')
const ERROR = Symbol('The connection could not be established')

class DatabaseConnectionTester extends React.Component {

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

    const testButton = <RaisedButton
      icon={<PlayArrow/>}
      onTouchTap={this.handleTouchTap}
      style={{width:20}}
    />
  //label={<FormattedMessage id='database.connectionTester.start'/>}
    const successButton = <OnHoverSwitchRaisedButton
      icon={[<Check/>, <PlayArrow/>]}
      primary={[true, false]}
      onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
    />
  //label={[<FormattedMessage id='database.connectionTester.connected'/>, <FormattedMessage id='database.connectionTester.restart'/>]}
    const warningButton = <OnHoverSwitchRaisedButton
      icon={[<Warning />, <PlayArrow />]}
      backgroundColor={[this.context.muiTheme.palette.warningColor, this.context.muiTheme.palette.secondary2Color]}
      labelColor={[this.context.muiTheme.palette.alternateTextColor, this.context.muiTheme.palette.textColor]}
      onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
    />
  //label={[<FormattedMessage id='database.connectionTester.warning'/>, <FormattedMessage id='database.connectionTester.restart'/>]}
    const errorButton = <OnHoverSwitchRaisedButton
      icon={[<Error />, <PlayArrow />]}
      secondary={[true, false]}
      onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
    />
  //label={[<FormattedMessage id='database.connectionTester.notConnected'/>, <FormattedMessage id='database.connectionTester.restart'/>]}
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

export default DatabaseConnectionTester
