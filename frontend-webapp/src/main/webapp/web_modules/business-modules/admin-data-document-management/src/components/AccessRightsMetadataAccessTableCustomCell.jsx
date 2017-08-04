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
import find from 'lodash/find'
import get from 'lodash/get'
import { DataManagementShapes } from '@regardsoss/shape'

class AccessRightsTableCustomCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    entity: DataManagementShapes.Document,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: PropTypes.number.isRequired,
  }

  render() {
    return (
      <span>Hello world :)))</span>
    )
  }
}

export default AccessRightsTableCustomCell
