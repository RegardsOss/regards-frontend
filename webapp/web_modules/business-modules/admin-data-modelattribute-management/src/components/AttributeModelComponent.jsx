/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataManagementShapes } from '@regardsoss/shape'
import {
  Table, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table'
import compact from 'lodash/compact'

class AttributeModelComponent extends React.Component {
  static propTypes = {
    attribute: DataManagementShapes.AttributeModel,
  }

  static showIfAttributeIsNotOptional(modelAttribute) {
    if (!modelAttribute.content.optional) {
      return ' (*)'
    }
    return null
  }

  static getAttrInfo(attr) {
    return compact([attr.content.label, attr.content.description]).join(' - ')
  }

  render() {
    const { attribute } = this.props
    return (
      <Table
        selectable
      >
        <TableBody
          displayRowCheckbox={false}
          preScanRows={false}
        >
          <TableRow>
            <TableRowColumn title={AttributeModelComponent.getAttrInfo(attribute)}>
              {attribute.content.name}
              {AttributeModelComponent.showIfAttributeIsNotOptional(attribute)}
            </TableRowColumn>
            <TableRowColumn>{attribute.content.type}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default AttributeModelComponent
