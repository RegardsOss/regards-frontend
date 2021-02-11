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
import flatMap from 'lodash/flatMap'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'
import { PluginMeta } from '../../../../../shapes/form/PluginMeta'

/**
 * Shows identifier cell for a criterion:
 * - Shows plugin when available, error otherwise
 * - Allows plugin selection
 * @author Raphaël Mechali
 */
class IdentifierCriterionCellComponent extends React.Component {
  static propTypes = {
    entity: CriteriaEditableRow.isRequired,
    pluginsMetadata: PropTypes.arrayOf(PluginMeta).isRequired,
    onUpdateCriterionPlugin: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    editing: false,
  }

  /** User started edition */
  onEdit = () => this.setState({ editing: true })

  /** User stopped edition (performed only when editing to avoid useless setState calls) */
  onStopEdition = () => this.state.editing && this.setState({ editing: false })

  /**
   * Callback: user selected meta
   * @param {*} event dispatched event
   * @param {number} index selected index in list
   * @param {*} selectedMetadata user selected plugin meta
   */
  onPluginMetaSelected = (event, index, selectedMetadata) => {
    const { entity: { groupIndex, criterionIndex }, onUpdateCriterionPlugin } = this.props
    onUpdateCriterionPlugin(groupIndex, criterionIndex, selectedMetadata)
  }

  /**
   * Lazy loaded properties (that should be rebuilt due to react behavior on new reference)
   */
  getDropDownProps = () => {
    if (!this.dropDownProps) {
      this.dropDownProps = {
        onClose: this.onStopEdition,
        openImmediately: true, // show menu immediately
      }
    }
    return this.dropDownProps
  }

  /**
   * Renders in edition mode
   * @return {*} render element
   */
  renderInEdition() {
    const { entity: { pluginMetadata }, pluginsMetadata } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { content: { searchPane: { criterionIdCell } } } } } = this.context
    return (
      <SelectField
        value={pluginMetadata}
        onChange={this.onPluginMetaSelected}
        dropDownMenuProps={this.getDropDownProps()}
        autoWidth
      >
        {
          flatMap(pluginsMetadata, (currentMetadata, index) => [
            <MenuItem
              key={`${currentMetadata.name}.${currentMetadata.version}.option`}
              value={currentMetadata}
            >
              {/* Item header: name, version and author */}
              <div style={criterionIdCell.menuItem.headerRow}>
                <div style={criterionIdCell.menuItem.headerText}>
                  {formatMessage({ id: 'search.results.form.configuration.search.pane.identifier.column.cell.label.plugin.set' }, {
                    name: currentMetadata.name,
                    version: currentMetadata.version,
                  })}
                </div>
                <div style={criterionIdCell.menuItem.authorText}>{currentMetadata.author}</div>
              </div>
              {/* Item body: description */}
              <div style={criterionIdCell.menuItem.descriptionText}>
                {currentMetadata.description}
              </div>
            </MenuItem>,
            // Add divider when not last option
            index !== pluginsMetadata.length - 1
              ? <Divider key={`${currentMetadata.name}.${currentMetadata.version}.divider`} />
              : null,
          ])
        }
      </SelectField>)
  }

  /**
   * Renders as table cell, at rest
   * @return {*} render element
   */
  renderAtRest() {
    const { entity: { pluginMetadata } } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { content: { searchPane: { criterionIdCell } } } } } = this.context
    const {
      name, version, author, description,
    } = pluginMetadata || {}
    return (
      <div
        onClick={this.onEdit}
        style={pluginMetadata ? criterionIdCell.default : criterionIdCell.error}
        title={pluginMetadata
          ? formatMessage({ id: 'search.results.form.configuration.search.pane.identifier.column.cell.title.plugin.set' }, {
            name, version, author, description,
          })
          : formatMessage({ id: 'search.results.form.configuration.search.pane.identifier.column.cell.title.plugin.unset' })}
      >
        {
        pluginMetadata
          ? formatMessage({ id: 'search.results.form.configuration.search.pane.identifier.column.cell.label.plugin.set' }, { name, version })
          : formatMessage({ id: 'search.results.form.configuration.search.pane.identifier.column.cell.label.plugin.unset' })
      }
      </div>)
  }

  render() {
    const { editing } = this.state
    return editing ? this.renderInEdition() : this.renderAtRest()
  }
}
export default IdentifierCriterionCellComponent
