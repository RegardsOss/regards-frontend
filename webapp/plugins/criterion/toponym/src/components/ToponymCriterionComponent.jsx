/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import noop from 'lodash/noop'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import EqualIcon from 'mdi-material-ui/EqualBox'
import { UIShapes, AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { getToponymHints } from '@regardsoss/toponym-common'
import { themeContextType } from '@regardsoss/theme'
import {
  AutoCompleteTextField, IconElementSelector, ShowableAtRender, ToponymUploader, UPLOADER_DISPLAY_MODES,
} from '@regardsoss/components'
import TrickToponymComponent from './TrickToponymComponent'
import CurrentToponymComponent from './CurrentToponymComponent'

/**
 * Main view component of the toponym criteria
 * @author Theo Lasserre
 */
class ToponymCriterionComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,
    // is currently in error
    error: PropTypes.bool.isRequired,
    // current field text
    toponymFilterText: PropTypes.string.isRequired,
    // current toponym dragndroped
    selectedToponymBusinessId: PropTypes.string.isRequired,
    // Required dependency to upload toponym
    uploadToponymDependency: PropTypes.string.isRequired,
    onRemoveToponym: PropTypes.func.isRequired,
    // available hints for values (optional as it may currently be fetching)
    // eslint-disable-next-line react/no-unused-prop-types
    matchingToponyms: AccessShapes.SearchToponymList, // only used in onPropertiesUpdated
    // is currently fetching values hints (optional, defaults to false)
    isFetching: PropTypes.bool,
    // callback: user typed some new text
    onUpdateToponymsFilter: PropTypes.func.isRequired,
    // callback: user selected an hint or typed enter in the text field
    onToponymFilterSelected: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    currentLocale: PropTypes.string.isRequired,
    onToponymUploaded: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Equals operator (emulates multiple operators for graphics)  */
  static EQUAL_OPERATOR = 'equals'

  /** Operators (emulates multiple operators for graphics) */
  static OPERATORS = [ToponymCriterionComponent.EQUAL_OPERATOR]

  /** Operators graphics definition */
  static OPERATORS_DEFINITION = {
    [ToponymCriterionComponent.EQUAL_OPERATOR]: {
      IconConstructor: EqualIcon,
      labelKey: 'criterion.toponym.equal.label',
      tooltipKey: 'criterion.toponym.equal.tooltip',
    },
  }

  state = {
    currentHints: [],
  }

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
    const { moduleTheme: { menuItem } } = this.context
    // when available values change, rebuild the hints datasource (avoids consuming time and memory at render)
    if (!isEqual(oldProps.matchingToponyms, newProps.matchingToponyms)) {
      this.setState({
        currentHints: getToponymHints(newProps.matchingToponyms, newProps.currentLocale, menuItem),
      })
    }
  }

  render() {
    const {
      label, toponymFilterText,
      error, isFetching, selectedToponymBusinessId, onRemoveToponym,
      onUpdateToponymsFilter, onToponymFilterSelected, onToponymUploaded, uploadToponymDependency,
    } = this.props
    const { currentHints } = this.state
    const { intl: { locale, formatMessage }, muiTheme, moduleTheme: { menuStyle } } = this.context
    return (
      <>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
            {label[locale]}
          </td>
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
            <div style={muiTheme.module.searchResults.searchPane.criteria.optionsContainer}>
              <IconElementSelector
                value={ToponymCriterionComponent.EQUAL_OPERATOR}
                choices={ToponymCriterionComponent.OPERATORS}
                choiceGraphics={ToponymCriterionComponent.OPERATORS_DEFINITION}
                onChange={noop}
              />
            </div>
          </td>
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
            <ToponymUploader
              onToponymUploaded={onToponymUploaded}
              displayMode={UPLOADER_DISPLAY_MODES.COMPACT}
            >
              <AutoCompleteTextField
                title={formatMessage({ id: 'criterion.toponym.title.tooltip' })}
                hintText={formatMessage({ id: 'criterion.toponym.hintText' })}
                currentHintText={toponymFilterText}
                currentHints={currentHints}
                isFetching={isFetching}
                isInError={error}
                onUpdateInput={onUpdateToponymsFilter}
                onFilterSelected={onToponymFilterSelected}
                menuStyle={menuStyle}
                fullWidth
              />
              <ShowableAtRender show={!isEmpty(selectedToponymBusinessId) && isEmpty(toponymFilterText)}>
                <CurrentToponymComponent
                  toponymBusinessId={selectedToponymBusinessId}
                  onRemoveToponym={onRemoveToponym}
                />
              </ShowableAtRender>
              <TrickToponymComponent
                resourceDependencies={uploadToponymDependency}
              />
            </ToponymUploader>
          </td>
        </tr>
      </>)
  }
}

export default ToponymCriterionComponent
