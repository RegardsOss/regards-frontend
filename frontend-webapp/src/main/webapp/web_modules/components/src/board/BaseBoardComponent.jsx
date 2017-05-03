/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/components'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles/styles'

/**
 * React component to dislay a full board element.
 * The board items to display are expected to be either {@link BaseBoardItemComponent}s or {@link BoardItemComponent}s.
 *
 * @author Léo Mieulet
 * @author Xavier-Alexandre Brochard
 */
class BaseBoardComponent extends React.Component {

  static propTypes = {
    boardItemComponents: React.PropTypes.arrayOf(React.PropTypes.element),
    advancedBoardItemComponents: React.PropTypes.arrayOf(React.PropTypes.element),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      showAdvanced: false,
    }
  }

  handleToggleAdvanced = () => {
    const { showAdvanced } = this.state
    this.setState({
      showAdvanced: !showAdvanced,
    })
  }

  renderAdvancedToggle = (computedStyles) => {
    if (!this.props.advancedBoardItemComponents || this.props.advancedBoardItemComponents.length === 0) {
      return null
    }
    const labelToggleAdvanced = this.state.showAdvanced ?
      <FormattedMessage id="hideAdvanced" /> :
      <FormattedMessage id="showAdvanced" />
    const iconToggleAdvanced = this.state.showAdvanced ?
      <KeyboardArrowUp /> :
      <KeyboardArrowDown />
    return (
      <div
        className={computedStyles.action.classes}
        style={computedStyles.action.styles}
      >
        <RaisedButton
          label={labelToggleAdvanced}
          primary
          icon={iconToggleAdvanced}
          onTouchTap={this.handleToggleAdvanced}
        />
      </div>
    )
  }

  render() {
    const computedStyles = styles(this.context.muiTheme)

    return (
      <I18nProvider messageDir={'components/src/board/i18n'}>
        <div>

          <div
            className={computedStyles.section.classes}
            style={computedStyles.section.styles}
          >
            {this.props.boardItemComponents}
          </div>

          <ShowableAtRender show={this.state.showAdvanced} >
            <div
              className={computedStyles.section.classes}
              style={computedStyles.section.styles}
            >
              {this.props.advancedBoardItemComponents}
            </div>
          </ShowableAtRender>

          {this.renderAdvancedToggle(computedStyles)}

        </div>
      </I18nProvider>
    )
  }
}

export default BaseBoardComponent
