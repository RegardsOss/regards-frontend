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
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import { fieldArrayFieldsPropTypes } from 'redux-form'
import { DataManagementShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { PluginMeta } from '../../../../shapes/form/PluginMeta'
import CriteriaGroupsTableComponent from './CriteriaGroupsTableComponent'

/**
 * Field array for criteria groups
 * @author Raphaël Mechali
 */
class CriteriaGroupsFieldArrayComponent extends React.Component {
  static propTypes = {
    fetchingMetadata: PropTypes.bool.isRequired,
    pluginsMetadata: PropTypes.arrayOf(PluginMeta).isRequired,
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  /**
   * User callback: criterion plugin changed
   * @param {number} groupIndex group index
   * @param {number} criterionIndex criterion index
   * @param {*} selected plugin metadata, matching PluginMeta
   */
  onUpdateCriterionPlugin = (groupIndex, criterionIndex, selectedPluginMeta) => this.updateCriterion(groupIndex, criterionIndex, {
    pluginId: selectedPluginMeta ? selectedPluginMeta.pluginId : null,
    conf: { // create an empty configuration matching new meta
      attributes: get(selectedPluginMeta, 'configuration.attributes', [])
        .reduce((acc, attr) => ({ ...acc, [attr.name]: null }), {}),
    },
  })

  /**
   * User callback: criterion or group label update
   * @param {number} groupIndex group index
   * @param {number} criterionIndex criterion index (nil when working with a group)
   * @param {string} locale from UIDomain.LOCALES
   * @param {string} text new text for locale
   */
  onUpdateElementLabel = (groupIndex, criterionIndex, locale, text) => {
    const { fields } = this.props
    const group = fields.get(groupIndex)
    if (isNil(criterionIndex)) {
      this.updateGroup(groupIndex, { title: { ...group.title, [locale]: text } })
    } else {
      const criterion = group.criteria[criterionIndex]
      this.updateCriterion(groupIndex, criterionIndex, { label: { ...criterion.label, [locale]: text } })
    }
  }

  /**
   * User callback: update criterion configuration
   * @param {number} groupIndex group index
   * @param {number} criterionIndex criterion index (nil when working with a group)
   * @param {*} conf new criterion configuration
   */
  onUpdateCriterionConfiguration = (groupIndex, criterionIndex, conf) => this.updateCriterion(groupIndex, criterionIndex, { conf })

  /**
   * User callback: criterion or group label update
   * @param {number} groupIndex group index
   * @param {boolean} showTitle new value for field
   */
  onUpdateGroupShowTitle = (groupIndex, showTitle) => this.updateGroup(groupIndex, { showTitle })

  /**
   * User callback: insert a group at index as parameter
   * @param {number} insertion insertion index, ranging from 0 to N+1 (where N is group count)
   */
  onInsertGroup = (index) => {
    const { fields } = this.props
    fields.insert(index, {
      showTitle: true,
      title: UIDomain.LOCALES.reduce((acc, locale) => ({ ...acc, [locale]: '' }), {}),
      criteria: [],
    })
  }

  /**
   * User callback: insert a group at index as parameter
   * @param {number} groupIndex index of the group that should receive a new criterion
   * @param {number} insertion insertion index, ranging from 0 to N+1 (where N the criteria count in group)
   */
  onInsertCriterion = (groupIndex, index) => {
    const { fields } = this.props
    const { criteria } = fields.get(groupIndex)
    this.updateGroup(groupIndex, {
      criteria: [
        ...criteria.slice(0, index), {
          pluginId: null,
          label: UIDomain.LOCALES.reduce((acc, locale) => ({ ...acc, [locale]: '' }), {}),
          conf: null,
        },
        ...criteria.slice(index)],
    })
  }

  /**
   * User callback: on delete criterion
   * @param {number} groupIndex parent group index
   * @param {number} criterionIndex to delete
   */
  onDeleteCriterion = (groupIndex, criterionIndex) => {
    const { fields } = this.props
    const { criteria } = fields.get(groupIndex)
    this.updateGroup(groupIndex, { criteria: criteria.filter((c, index) => index !== criterionIndex) })
  }

  /**
   * Updates a criterion with index as parameter (reports other values unchanged)
   * @param {number} groupIndex group index
   * @param {number} criterionIndex criterion index
   * @param {*} newValues new values to commit
   */
  updateCriterion = (groupIndex, criterionIndex, newValues) => {
    const { fields } = this.props
    const { criteria } = fields.get(groupIndex)
    // update criteria list and report to group updater
    this.updateGroup(groupIndex, {
      criteria: criteria.map((initialCriterion, index) => index === criterionIndex ? {
        ...initialCriterion,
        ...newValues,
      } : initialCriterion),
    })
  }

  /**
   * Updates a group using new values as parameters (reports other values unchanged)
   * @param {number} groupIndex group index
   * @param {*} newValues new values to commit
   */
  updateGroup = (groupIndex, newValues) => {
    const { fields } = this.props
    const newGroup = { ...fields.get(groupIndex), ...newValues }
    fields.remove(groupIndex)
    fields.insert(groupIndex, newGroup)
  }

  /**
   * User callback: delete group
   * @param {number} groupIndex
   */
  onDeleteGroup = (groupIndex) => {
    const { fields } = this.props
    fields.remove(groupIndex)
  }

  /**
   * User callback: moves a given criterion in a given group into another group, at its final position.
   * Note: to index is expressed in a list were criterion has been previously removed (when in same group)
   * @param {{groupIndex:number, criterionIndex:number}} fromPosition initial criterion group and index
   * @param {{groupIndex:number, criterionIndex:number}} toPosition final criterion group and index
   */
  onMoveCriterion = (fromPosition, toPosition) => {
    const { fields } = this.props
    const sameGroup = fromPosition.groupIndex === toPosition.groupIndex
    const sourceGroup = fields.get(fromPosition.groupIndex)
    const movedCriterion = sourceGroup.criteria[fromPosition.criterionIndex]
    // A - prepare updated source group (without moved element)
    const updatedSource = {
      criteria: sourceGroup.criteria.filter((c, i) => i !== fromPosition.criterionIndex),
    }
    // B - prepare updated target (when in same group, insert directly in source)
    const targetCriteria = (sameGroup ? updatedSource.criteria : fields.get(toPosition.groupIndex).criteria)
    const updatedTarget = {
      criteria: [ // insert moved criterion in criteria list
        ...targetCriteria.slice(0, toPosition.criterionIndex),
        movedCriterion,
        ...targetCriteria.slice(toPosition.criterionIndex)],
    }
    // Finally, commit group: in same source at once, otherwise in two operations
    if (!sameGroup) { // 1 - source group, when not same one
      this.updateGroup(fromPosition.groupIndex, updatedSource)
    }
    // 2 - target group
    this.updateGroup(toPosition.groupIndex, updatedTarget)
  }

  /**
   * User callback: moves a given group at a new index
   * Note: to index is expressed in a list were group has been previously removed
   * @param {number} fromIndex initial group index
   * @param {number} toIndex final group index
   */
  onMoveGroup = (fromIndex, toIndex) => {
    const { fields } = this.props
    const movedGroup = fields.get(fromIndex)
    fields.remove(fromIndex)
    fields.insert(toIndex, movedGroup)
  }

  render() {
    const {
      fetchingMetadata, fields, pluginsMetadata, availableAttributes,
    } = this.props
    return (
      <CriteriaGroupsTableComponent
        fetchingMetadata={fetchingMetadata}
        pluginsMetadata={pluginsMetadata}
        availableAttributes={availableAttributes}
        groups={fields.getAll()}
        // edition callbacks
        onUpdateCriterionPlugin={this.onUpdateCriterionPlugin}
        onUpdateElementLabel={this.onUpdateElementLabel}
        onUpdateGroupShowTitle={this.onUpdateGroupShowTitle}
        onUpdateCriterionConfiguration={this.onUpdateCriterionConfiguration}
        onInsertGroup={this.onInsertGroup}
        onInsertCriterion={this.onInsertCriterion}
        onMoveGroup={this.onMoveGroup}
        onMoveCriterion={this.onMoveCriterion}
        onDeleteCriterion={this.onDeleteCriterion}
        onDeleteGroup={this.onDeleteGroup}
      />
    )
  }
}
export default CriteriaGroupsFieldArrayComponent
