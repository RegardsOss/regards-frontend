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
 */
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import ModuleListButtonComponent from './ModuleListButtonComponent'

/**
 * Component to display all available modules for a given container
 * with messages internationalisation provider
 * @author Sébastien Binda
 */
class ModuleListProvider extends React.Component {

  static propTypes = {
    container: PropTypes.string,
    modules: AccessShapes.ModuleArray,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <I18nProvider messageDir="utils/modules/src/i18n">
        <ModuleListButtonComponent
          container={this.props.container}
          modules={this.props.modules}
        />
      </I18nProvider>
    )
  }
}

export default ModuleListProvider
