/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'

/**
 * Component showing criterion loading
 * @author Raphaël Mechali
 */
class CriterionLoadingComponent extends React.Component {
  render() {
    return (
      <tr>
        <td colSpan="3">
          <LoadableContentDisplayDecorator isLoading />
        </td>
      </tr>)
  }
}
export default CriterionLoadingComponent
