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
import { i18nContextType } from '@regardsoss/i18n'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import {
  RenderCheckbox, Field, FormPresentation, FormRow, FieldsGroup,
} from '@regardsoss/form-utils'

/**
 * Module configuration form
 * @author Raphaël Mechali
 */
class ModuleConfigurationComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
  }

  static propTypes = {
    changeField: PropTypes.func.isRequired,
    currentNamespace: PropTypes.string.isRequired,
    isCreating: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.SHOW_DATASETS_FIELD = `${props.currentNamespace}.showDatasets`
  }

  /**
   * Lifecycle method component will mount.
   * Used here to initialize field values to default
   */
  UNSAFE_componentWillMount() {
    const { changeField, isCreating } = this.props
    if (isCreating) {
      changeField(this.SHOW_DATASETS_FIELD, true)
    }
  }

  render() {
    const { currentNamespace } = this.props
    const { intl } = this.context
    return (
      <FormPresentation>
        <FormRow>
          <ModulePaneStateField currentNamespace={currentNamespace} />
          <FieldsGroup clearSpaceToChildren title={intl.formatMessage({ id: 'order.cart.configuration.presentation.title' })}>
            <Field
              name={this.SHOW_DATASETS_FIELD}
              component={RenderCheckbox}
              label={intl.formatMessage({ id: 'order.cart.configuration.show.datasets' })}
            />
          </FieldsGroup>
        </FormRow>
      </FormPresentation>
    )
  }
}
export default ModuleConfigurationComponent
