/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import KeyboardArrowUp from 'mdi-material-ui/ChevronUp'
import KeyboardArrowDown from 'mdi-material-ui/ChevronDown'
import { ShowableAtRender, withResourceDisplayControl, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles/styles'
import messages from './i18n'

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

  /** Initial state */
  state = {
    showAdvanced: false,
  }

  componentDidMount() {
    this.checkUrlAdvancedOption()
  }

  UNSAFE_componentWillReceiveProps() {
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
      const { query } = browserHistory.getCurrentLocation()
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
    const labelToggleAdvanced = this.state.showAdvanced
      ? <FormattedMessage id="hideAdvanced" />
      : <FormattedMessage id="showAdvanced" />
    const iconToggleAdvanced = this.state.showAdvanced
      ? <KeyboardArrowUp />
      : <KeyboardArrowDown />
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
          onClick={this.handleToggleAdvanced}
        />
      </div>
    )
  }

  render() {
    const computedStyles = styles(this.context.muiTheme)

    return (
      <I18nProvider messages={messages}>
        <div>
          <div
            className={computedStyles.section.classes}
            style={computedStyles.section.styles}
          >
            {this.props.boardItemComponents}
            {map(this.props.advancedBoardItemComponents, (component, key) => (
              <ShowableAtRender
                key={key}
                show={this.state.showAdvanced}
              >
                {component}
              </ShowableAtRender>))}
          </div>

          {this.renderAdvancedToggle(computedStyles)}

        </div>
      </I18nProvider>
    )
  }
}

export default BaseBoardComponent
