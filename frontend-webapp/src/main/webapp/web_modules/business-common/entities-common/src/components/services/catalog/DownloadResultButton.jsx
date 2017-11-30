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
import { DownloadButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Download result button for catalog service result
* @author Raphaël Mechali
*/
class DownloadResultButton extends React.Component {
  static propTypes = {
    localAccessURL: PropTypes.string.isRequired, // Not URL as it may be local URL (prefixed by blob)
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { localAccessURL } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <DownloadButton
        label={formatMessage({ id: 'entities.common.services.download.service.result' })}
        tooltip={formatMessage({ id: 'entities.common.services.download.service.result' })}
        downloadURL={localAccessURL}
      />)
  }
}

export default DownloadResultButton
