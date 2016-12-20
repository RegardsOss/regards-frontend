/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { map } from 'lodash'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles/styles'
import BoardItemShape from './BoardItemShape'
import BoardItemComponent from './BoardItemComponent'

/**
 * React component to dislay a full board element.
 * The board items to display are given by the props items of type BoardItemShape.
 * Eachh Board item as a list of BoardActionShape
 */
class BoardComponent extends React.Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(BoardItemShape).isRequired,
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

  render() {
    const boardItemStyles = styles(this.context.muiTheme)
    const labelToggleAdvanced = this.state.showAdvanced ?
      <FormattedMessage id="hideAdvanced" /> :
      <FormattedMessage id="showAdvanced" />
    const iconToggleAdvanced = this.state.showAdvanced ?
      <KeyboardArrowUp /> :
      <KeyboardArrowDown />

    return (
      <I18nProvider messageDir={'components/src/board/i18n'}>
        <div>
          <div
            className={boardItemStyles.board.section.classes}
            style={boardItemStyles.board.section.styles}
          >
            {map(this.props.items, (item, id) => {
              if (!item.advanced || this.state.showAdvanced) {
                return (
                  <BoardItemComponent item={item} key={id} />
                )
              }
              return null
            })}
          </div>
          <div
            className={boardItemStyles.board.action.classes}
            style={boardItemStyles.board.action.styles}
          >
            <RaisedButton
              label={labelToggleAdvanced}
              primary
              icon={iconToggleAdvanced}
              onTouchTap={this.handleToggleAdvanced}
            />
          </div>
        </div>
      </I18nProvider>
    )
  }
}

export default BoardComponent
