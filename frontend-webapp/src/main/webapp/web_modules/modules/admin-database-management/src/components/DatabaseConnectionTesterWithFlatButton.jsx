import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import OnHoverSwitchFlatButton from '@regardsoss/components/src/buttons/OnHoverSwitchFlatButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Warning from 'material-ui/svg-icons/alert/warning'
import LinearProgress from 'material-ui/LinearProgress'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FormattedMessage } from 'react-intl'
import Snackbar from 'material-ui/Snackbar'

const NOT_TESTED = Symbol('The connection has not been tested yet')
const PENDING = Symbol('The connection is being established')
const SUCCESS = Symbol('The connection has successfuly been established')
const WARNING = Symbol('The connection could be established but errors occured')
const ERROR = Symbol('The connection could not be established')

const style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
}

class DatabaseConnectionTesterWithFlatButton extends React.Component {

  static propTypes = {
    projectConnection: React.PropTypes.shape({
        content: React.PropTypes.shape({
        id: React.PropTypes.number,
        projectName: React.PropTypes.string,
        microservice: React.PropTypes.string,
        userName: React.PropTypes.string,
        password: React.PropTypes.string,
        driverClassName: React.PropTypes.string,
        url: React.PropTypes.string
      }),
    }),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      status: NOT_TESTED,
      completed: 0,
      snackBarOpen: false,
      snackBarMessageId: 'database.connectionTester.snackbar.warning'
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
      status: PENDING,
      snackBarOpen: false
    })
    // Make API call instead
    this.progress(0)
    const possibleResultStates = [SUCCESS, WARNING, ERROR]
    const randomResult = possibleResultStates[Math.floor(Math.random()*possibleResultStates.length)]
    setTimeout(() => {
      this.setState({
        status: randomResult,
        completed: 0,
        snackBarOpen: true,
        snackBarMessageId: this.getSnackBarMessageId(randomResult)
      })
      clearTimeout(this.timer)
    }, 1000)
  }

  getSnackBarMessageId = (status) => {
    switch (status) {
      case SUCCESS:
        return 'database.connectionTester.snackbar.connected'
      case WARNING:
        return 'database.connectionTester.snackbar.warning'
      case ERROR:
        return 'database.connectionTester.snackbar.notConnected'
      default:
        return 'database.connectionTester.snackbar.warning'
    }
  }

  handleRequestClose = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  render() {

    const { projectConnection } = this.props;

    const testButton = <FlatButton
      label={<FormattedMessage id='database.connectionTester.start'/>}
      icon={<PlayArrow/>}
      onTouchTap={this.handleTouchTap}
    />
    const successButton =
      <OnHoverSwitchFlatButton
        label={[<FormattedMessage id='database.connectionTester.connected'/>, <FormattedMessage id='database.connectionTester.restart'/>]}
        icon={[<Check/>, <PlayArrow/>]}
        primary={[true, false]}
        onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
      />
    const warningButton =
      <OnHoverSwitchFlatButton
        label={[<FormattedMessage id='database.connectionTester.warning'/>, <FormattedMessage id='database.connectionTester.restart'/>]}
        icon={[<Warning color={this.context.muiTheme.palette.warningColor}/>, <PlayArrow />]}
        labelStyle={[{color: this.context.muiTheme.palette.warningColor}, null]}
        onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
      />
    const errorButton =
      <OnHoverSwitchFlatButton
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
        <Snackbar
          open={this.state.snackBarOpen}
          message={ <FormattedMessage id={this.state.snackBarMessageId} values={{
                      microservice: 'rs-admin',
                      driverClassName: 'PostgreSQL',
                    }} />}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default DatabaseConnectionTesterWithFlatButton
