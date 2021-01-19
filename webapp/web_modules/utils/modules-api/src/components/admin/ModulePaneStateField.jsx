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
import RadioButton from 'material-ui/RadioButton'
import { UIDomain } from '@regardsoss/domain'
import { RenderRadio, Field, FieldsGroup } from '@regardsoss/form-utils'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import compose from 'lodash/fp/compose'
import messages from '../../i18n'
import styles from '../../styles'

/**
 * Field to select the state of a module pane (expanded / collapsed). It is intended to be used in admin forms.
 * It provides messages and styles for corresponding field (so all the modules with multiple pane can use it to respect
 * the Look & feel). In most cases, it can be used with default pane name (when 1 module === 1 pane). Note that such method also
 * works with compound modules like search graph and search forms, since the search results will hold its own pane configuration.
 *
 * @author Raphaël Mechali
 */
export class ModulePaneStateField extends React.Component {
  /**
   * @param {string} currentNamespace current module name space in form
   * @param {string} paneName paneName
   * @return {string} field name
   */
  static getFieldName(currentNamespace, paneName) {
    return `${currentNamespace}.${paneName}`
  }

  static propTypes = {
    // field name in redux form
    currentNamespace: PropTypes.string.isRequired,
    // panel name (used for field message, something like 'Results pane' or 'Form pane')
    paneName: PropTypes.string,
    // optional field label (when not provided, it shows something like: 'Presenetation pane is: ')
    label: PropTypes.string,
    // field default value
    defaultValue: PropTypes.oneOf(UIDomain.MODULE_PANE_DISPLAY_MODES),
    // should span full width?
    spanFullWidth: PropTypes.bool,
  }

  static defaultProps = {
    paneName: 'primaryPane',
    defaultValue: UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.EXPANDED_COLLAPSIBLE,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      currentNamespace, paneName, label, defaultValue, spanFullWidth,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FieldsGroup
        title={label || formatMessage({ id: 'modules.common.admin.pane.expanded.field.label' }, { paneName })}
        spanFullWidth={spanFullWidth}
      >
        <Field
          name={ModulePaneStateField.getFieldName(currentNamespace, paneName)}
          component={RenderRadio}
          defaultSelected={defaultValue}
        >
          <RadioButton
            label={formatMessage({ id: 'modules.common.admin.pane.expanded.label' })}
            value={UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.EXPANDED_COLLAPSIBLE}
          />
          <RadioButton
            label={formatMessage({ id: 'modules.common.admin.pane.collapsed.label' })}
            value={UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.COLLAPSED_EXPANDABLE}
          />
          <RadioButton
            label={formatMessage({ id: 'modules.common.admin.pane.always.expanded.label' })}
            value={UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.ALWAYS_EXPANDED}
          />
        </Field>
      </FieldsGroup>
    )
  }
}

export default compose(withI18n(messages), withModuleStyle(styles))(ModulePaneStateField)
