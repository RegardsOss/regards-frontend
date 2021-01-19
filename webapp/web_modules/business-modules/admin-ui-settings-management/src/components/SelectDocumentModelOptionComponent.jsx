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
import IconButton from 'material-ui/IconButton'
import SelectIcon from 'mdi-material-ui/ChevronRight'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Option to select a document model
 * @author Raphaël Mechali
 */
class SelectDocumentModelOptionComponent extends React.Component {
  static propTypes = {
    entity: PropTypes.string.isRequired,
    onSelectDocumentModel: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Callback: user selected this model as document model
   */
  onSelectDocumentModel = () => {
    const { entity, onSelectDocumentModel } = this.props
    onSelectDocumentModel(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={formatMessage({ id: 'ui.admin.settings.add.to.document.models.title' })}
        onClick={this.onSelectDocumentModel}
      >
        <SelectIcon />
      </IconButton>)
  }
}
export default SelectDocumentModelOptionComponent
