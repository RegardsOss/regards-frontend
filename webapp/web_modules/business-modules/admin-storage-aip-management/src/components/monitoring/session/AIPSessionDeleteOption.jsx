/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'


const HateoasIconAction = withHateoasDisplayControl(IconButton)
/**
* Display a delete option
* @author Léo Mieulet
*/
class AIPSessionDeleteOption extends React.Component {
  static propTypes = {
    disableInsteadOfHide: PropTypes.bool,
    // Entity. Note: when used in options column, this is provided by the table cell API
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired, // delete method (entity, onDone) => ()
  }

  static defaultProps = {
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

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity, disableInsteadOfHide } = this.props
    return (
      <HateoasIconAction
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.DELETE}
        alwaysDisplayforInstanceUser={false}
        title={formatMessage({ id: 'aips.session.delete.tooltip' })}
        onClick={this.onDelete}
        disableInsteadOfHide={disableInsteadOfHide}
      >
        <DeleteIcon className="selenium-deleteButton" />
      </HateoasIconAction>
    )
  }
}

export default AIPSessionDeleteOption
