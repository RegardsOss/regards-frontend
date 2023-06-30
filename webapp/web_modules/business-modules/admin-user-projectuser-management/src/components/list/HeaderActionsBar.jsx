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
import get from 'lodash/get'
import DownloadCSVIcon from 'mdi-material-ui/BriefcaseDownload'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator, LocalURLProvider } from '@regardsoss/display-control'
import {
  TableHeaderOptionGroup, TableColumnsVisibilityOption,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { DownloadResultComponent } from '@regardsoss/entities-common'

/**
 * @author Théo Lasserre
 */
class HeaderActionsBar extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDownloadCSV: PropTypes.func,

    // table sorting, column visiblity & filters management
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    bodyParameters: TableFilterSortingAndVisibilityContainer.BODY_PARAMETERS_PROP_TYPE,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    downloading: false,
    localAccessURL: null, // local file access URL
    fileName: null,
  }

  /**
   * Action to do when download action is done. Save csv file content in local blob.
  */
  onPostDownloadDone = ({ payload = {}, error }) => {
    if (error) {
      console.error('Error downloading csv file')
      this.setState({
        downloading: false,
      })
    } else {
      const resultFile = payload
      const contentDisposition = get(payload, 'contentDisposition')
      const fileName = contentDisposition ? contentDisposition.split('filename=')[1] : 'regards-users-list.csv'
      this.setState({
        localAccessURL: resultFile && resultFile.content ? LocalURLProvider.buildLocalAccessURL(resultFile.content) : null,
        fileName,
        downloading: false,
      })
    }
  }

  /**
   * Force download of localAccessURL created after download click action.
   * Force re-render component by setting key to localAccessURL. With this, if url change, component is mounted and download is started
   */
  forceDownload = () => {
    const {
      localAccessURL, fileName,
    } = this.state
    if (localAccessURL) {
      return <DownloadResultComponent
        key={localAccessURL}
        localAccessURL={localAccessURL}
        fileName={fileName}
      />
    }
    return null
  }

  /**
   * Action on click to run download request to retrieve csv file.
   * When done, result is set in a local memory blob and set blob url in props.
   */
  runDownload = () => {
    const { bodyParameters, onDownloadCSV } = this.props
    this.setState({
      downloading: true,
    })
    onDownloadCSV(bodyParameters).then(this.onPostDownloadDone)
  }

  render() {
    const { columns, onChangeColumnsVisibility } = this.props
    const { downloading } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <TableHeaderOptionGroup>
        <LoadableContentDisplayDecorator isLoading={downloading}>
          <FlatButton
            onClick={this.runDownload}
            icon={<DownloadCSVIcon />}
            label={formatMessage({ id: 'projectUser.list.exportCSV.label' })}
            title={formatMessage({ id: 'projectUser.list.exportCSV.tooltip' })}
          />
        </LoadableContentDisplayDecorator>
        {this.forceDownload()}
        {/* columns visibility configuration  */}
        <TableColumnsVisibilityOption
          columns={columns}
          onChangeColumnsVisibility={onChangeColumnsVisibility}
        />
      </TableHeaderOptionGroup>
    )
  }
}
export default HeaderActionsBar
