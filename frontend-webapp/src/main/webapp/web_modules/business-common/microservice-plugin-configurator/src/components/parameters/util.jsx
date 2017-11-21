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
import findIndex from 'lodash/findIndex'
import { CommonShapes } from '@regardsoss/shape'
/**
 * Builds a node allowing to display a left & a right text in the {@code primaryText} of a {@link MenuItem}.
 *
 * @author Xavier-Alexandre Brochard
 */
const buildMenuItemPrimaryText = (leftContent, rightContent) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {leftContent}
    <span style={{ color: '#bdbdbd' }}>
      {rightContent}
    </span>
  </div>
)
const getFieldName = (prefix, name, pluginMetaData, suffix) => {
  const index = findIndex(pluginMetaData.parameters, ['name', name])
  if (prefix && prefix !== '') {
    return `${prefix}.parameters.${index}${suffix}`
  }
  return `parameters.${index}${suffix}`
}
/**
 * Shared prop
 */
const pluginParameterComponentPropTypes = {
  microserviceName: PropTypes.string.isRequired,
  pluginMetaData: CommonShapes.PluginMetaData,
  reduxFormfieldNamePrefix: PropTypes.string, //Optional prefix for redux form field name before the parameter name
  // eslint-disable-next-line react/no-unused-prop-types
  pluginParameter: CommonShapes.PluginParameterContent,
  pluginParameterType: CommonShapes.PluginParameterType,
  // eslint-disable-next-line react/no-unused-prop-types
  mode: PropTypes.oneOf(['view', 'edit', 'create', 'copy']),
  // eslint-disable-next-line react/no-unused-prop-types
  change: PropTypes.func, // Callback provided by redux-form in order to manually change a field value
}
export {
  buildMenuItemPrimaryText,
  pluginParameterComponentPropTypes,
  getFieldName,
}
export default buildMenuItemPrimaryText
