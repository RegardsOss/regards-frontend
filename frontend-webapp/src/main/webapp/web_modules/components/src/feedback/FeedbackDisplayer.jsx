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
import compose from 'lodash/fp/compose'
import root from 'window-or-global'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'
import DoneIcon from 'material-ui/svg-icons/action/done'
import { connect } from '@regardsoss/redux'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { UIClient } from '@regardsoss/client'
import styles from './styles'

/**
 * Container to show feedback for events as defined in redux client regardsoss/ui/feedback.
 * It must be used to inform / block user gestures on long events. It shows an icon for each defined feedback type with loading
 * circle. After hiding feedback, the component shows DONE for SHOW_DONE_MS time then hides.
 * API user must define feedback type to icon map.
 * If this container encounters an unknown feedback type, it will just hide
 * Notes: Feedback blocks interaction, and therefore, it should never collide with another feedback. For that reason,
 * this component is best used to show ONLY USER GESTURES FEEDBACK (in progress / done and such).
 * @author Raphaël Mechali
 */
export class FeedbackDisplayer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { feedbackSelector }) {
    return {
      feedbackType: feedbackSelector.getFeedbackType(state),
    }
  }


  static propTypes = {
    // selector in redux store for feedback state, used in mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    feedbackSelector: PropTypes.instanceOf(UIClient.FeedbackSelectors).isRequired,
    // icon constructor  by feedback type (map as a JS object), used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    iconByType: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    // from map state to props
    // current feedback type, used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    feedbackType: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Default component state */
  static DEFAULT_STATE = {
    // holds the current feedback icon
    CurrentFeedbackIconConst: null,
    showLoading: true,
  }

  /** DONE icon show time, after loading was done */
  static SHOW_DONE_MS = 500

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const oldState = this.state || {}
    const newState = {
      CurrentFeedbackIconConst: newProps.iconByType[newProps.feedbackType] || null,
      showLoading: true,
    }
    const oldFeedbackIcon = oldState.CurrentFeedbackIconConst
    const newFeedbackIcon = newState.CurrentFeedbackIconConst
    if (oldFeedbackIcon !== newFeedbackIcon) {
      // state change detected, determinate which change it is
      if (oldFeedbackIcon && !newFeedbackIcon) {
        // this is a hide feedback operation:
        // 1 - start timeout for the DONE TRANSITION effect
        root.setTimeout(this.onHide, FeedbackDisplayer.SHOW_DONE_MS)
        // 2 - show the done icon instead of none and hide loading
        newState.CurrentFeedbackIconConst = DoneIcon
        newState.showLoading = false
      }
      // else: when new feedback (with or without previous) OR changing the map / selectors, just update to feet the new state
      this.setState(newState)
    }
    // else: ignored case since nothing changed in state
  }

  /**
   * Done icon was shown for SHOW_DONE_MS, let the feedback hide
   */
  onHide = () => this.setState(FeedbackDisplayer.DEFAULT_STATE)


  render() {
    const { CurrentFeedbackIconConst, showLoading } = this.state
    const {
      contentStyle, bodyStyle, layoutStyle, iconStyle, progress, paperProps,
    } = this.context.moduleTheme.feedbackDisplay

    return (
      // show dialog when there is a feedback icon
      <Dialog
        modal
        open={!!CurrentFeedbackIconConst}
        contentStyle={contentStyle}
        bodyStyle={bodyStyle}
        paperProps={paperProps}
      >
        <div style={layoutStyle} >
          { // feedback icon when feedback should be shown
            CurrentFeedbackIconConst ?
              <CurrentFeedbackIconConst style={iconStyle} /> :
              null
          }
          { // show loading when feedback is display, hide it in DONE transition
            showLoading ?
              <CircularProgress size={progress.size} thickness={progress.thickness} style={progress.style} /> :
              null
          }
        </div>
      </Dialog>
    )
  }
}


export default compose(
  connect(FeedbackDisplayer.mapStateToProps, FeedbackDisplayer.mapDispatchToProps),
  withModuleStyle(styles))(FeedbackDisplayer)
