/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import messages from './i18n'
import { StorageUnit } from './StorageUnit'

/**
 * Format storage unit as a react component (react-intl style). Allows embedding
 * automatically context in external consumer
 * @author Raphaël Mechali
 */
export class FormattedStorageUnit extends React.Component {
  static propTypes = {
    unit: PropTypes.instanceOf(StorageUnit).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { unit } = this.props
    const { intl: { formatMessage } } = this.context
    return formatMessage({ id: unit.messageKey })
  }
}

export default withI18n(messages)(FormattedStorageUnit)
