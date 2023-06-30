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

import {
  TableHeaderOptionsArea,
  TableHeaderLine,
  TableHeaderOptionGroup,
} from '@regardsoss/components'
import TextField from 'material-ui/TextField/TextField'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Display filters available on attribute models from table list
 * @author Sébastien Binda
 */
class AttributeModelListFiltersComponent extends React.Component {
  static propTypes = {
    onFilter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <TextField
              hintText={this.context.intl.formatMessage({
                id: 'attrmodel.list.filter.name',
              })}
              onChange={this.props.onFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default AttributeModelListFiltersComponent
