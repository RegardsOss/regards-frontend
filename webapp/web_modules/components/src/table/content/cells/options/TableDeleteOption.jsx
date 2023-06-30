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
import omit from 'lodash/omit'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'mdi-material-ui/Delete'
import { CommonShapes } from '@regardsoss/shape'
import { HateoasKeys } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasIconAction } from '../../../../buttons/HateoasIconAction'

/**
* Table delete option: deletes then fetches data
* @author Raphaël Mechali
*/
class TableDeleteOption extends React.Component {
  static propTypes = {
    // from table cell API, mentionned here only to be excluded from children properties
    rowIndex: PropTypes.number,
    // Entity. Note: when used in options column, this is provided by the table cell API
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    handleHateoas: PropTypes.bool,
    disableInsteadOfHide: PropTypes.bool,
    pathParams: CommonShapes.RequestParameters,
    requestParams: CommonShapes.RequestParameters,
    onDelete: PropTypes.func.isRequired, // delete method (entity, onDone) => ()
  }

  /** List of property keys that should not be reported to sub component */
  static NON_REPORTED_PROPS = [
    'rowIndex',
    'entity',
    'handleHateoas',
    'pathParams',
    'requestParams',
    'onDelete',
    'disableInsteadOfHide',
  ]

  static defaultProps = {
    handleHateoas: false,
    disableInsteadOfHide: false,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User called delete, propagate to caller
   */
  onDelete = () => {
    const { entity, onDelete } = this.props
    onDelete(entity)
  }

  renderWithHateoas = () => {
    const { intl: { formatMessage } } = this.context
    const { entity, disableInsteadOfHide } = this.props
    return (
      <HateoasIconAction
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.DELETE}
        alwaysDisplayforInstanceUser={false}
        title={formatMessage({ id: 'table.delete.option.tooltip' })}
        onClick={this.onDelete}
        disableInsteadOfHide={disableInsteadOfHide}
        {...omit(this.props, TableDeleteOption.NON_REPORTED_PROPS)}
      >
        <DeleteIcon className="selenium-deleteButton" />
      </HateoasIconAction>
    )
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { handleHateoas, entity } = this.props
    if (handleHateoas && entity.links) {
      return this.renderWithHateoas()
    }
    return (
      <IconButton
        title={formatMessage({ id: 'table.delete.option.tooltip' })}
        onClick={this.onDelete}
        {...omit(this.props, TableDeleteOption.NON_REPORTED_PROPS)}
      >
        <DeleteIcon />
      </IconButton>
    )
  }
}

export default TableDeleteOption
