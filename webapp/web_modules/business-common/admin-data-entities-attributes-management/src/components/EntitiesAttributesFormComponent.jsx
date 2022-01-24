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
import map from 'lodash/map'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
} from 'material-ui/Table'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import EntitiesAttributeFormComponent from './EntitiesAttributeFormComponent'

/**
 * Form component to edit datasets/collection attributes that the admin has to define.
 */
export class EntitiesAttributesFormComponent extends React.Component {
  static propTypes = {
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    isEditing: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { modelAttributeList, isEditing } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <Table
        selectable={false}
      >
        <TableHeader
          enableSelectAll={false}
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>{formatMessage({ id: 'entities-attributes.form.table.fragmentAndLabel' })}</TableHeaderColumn>
            <TableHeaderColumn>{formatMessage({ id: 'entities-attributes.form.table.type' })}</TableHeaderColumn>
            <TableHeaderColumn>{formatMessage({ id: 'entities-attributes.form.table.value' })}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          preScanRows={false}
          showRowHover
        >
          {map(modelAttributeList, (modelAttribute, id) => (
            <EntitiesAttributeFormComponent
              key={id}
              modelAttribute={modelAttribute}
              isEditing={isEditing}
            />
          ))}
        </TableBody>
      </Table>
    )
  }
}

export default EntitiesAttributesFormComponent
