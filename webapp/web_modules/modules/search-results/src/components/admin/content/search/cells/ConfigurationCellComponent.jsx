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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes } from '@regardsoss/shape'
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'
import { AttributeRender } from '@regardsoss/attributes-common'
import { DamDomain } from '@regardsoss/domain'
import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'
import { CriteriaRowsHelper } from './CriteriaRowsHelper'
import { CriteriaFormHelper } from '../CriteriaFormHelpers'

/**
 * Displays configuration cell component and allows its edition (shows configuration dialog)
 * @author Raphaël Mechali
 */
class ConfigurationCellComponent extends React.Component {
  static propTypes = {
    entity: CriteriaEditableRow.isRequired,
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    onShowConfigurationDialog: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: starts configuration edition
   */
  onEdit = () => {
    const { entity, onShowConfigurationDialog } = this.props
    if (entity.pluginMetadata && !isEmpty(entity.pluginMetadata.configuration.attributes)) {
      onShowConfigurationDialog(entity)
    }
  }

  render() {
    const { entity, availableAttributes } = this.props
    const { intl, moduleTheme: { configuration: { content: { searchPane: { commonCell } } } } } = this.context
    if (CriteriaRowsHelper.isGroup(entity) || !entity.pluginMetadata || isEmpty(entity.pluginMetadata.configuration.attributes)) {
      // group or criterion with undefined plugin / empty configuration
      return (
        <div style={commonCell.inactive}>
          { CriteriaRowsHelper.isGroup(entity) ? '' : intl.formatMessage({ id: 'search.results.form.configuration.search.pane.configuration.column.cell.none' })}
        </div>)
    }
    const error = CriteriaFormHelper.isCriterionConfigurationInError(entity.configuration, entity.pluginMetadata, availableAttributes)
    // label: attribute (if at least one is defined), placeholder otherwise
    const label = values(entity.configuration.attributes)
      .filter((v) => !!v)
      .map((jsonPath) => {
        const attribute = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(jsonPath, availableAttributes)
        return attribute ? AttributeRender.getRenderLabel(attribute, intl) : jsonPath
      })
      .join(intl.formatMessage({ id: 'search.results.form.configuration.search.pane.configuration.column.cell.attributes.separator' }))
      || intl.formatMessage({ id: 'search.results.form.configuration.search.pane.configuration.column.cell.none' })
    return (
      <div
        // style: no conf, error or default style
        style={error ? commonCell.error : commonCell.default}
        onClick={this.onEdit}
        title={label}
      >
        { label }
      </div>
    )
  }
}
export default ConfigurationCellComponent
