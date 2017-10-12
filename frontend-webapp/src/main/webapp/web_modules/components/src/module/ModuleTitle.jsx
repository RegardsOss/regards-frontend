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
import { ModuleThemeProvider } from '@regardsoss/modules'
import ModuleTitleImpl from './ModuleTitleImpl'
import styles from './styles'

/**
* Common dynamic modules title (when not using a breadcrumb) - XXX-V2-merge with breadcrumb
* @author Raphaël Mechali
*/
class ModuleTitle extends React.Component {

  static propTypes = {
    IconConstructor: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
  }

  render() {
    const { IconConstructor, text, tooltip } = this.props
    return (
      <ModuleThemeProvider module={styles}>
        <ModuleTitleImpl
          IconConstructor={IconConstructor}
          text={text}
          tooltip={tooltip}
        />
      </ModuleThemeProvider >
    )
  }
}
export default ModuleTitle
