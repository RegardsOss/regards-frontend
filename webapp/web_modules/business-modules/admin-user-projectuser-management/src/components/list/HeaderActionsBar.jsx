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

import FlatButton from 'material-ui/FlatButton'
import DownloadCSVIcon from 'mdi-material-ui/BriefcaseDownload'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderOptionGroup, TableColumnsVisibilityOption,
  DownloadButton,
} from '@regardsoss/components'

/**
 * @author Théo Lasserre
 */
class HeaderActionsBar extends React.Component {
  static propTypes = {
    csvLink: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,

    // table sorting, column visiblity & filters management
    onChangeColumnsVisibility: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      csvLink, columns, onChangeColumnsVisibility,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <TableHeaderOptionGroup>
        <DownloadButton
          ButtonConstructor={FlatButton}
          icon={<DownloadCSVIcon />}
          label={formatMessage({ id: 'projectUser.list.exportCSV.label' })}
          downloadURL={csvLink}
          title={formatMessage({ id: 'projectUser.list.exportCSV.tooltip' })}
        />
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
