/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { withResourceDisplayControl, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import RaisedButton from 'material-ui/RaisedButton'
import ShowableAtRender from '../cards/ShowableAtRender'
import styles from './styles/styles'


const RaisedButtonWithResourceDisplayControl = withResourceDisplayControl(RaisedButton)
/**
 * React component to dislay a full board element.
 * The board items to display are expected to be either {@link BaseBoardItemComponent}s or {@link BoardItemComponent}s.
 *
 * @author Léo Mieulet
 * @author Xavier-Alexandre Brochard
 */
class BaseBoardComponent extends React.Component {

  static propTypes = {
    advancedBoardDependencies: PropTypes.arrayOf(PropTypes.string),
    boardItemComponents: PropTypes.arrayOf(PropTypes.element),
    advancedBoardItemComponents: PropTypes.arrayOf(PropTypes.element),
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

  componentDidMount() {
    this.checkUrlAdvancedOption()
  }

  componentWillReceiveProps() {
    this.checkUrlAdvancedOption()
  }

  checkUrlAdvancedOption = () => {
    if (browserHistory.getCurrentLocation().query && browserHistory.getCurrentLocation().query.advanced === 'true') {
      this.setState({
        showAdvanced: true,
      })
    }
  }

  handleToggleAdvanced = () => {
    const { showAdvanced } = this.state
    this.setState({
      showAdvanced: !showAdvanced,
    }, () => {
      const query = browserHistory.getCurrentLocation().query
      browserHistory.push({
        pathname: browserHistory.getCurrentLocation().pathname,
        query: query ? { ...query, advanced: this.state.showAdvanced } : {
          advanced: this.state.showAdvanced,
        },
      })
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
        <RaisedButtonWithResourceDisplayControl
          resourceDependencies={this.props.advancedBoardDependencies}
          displayLogic={someMatchHateoasDisplayLogic}
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
            {map(this.props.advancedBoardItemComponents, (component, key) =>
              (<ShowableAtRender
                key={key}
                show={this.state.showAdvanced}
              >
                {component}
              </ShowableAtRender>),
            )}
          </div>

          {this.renderAdvancedToggle(computedStyles)}

        </div>
      </I18nProvider>
    )
  }
}

export default BaseBoardComponent
