/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import IconButton from 'material-ui/IconButton'

const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
 * CollectionList duplicate action
 * @author Maxime Bouveron
 */
class CollectionListDuplicateAction extends React.Component {
  static propTypes = {
    handleDuplicate: PropTypes.func,
    hoverColor: PropTypes.string,
    dependency: PropTypes.string,
    entity: DataManagementShapes.Collection,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { handleDuplicate, hoverColor, dependency } = this.props
    const collection = this.props.entity
    return (
      <ResourceIconAction
        resourceDependencies={dependency}
        onClick={() => handleDuplicate(collection.content.id)}
        title={this.context.intl.formatMessage({ id: 'collection.list.action.duplicate' })}
      >
        <ContentCopy hoverColor={hoverColor} />
      </ResourceIconAction>
    )
  }
}
export default CollectionListDuplicateAction
