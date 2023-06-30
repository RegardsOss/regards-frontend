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
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import { FormRow, FieldsGroup } from '@regardsoss/form-utils'
import MoveIcon from 'mdi-material-ui/Redo'
import DeleteIcon from 'mdi-material-ui/Delete'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton } from '@regardsoss/components'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import { DescriptionGroup } from '../../shapes/ModuleConfiguration'

/**
 * Display a group as edited in groups fields
 * @author Raphaël Mechali
 */
class GroupComponent extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    group: DescriptionGroup.isRequired,
    allGroups: PropTypes.arrayOf(DescriptionGroup).isRequired,
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    // on group updated callback: (index: number) => ()
    onGroupUpdated: PropTypes.func.isRequired,
    // on group moved callback: (index: number, moveAtIndex: number) => ()
    // note: move at index must worth final index considering group removal first (ie ignoring initial position in list)
    onGroupMoved: PropTypes.func.isRequired,
    // on group removed callback: (index: number) => ()
    onGroupRemoved: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Generic callback to update group internally
   * @param {*} newValues new values, to replace in group
   */
  onGroupUpdated = (newValues) => {
    const { index, group, onGroupUpdated } = this.props
    onGroupUpdated(index, {
      ...group,
      ...newValues,
    })
  }

  /**
   * User callback: show title option value was changed, update group form value through parent callback
   */
  onShowTitleChanged = () => {
    const { group } = this.props
    this.onGroupUpdated({ showTitle: !group.showTitle })
  }

  /**
   * Common title input updated callback
   * @param {string} titleKey titleKey in titles map
   * @param {string} titleValue new title value
   */
  onTitleChanged = (titleKey, titleValue) => {
    const { group } = this.props
    this.onGroupUpdated({
      title: {
        ...group.title,
        [titleKey]: titleValue,
      },
    })
  }

  /**
   * User callback: english label edited, update group form value through parent callback
   * @param {*} event -
   * @param {string} value input value
   */
  onTitleENChanged = (event, value) => this.onTitleChanged('en', value)

  /**
   * User callback: french label edited, update group form value through parent callback
   * @param {*} event -
   * @param {string} value input value
   */
  onTitleFRChanged = (event, value) => this.onTitleChanged('fr', value)

  /**
   * User callback: group elements changed
   * @param {string} dumbKey : child array provides it as it has been designed to be used directly in forms but
   * this component does not need it
   * @param {[*]} elements edited elements
   */
  onElementsChanged = (dumbKey, elements) => this.onGroupUpdated({ elements })

  /**
   * User callback: user moved that group at index as parameter
   * @param {number} atIndex move index
   */
  onGroupMoved = (atIndex) => {
    const { index, onGroupMoved } = this.props
    onGroupMoved(index, atIndex)
  }

  /**
   * User callback: user moved that group at index as parameter
   */
  onGroupRemoved = () => {
    const { index, onGroupRemoved } = this.props
    onGroupRemoved(index)
  }

  /**
   * @return {string} move drop down button label
   */
  getMoveButtonLabel = () => this.context.intl.formatMessage({ id: 'module.description.configuration.group.move.action.label' })

  /**
   * Renders move at menu item: show move at option: First or after element (renders disabled for current position)
   * @param value group from all groups list
   * @param indexInList index in groups list
   * @return {React.Element} render menu item
   */
  renderMoveAtMenuItem = (value, indexInList) => {
    const { index } = this.props
    const { formatMessage } = this.context.intl
    // after group? consider that this group index must be ignored to obtain the right group
    const previousGroupIndex = indexInList > index ? indexInList + 1 : indexInList
    return (
      <MenuItem
        // eslint-disable-next-line react/no-array-index-key
        key={indexInList} // no better key in groups array
        primaryText={
          indexInList === 0
            ? formatMessage({ id: 'module.description.configuration.group.move.group.first' })
            : formatMessage({ id: 'module.description.configuration.group.move.group.after' }, { number: previousGroupIndex })
        }
        disabled={indexInList === index}
        value={indexInList}
      />)
  }

  render() {
    const {
      index, group: { showTitle, title, elements }, availableAttributes, allGroups,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { admin: { group } } } = this.context
    return (
      <FormRow>
        <FieldsGroup
          title={formatMessage({ id: 'module.description.configuration.group.title' }, { number: index + 1 })}
          spanFullWidth
        >
          {/* show title option */}
          <Checkbox
            label={formatMessage({ id: 'module.description.configuration.group.show.title' })}
            checked={showTitle}
            onCheck={this.onShowTitleChanged}
          />
          {/* en title */}
          <TextField
            floatingLabelText={formatMessage({ id: 'module.description.configuration.group.title.en.field' })}
            errorText={showTitle && !title.en ? formatMessage({ id: 'module.description.configuration.group.title.required.error' }) : null}
            value={title.en}
            onChange={this.onTitleENChanged}
            disabled={!showTitle}
            fullWidth
          />
          {/* fr title */}
          <TextField
            floatingLabelText={formatMessage({ id: 'module.description.configuration.group.title.fr.field' })}
            errorText={showTitle && !title.fr ? formatMessage({ id: 'module.description.configuration.group.title.required.error' }) : null}
            value={title.fr}
            onChange={this.onTitleFRChanged}
            disabled={!showTitle}
            fullWidth
          />
          { /* Attributes / groups rows */}
          <div style={group.attributes}>
            <AttributesListConfigurationComponent
              selectableAttributes={availableAttributes}
              attributesList={elements}
              allowLabel
              allowRendererSelection
              allowAttributesGroups
              hintMessageKey="module.description.configuration.group.elements.hint"
              attributesListFieldName="dumb.key" // unused as it is not directly connected with form
              changeField={this.onElementsChanged}
              attributesFilter={DamDomain.AttributeModelController.isSortableAttribute}
            />
          </div>
          <div style={group.options}>
            <DropDownButton
              getLabel={this.getMoveButtonLabel}
              title={formatMessage({ id: 'module.description.configuration.group.move.action.tooltip' })}
              icon={<MoveIcon />}
              disabled={allGroups.length <= 1}
              value={null}
              onChange={this.onGroupMoved}
            >
              { /** Create menu item for each possible position */
              allGroups.map(this.renderMoveAtMenuItem)
            }
            </DropDownButton>
            <FlatButton
              label={formatMessage({ id: 'module.description.configuration.group.remove.action.label' })}
              title={formatMessage({ id: 'module.description.configuration.group.remove.action.tooltip' })}
              icon={<DeleteIcon />}
              onClick={this.onGroupRemoved}
              secondary
            />
          </div>
        </FieldsGroup>
      </FormRow>
    )
  }
}
export default GroupComponent
