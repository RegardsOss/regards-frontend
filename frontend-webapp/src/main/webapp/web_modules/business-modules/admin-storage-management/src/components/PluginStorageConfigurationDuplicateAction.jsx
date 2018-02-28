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
import Copy from 'material-ui/svg-icons/content/content-copy'
import IconButton from 'material-ui/IconButton'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Delete table action for datasourceIngestions
* @author Sébastien Binda
*/
class PluginStorageConfigurationDuplicateAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: CommonShapes.PluginConfigurationContent.isRequired,
      links: PropTypes.array,
    }),
    onDuplicate: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const entityContent = this.props.entity.content
    return (
      <IconButton
        className={`selenium-edit-${entityContent.id}`}
        title={formatMessage({ id: 'crawler.list.delete.action' })}
        iconStyle={PluginStorageConfigurationDuplicateAction.iconStyle}
        style={PluginStorageConfigurationDuplicateAction.buttonStyle}
        onClick={() => this.props.onDuplicate(entityContent)}
      >
        <Copy />
      </IconButton>
    )
  }
}
export default PluginStorageConfigurationDuplicateAction
