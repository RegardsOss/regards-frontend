/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Field } from 'redux-form'
import { CommonShapes } from '@regardsoss/shape'
/**
* Component to render a non editable form to view a PluginConfiguration
* @author Sébastien Binda
*/
class PluginView extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    microserviceName: PropTypes.string.isRequired,
    pluginMetaData: CommonShapes.PluginMetaData.isRequired,
  }

  static defaultProps = {}

  render() {
    const {
      name, component, microserviceName, pluginMetaData,
    } = this.props
    return (
      <form
        onSubmit={() => { }}
      >
        <Field
          name={name}
          component={component}
          microserviceName={microserviceName}
          pluginMetaData={pluginMetaData}
          hideGlobalParameterConf
          hideDynamicParameterConf
          disabled
        />
      </form>
    )
  }
}
export default PluginView
