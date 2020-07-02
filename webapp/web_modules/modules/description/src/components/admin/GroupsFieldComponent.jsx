/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import RaisedButton from 'material-ui/RaisedButton'
import AddIcon from 'mdi-material-ui/Plus'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FormRow, FieldsGroup } from '@regardsoss/form-utils'
import GroupComponent from './GroupComponent'

/**
 * Presentation groups array field render
 * @author Raphaël Mechali
 */
class GroupsFieldComponent extends React.Component {
  static propTypes = {
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    fields: PropTypes.shape({
      get: PropTypes.func.isRequired,
      getAll: PropTypes.func.isRequired,
      insert: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: On add group. Update form fields array value
   */
  onAddGroup = () => {
    const { fields: { push } } = this.props
    push({ // a new description group
      showTitle: false,
      title: {
        en: '',
        fr: '',
      },
      elements: [],
    })
  }

  /**
   * User callback: On group updarted. Update form fields array value
   * @param {number} index: group index
   * @param {DescriptionGroup} new description group values
   */
  onGroupUpdated = (index, newGroupValue) => {
    // remove previous and insert new one
    const { fields: { insert, remove } } = this.props
    remove(index)
    insert(index, newGroupValue)
  }

  /**
   * User callback: on group moved. Updates groups list
   * @param {number} index group index
   * @param {number} moveAtIndex index where the group should be moved to. Note: that index considers group was removed first
   */
  onGroupMoved = (index, moveAtIndex) => {
    const { fields: { get, insert, remove } } = this.props
    const group = get(index)
    remove(index)
    insert(moveAtIndex, group)
  }

  /**
   * User callback: group removed. Updates groups list
   * @param {number} index group index
   */
  onGroupRemoved = (index) => {
    const { fields: { remove } } = this.props
    remove(index)
  }

  render() {
    const { fields: { getAll }, availableAttributes } = this.props
    const { intl: { formatMessage }, moduleTheme: { admin: { topSeparator } } } = this.context
    const allGroups = getAll() || []
    return (
      <React.Fragment>
        { /** Nota: here we have to send an array instead of many evaluated blocks  */
          [ /** Show currently defined groups */
            ...allGroups.map((group, index) => (
              <GroupComponent
              // eslint-disable-next-line react/no-array-index-key
                key={index} // no better key here
                index={index}
                group={group}
                allGroups={allGroups}
                availableAttributes={availableAttributes}
                onGroupUpdated={this.onGroupUpdated}
                onGroupMoved={this.onGroupMoved}
                onGroupRemoved={this.onGroupRemoved}
              />)),
            /* Add group button */
            <FormRow key="bottom.options.row">
              <FieldsGroup spanFullWidth>
                <div style={topSeparator} />
                <RaisedButton
                  label={formatMessage({ id: 'module.description.configuration.add.group' })}
                  icon={<AddIcon />}
                  onClick={this.onAddGroup}
                />
              </FieldsGroup>
            </FormRow>,
          ]
        }
      </React.Fragment>
    )
  }
}
export default GroupsFieldComponent
