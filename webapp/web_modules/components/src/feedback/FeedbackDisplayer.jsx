/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import root from 'window-or-global'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'
import InProgressIcon from 'mdi-material-ui/BackupRestore'
import DoneIcon from 'mdi-material-ui/Check'
import DoneWithErrorIcon from 'mdi-material-ui/AlertCircleOutline'
import { HOCUtils } from '@regardsoss/display-control'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import styles from './styles'

/**
 * Container to show feedback for events. It handles the feedback as following
 * - When fetching, shows fetchingIcon
 * - When fetching becomes false, shows for showDoneTimeMS (defaults to 500) milliseconds the configured doneIcon or failed icon,
 * depending on the doneWithError boolean value
 *
 * Notes: Feedback blocks interaction, and therefore, it should never collide with another feedback. For that reason,
 * this component is best used to show ONLY USER GESTURES FEEDBACK (and not automated pull operations for instance).
 * @author Raphaël Mechali
 */
export class FeedbackDisplayer extends React.Component {
  static propTypes = {
    // control API
    // eslint-disable-next-line react/no-unused-prop-types
    isFetching: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    showDoneTimeMS: PropTypes.number,
    // eslint-disable-next-line react/no-unused-prop-types
    doneWithError: PropTypes.bool,
    // configuration API
    // icon to show when fetching
    // eslint-disable-next-line react/no-unused-prop-types
    fetchingIcon: PropTypes.node,
    // icon to show on done (calling API is free to switch it on error)
    // eslint-disable-next-line react/no-unused-prop-types
    doneIcon: PropTypes.node,
    // icon to show on done when doneWithError is true
    // eslint-disable-next-line react/no-unused-prop-types
    doneWithErrorIcon: PropTypes.node,
  }

  static defaultProps = {
    doneWithError: false,
    showDoneTimeMS: 500,
    fetchingIcon: <InProgressIcon />,
    doneIcon: <DoneIcon />,
    doneWithErrorIcon: <DoneWithErrorIcon />,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Default component state */
  static DEFAULT_STATE = {
    // holds the current feedback icon
    currentFeedbackIcon: null,
    showLoading: true,
  }

  /** Initial component state */
  state = FeedbackDisplayer.DEFAULT_STATE

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const oldState = this.state || {}
    const {
      isFetching, fetchingIcon, showDoneTimeMS, doneWithError, doneWithErrorIcon, doneIcon,
    } = newProps

    if (oldProps.isFetching !== isFetching) {
      if (isFetching) {
        // pop feedback pane up
        this.setState({
          currentFeedbackIcon: this.decorateIcon(fetchingIcon),
          showLoading: true,
        })
      } else if (oldState.currentFeedbackIcon) { // => no longer fetching: handle only when feedback was shown
        // show the done icon and hide loading (prepare error icon for current theme rendering)
        this.setState({
          currentFeedbackIcon: this.decorateIcon(doneWithError ? doneWithErrorIcon : doneIcon, doneWithError),
          showLoading: false,
        }, () => {
          // start timer to hide OK feedback
          root.setTimeout(this.onHide, showDoneTimeMS)
        })
      } else {
        // initialize state
        this.setState(FeedbackDisplayer.DEFAULT_STATE)
      }
    }
  }

  /**
   * Done icon was shown for SHOW_DONE_MS, let the feedback hide
   */
  onHide = () => this.setState(FeedbackDisplayer.DEFAULT_STATE)

  /**
   * Decorates icon as parameter for display in feedback
   * @param baseIcon base icon from this properties
   * @param isError is error icon
   * @return decorated icon
   */
  decorateIcon = (baseIcon, isError = false) => {
    const {
      moduleTheme: { feedbackDisplay: { icon: { style } } },
      muiTheme: { textField: { errorColor } },
    } = this.context
    return HOCUtils.cloneChildrenWith(baseIcon, {
      // set up color for error
      color: isError ? errorColor : null,
      style: { // merge calling styles with error theme styles
        ...style,
        ...(baseIcon.props.style || {}),
      },
    })
  }

  render() {
    const { currentFeedbackIcon, showLoading } = this.state
    const {
      contentStyle, bodyStyle, layoutStyle, progress, paperProps,
    } = this.context.moduleTheme.feedbackDisplay

    return (
      // show dialog when there is a feedback icon
      <Dialog
        modal
        open={!!currentFeedbackIcon}
        contentStyle={contentStyle}
        bodyStyle={bodyStyle}
        paperProps={paperProps}
      >
        <div style={layoutStyle}>
          { // feedback icon when feedback should be shown (worth null otherwise)
            currentFeedbackIcon
          }
          { // show loading when feedback is display, hide it in DONE transition
            showLoading
              ? <CircularProgress size={progress.size} thickness={progress.thickness} style={progress.style} />
              : null
          }
        </div>
      </Dialog>
    )
  }
}

export default withModuleStyle(styles, true)(FeedbackDisplayer)
