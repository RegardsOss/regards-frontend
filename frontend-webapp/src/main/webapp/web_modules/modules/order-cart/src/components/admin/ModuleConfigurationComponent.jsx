/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderCheckbox, Field } from '@regardsoss/form-utils'
import { ModuleConfigurationShape } from '../../model/ModuleConfigurationShape'

const SHOW_DATASETS_FIELD = 'conf.showDatasets'

/**
 * Module configuration form
 * @author Raphaël Mechali
 */
class ModuleConfigurationComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    changeField: PropTypes.func.isRequired,
    moduleForm: ModuleConfigurationShape,
  }

  /**
   * Lifecycle method component will mount. Used here to initialize field values to default or restore values in edition
   */
  componentWillMount() {
    const { moduleForm, changeField } = this.props
    changeField(SHOW_DATASETS_FIELD, get(moduleForm, SHOW_DATASETS_FIELD, true))
  }


  render() {
    const { intl, moduleTheme: { admin } } = this.context
    return (
      <div style={admin.rootStyle}>
        <Field
          name={SHOW_DATASETS_FIELD}
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'order.cart.configuration.show.datasets' })}
        />
      </div>
    )
  }
}
export default ModuleConfigurationComponent
