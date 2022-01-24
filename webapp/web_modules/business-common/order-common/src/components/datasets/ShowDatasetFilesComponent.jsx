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
import IconButton from 'material-ui/IconButton'
import DetailIcon from 'mdi-material-ui/Magnify'
import { i18nContextType } from '@regardsoss/i18n'

/**
 *  Show dataset files table option
 * @author Raphaël Mechali
 */
class ShowDatasetFilesComponent extends React.Component {
  static propTypes = {
    // callback: on select order
    onShowDatasetFiles: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { onShowDatasetFiles } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        onClick={onShowDatasetFiles}
        title={formatMessage({ id: 'datasets.list.option.cell.detail.title' })}
      >
        <DetailIcon />
      </IconButton>
    )
  }
}
export default ShowDatasetFilesComponent
