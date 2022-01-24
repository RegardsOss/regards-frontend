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
import UnselectIcon from 'mdi-material-ui/ChevronLeft'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Option to unselect a document model
 * @author Raphaël Mechali
 */
class UnselectDocumentModelOptionComponent extends React.Component {
  static propTypes = {
    rowIndex: PropTypes.number.isRequired,
    onUnselectDocumentModel: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Callback: user unselected this row document model
   */
  onUnselectDocumentModel = () => {
    const { rowIndex, onUnselectDocumentModel } = this.props
    onUnselectDocumentModel(rowIndex)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={formatMessage({ id: 'ui.admin.settings.add.to.data.models.title' })}
        onClick={this.onUnselectDocumentModel}
      >
        <UnselectIcon />
      </IconButton>)
  }
}
export default UnselectDocumentModelOptionComponent
