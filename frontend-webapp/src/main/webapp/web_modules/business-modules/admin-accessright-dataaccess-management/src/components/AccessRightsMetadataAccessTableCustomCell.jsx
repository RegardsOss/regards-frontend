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
import get from 'lodash/get'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import AccessRightsEnum from './AccessRightsEnum'

class AccessRightsMetadataAcccessTableCustomCell extends React.Component {
  static propTypes = {
    // from table cell API
    entity: DataManagementShapes.DatasetWithAccessRight,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const accessLevel = get(this.props.entity, 'content.accessRight.accessLevel', AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS)
    return (
      <span>{this.context.intl.formatMessage({ id: `accessright.form.meta.accessLevel.${accessLevel}` })}</span>
    )
  }
}

export default AccessRightsMetadataAcccessTableCustomCell
