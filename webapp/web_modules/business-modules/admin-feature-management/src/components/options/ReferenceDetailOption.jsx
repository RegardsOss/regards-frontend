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
import ViewIcon from 'mdi-material-ui/EyeCircle'
import { FemShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { ResourceIconAction } from '@regardsoss/components'

/**
  * Detail option cell for the infinite table used to display the contents of a reference
  * @author Théo Lasserre
*/
class ReferenceDetailOption extends React.Component {
  static propTypes = {
    entity: FemShapes.Reference,
    onReferenceDetail: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  onClick = () => {
    const { entity, onReferenceDetail } = this.props
    onReferenceDetail([entity])
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <ResourceIconAction
        title={formatMessage({ id: 'feature.references.tooltip.details' })}
        onClick={this.onClick}
      >
        <ViewIcon className="selenium-viewButton" />
      </ResourceIconAction>
    )
  }
}

export default ReferenceDetailOption
