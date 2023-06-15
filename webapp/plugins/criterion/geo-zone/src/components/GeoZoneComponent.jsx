/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import TextField from 'material-ui/TextField'
import ContainsIcon from 'mdi-material-ui/CodeArray'
import { UIShapes } from '@regardsoss/shape'
import { IconElementSelector } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SEARCH_MODES_ENUM, SEARCH_MODES } from '../domain/SearchMode'
import { FIELDS_ENUM } from '../domain/Fields'

/**
 * Main plugin component
 * @author Théo Lasserre
 */
class GeoZoneComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,
    lonMin: PropTypes.string,
    lonMax: PropTypes.string,
    latMin: PropTypes.string,
    latMax: PropTypes.string,
    onSelectMode: PropTypes.func.isRequired,
    searchMode: PropTypes.oneOf(SEARCH_MODES).isRequired,
    onTextInput: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Graphics definition by mode type */
  static MODES_DEFINITION = {
    [SEARCH_MODES_ENUM.CONTAINS]: {
      IconConstructor: ContainsIcon,
      labelKey: 'geo.zone.field.contains.selector.label',
      tooltipKey: 'geo.zone.field.contains.selector.title',
    },
  }

  render() {
    const {
      label, lonMin, lonMax, latMin, latMax, onSelectMode, searchMode,
      onTextInput,
    } = this.props
    const { intl: { locale, formatMessage }, muiTheme, moduleTheme: { fieldsLineStyle, firstTextFieldStyle, secondTextFieldStyle } } = this.context
    return (
      <>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
            {label[locale]}
          </td>
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
            <div style={muiTheme.module.searchResults.searchPane.criteria.optionsContainer}>
              <IconElementSelector
                value={searchMode}
                choices={SEARCH_MODES}
                choiceGraphics={GeoZoneComponent.MODES_DEFINITION}
                onChange={onSelectMode}
              />
            </div>
          </td>
          <td style={fieldsLineStyle}>
            <TextField
              id={FIELDS_ENUM.LAT_MIN}
              value={latMin}
              hintText={formatMessage({ id: 'geo.zone.field.latMin.tooltip' })}
              title={formatMessage({ id: 'geo.zone.field.latMin.tooltip' })}
              onChange={(event, newText) => onTextInput(newText, FIELDS_ENUM.LAT_MIN)}
              style={firstTextFieldStyle}
            />
            <TextField
              id={FIELDS_ENUM.LAT_MAX}
              value={latMax}
              hintText={formatMessage({ id: 'geo.zone.field.latMax.tooltip' })}
              title={formatMessage({ id: 'geo.zone.field.latMax.tooltip' })}
              onChange={(event, newText) => onTextInput(newText, FIELDS_ENUM.LAT_MAX)}
              style={secondTextFieldStyle}
            />
          </td>
        </tr>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          {/* empty cell */}
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell} />
          {/* empty cell */}
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell} />
          <td style={fieldsLineStyle}>
            <TextField
              id={FIELDS_ENUM.LON_MIN}
              value={lonMin}
              hintText={formatMessage({ id: 'geo.zone.field.lonMin.tooltip' })}
              title={formatMessage({ id: 'geo.zone.field.lonMin.tooltip' })}
              onChange={(event, newText) => onTextInput(newText, FIELDS_ENUM.LON_MIN)}
              style={firstTextFieldStyle}
            />
            <TextField
              id={FIELDS_ENUM.LON_MAX}
              value={lonMax}
              hintText={formatMessage({ id: 'geo.zone.field.lonMax.tooltip' })}
              title={formatMessage({ id: 'geo.zone.field.lonMax.tooltip' })}
              onChange={(event, newText) => onTextInput(newText, FIELDS_ENUM.LON_MAX)}
              style={secondTextFieldStyle}
            />
          </td>
        </tr>
      </>)
  }
}
export default GeoZoneComponent
