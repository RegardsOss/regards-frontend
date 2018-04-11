/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { IFrameURLContentDisplayer } from '@regardsoss/components'
import ModuleConfigurationShape from '../models/ModuleConfigurationShape'


/**
 * Main component of module menu
 * @author Sébastien Binda
 **/
class ModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfigurationShape,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const renderStyles = {
      width: this.props.moduleConf.cssWidth || '100%',
      height: this.props.moduleConf.cssHeight || 100,
    }
    return (
      <IFrameURLContentDisplayer
        contentURL={this.props.moduleConf.htmlUrl}
        style={renderStyles}
      />
    )
  }
}

export default ModuleContainer
