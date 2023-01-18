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
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import ViewIcon from 'mdi-material-ui/EyeCircle'
import { LTAShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { ResourceIconAction } from '@regardsoss/components'

/**
  * @author Théo Lasserre
*/
class ViewProductComponent extends React.Component {
  static propTypes = {
    entity: LTAShapes.Request.isRequired,
    onViewProduct: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  onClick = () => {
    const { entity, onViewProduct } = this.props
    onViewProduct([entity])
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    const product = get(entity, 'content.product', '')
    return (
      <ResourceIconAction
        title={formatMessage({ id: 'lta.table.actions.view.product.tooltip' })}
        onClick={this.onClick}
        disabled={isEmpty(product)}
      >
        <ViewIcon />
      </ResourceIconAction>
    )
  }
}

export default ViewProductComponent
