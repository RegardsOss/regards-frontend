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
import MailIcon from 'mdi-material-ui/Email'
import { ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'

/**
* Contact display component
* @author Raphaël Mechali
*/
class ContactComponent extends React.Component {
  static propTypes = {
    // contacts email
    contacts: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { contacts } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <ShowableAtRender show={!!contacts}>
        <a title={formatMessage({ id: 'contactTooltip' })} href={`mailto:${contacts}`}>
          <IconButton>
            <MailIcon />
          </IconButton>
        </a>
      </ShowableAtRender>
    )
  }
}
export default ContactComponent
