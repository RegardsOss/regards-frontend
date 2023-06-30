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
import FlatButton from 'material-ui/FlatButton'
import DownloadCSVIcon from 'mdi-material-ui/BriefcaseDownload'
import { i18nContextType } from '@regardsoss/i18n'
import { DownloadButton } from '@regardsoss/components'

/**
 * Download orders CSV summary option
 * @author Raphaël Mechali
 */
class DownloadOrdersCSVSummaryComponent extends React.Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { link } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <DownloadButton
        ButtonConstructor={FlatButton}
        icon={<DownloadCSVIcon />}
        label={formatMessage({ id: 'order.list.download.summary.csv.label' })}
        downloadURL={link}
        title={formatMessage({ id: 'order.list.download.summary.csv.tooltip' })}
      />)
  }
}
export default DownloadOrdersCSVSummaryComponent
