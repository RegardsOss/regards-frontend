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
import HorizontalAreasSeparatorImpl from './HorizontalAreasSeparatorImpl'
import styles from './styles'

/**
* Horizontal separator component, mainly used to separate a dynamic module from other ones  XXX-V2 merge with IMPL
* @author Raphaël Mechali
*/
class HorizontalAreasSeparator extends React.Component {

  render() {
    return (
      <ModuleThemeProvider module={styles}>
        <HorizontalAreasSeparatorImpl />
      </ModuleThemeProvider>
    )
  }
}
export default HorizontalAreasSeparator
