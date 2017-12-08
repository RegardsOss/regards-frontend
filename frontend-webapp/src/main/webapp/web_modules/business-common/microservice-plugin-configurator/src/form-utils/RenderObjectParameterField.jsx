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
import map from 'lodash/map'
import get from 'lodash/get'
import { CommonShapes } from '@regardsoss/shape'
import { fieldInputPropTypes, Field } from 'redux-form'
import RenderPluginParameterField from './RenderPluginParameterField'

/**
* Comment Here
* @author Sébastien Binda
*/
class RenderObjectParameterField extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    microserviceName: PropTypes.string.isRequired,
    pluginParameterType: CommonShapes.PluginParameterType.isRequired,
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
  }

  static defaultProps = {}

  render() {
    const { input, pluginParameterType, microserviceName } = this.props
    console.error('OBJECT', pluginParameterType)
    return null
  }
}
export default RenderObjectParameterField
