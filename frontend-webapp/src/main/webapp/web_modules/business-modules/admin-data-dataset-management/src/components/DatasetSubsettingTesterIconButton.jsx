/*
 * LICENSE_PLACEHOLDER
 */
import get from 'lodash/get'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Snackbar from 'material-ui/Snackbar'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import RaisedButton from 'material-ui/RaisedButton'
import DatasetSubsettingTesterProgress from './DatasetSubsettingTesterProgress'

const states = {
  NOT_TESTED: 'not_tested',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
}
/**
 * An ergonmy button starting a connectivity test for th  14:10  error  'Connection' is defined but never used                             no-unused-vars
e passed {@link Connection}.<br>
 * The result of the test is displayed in place of the button, and hovering the result allows to restart the test.
 *
 * @author Xavier-Alexandre Brochard
 * @author Léo Mieulet
 */
class ConnectionTesterIconButton extends React.Component {

  static propTypes = {
    currentDataset: DataManagementShapes.Dataset,
    subsetting: PropTypes.string,
    handleTestSubsetting: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      status: states.NOT_TESTED,
      snackBarOpen: false,
    }
  }

  getSnackBarMessageId = (status) => {
    switch (status) {
      case states.SUCCESS:
        return 'dataset.subsetting.snackbar.success'
      case states.ERROR:
        return 'dataset.subsetting.snackbar.error'
      default:
        return 'dataset.subsetting.snackbar.success'
    }
  }

  handleTouchTap = () => {
    this.setState({
      status: states.PENDING,
      snackBarOpen: false,
    })
    const { handleTestSubsetting, subsetting } = this.props
    Promise.resolve(handleTestSubsetting(subsetting))
      .then((resultingAction) => {
        if (resultingAction.error || !get(resultingAction, 'payload.validity', false)) {
          this.setState({
            status: states.ERROR,
            snackBarOpen: true,
          })
        } else {
          this.setState({
            status: states.SUCCESS,
            snackBarOpen: true,
          })
        }
      })
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  handleSnackbarActionTouchTap = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  render() {
    const { currentDataset } = this.props
    const testButton = (
      <RaisedButton
        label={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.testSubsetQuery' })}
        secondary
        onTouchTap={this.handleTouchTap}
      />)

    const successButton = (<RaisedButton
      label={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.testSubsetQuery' })}
      icon={<Check color={this.context.muiTheme.palette.primary3Color} />}
      secondary
      onTouchTap={this.handleTouchTap}
    />)

    const errorButton = (<RaisedButton
      label={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.testSubsetQuery' })}
      icon={<Error color={this.context.muiTheme.palette.accent1Color} />}
      secondary
      onTouchTap={this.handleTouchTap}
    />)

    const pendingProgress = <DatasetSubsettingTesterProgress />

    const snackbar = (<Snackbar
      open={this.state.snackBarOpen}
      message={this.context.intl.formatMessage({ id: this.getSnackBarMessageId(this.state.status) }, { label: currentDataset.content.label })}
      autoHideDuration={4000}
      onRequestClose={this.handleSnackbarRequestClose}
      onActionTouchTap={this.handleSnackbarActionTouchTap}
      action="OK"
    />)

    let result = testButton
    switch (this.state.status) {
      case states.NOT_TESTED:
        result = testButton
        break
      case states.PENDING:
        result = pendingProgress
        break
      case states.SUCCESS:
        result = successButton
        break
      case states.ERROR:
        result = errorButton
        break
      default:
        result = testButton
    }
    return (
      <span>
        {result}
        {snackbar}
      </span>
    )
  }
}

export default ConnectionTesterIconButton