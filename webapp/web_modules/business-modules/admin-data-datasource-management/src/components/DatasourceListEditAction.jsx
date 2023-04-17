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
import { Link } from 'react-router'
import find from 'lodash/find'
import Edit from 'mdi-material-ui/Pencil'
import IconButton from 'material-ui/IconButton'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import EditionHelper from '../domain/EditionHelper'

/**
* Edit table action for Datasource list
* @author Léo Mieulet
*/
class DatasourceListEditAction extends React.Component {
  static propTypes = {
    entity: DataManagementShapes.Datasource,
    project: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  isEditable = () => {
    const { links } = this.props.entity
    return !!find(links, (l) => l.rel === 'update')
  }

  /**
   * Redirect the user to the corresponding page
   */
  getEditUrl = () => {
    const { project, entity } = this.props
    const type = EditionHelper.getDatasourcePluginType(entity)

    return `/admin/${project}/data/acquisition/datasource/${type}/${entity.content.businessId}/edit`
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <Link to={this.getEditUrl}>
        <IconButton
          title={formatMessage({ id: 'datasource.list.action.edit' })}
          iconStyle={DatasourceListEditAction.iconStyle}
          style={DatasourceListEditAction.buttonStyle}
          disabled={!this.isEditable()}
        >
          <Edit />
        </IconButton>
      </Link>

    )
  }
}
export default DatasourceListEditAction
