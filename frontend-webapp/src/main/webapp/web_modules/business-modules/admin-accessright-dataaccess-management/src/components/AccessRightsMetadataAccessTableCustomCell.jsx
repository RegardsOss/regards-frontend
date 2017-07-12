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
import { Dataset, AccessRight } from '@regardsoss/model'
import AccessRightsEnum from './AccessRightsEnum'

class AccessRightsTableCustomCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    attributes: PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.number,
    }),
    accessRights: PropTypes.objectOf(AccessRight),
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    entity: Dataset,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: PropTypes.number.isRequired,
  }

  render() {
    const accessRight = find(this.props.accessRights, ar => ar.content.dataset.id === this.props.entity.content.id)
    const accessLevel = get(accessRight, 'content.accessLevel', AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS)
    return (
      <span>{this.props.intl.formatMessage({ id: `accessright.form.meta.accessLevel.${accessLevel}` })}</span>
    )
  }
}

export default AccessRightsTableCustomCell
