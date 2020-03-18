/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIShapes } from '@regardsoss/shape'
import Drawer from 'material-ui/Drawer'

/**
 * Search pane component
 * @author Raphaël Mechali
 */
class SearchPaneComponent extends React.Component {
static propTypes = {
  open: PropTypes.bool.isRequired,
  groups: PropTypes.arrayOf(UIShapes.CriteriaGroup).isRequired,
}


render() {
  const { open } = this.props
  // TODO width in styles
  return (
    <Drawer width={400} open={open} openSecondary>
      <div>COUCOU</div>
    </Drawer>
  )
}
}
export default SearchPaneComponent
