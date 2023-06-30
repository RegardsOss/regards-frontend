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
import RetryIcon from 'mdi-material-ui/Replay'
import { WorkerShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasKeys } from '@regardsoss/display-control'
import { HateoasIconAction } from '@regardsoss/components'

/**
 * Retry request component option
 * @author Théo Lasserre
 */
class RetryRequestComponent extends React.Component {
  static propTypes = {
    entity: WorkerShapes.Request.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onRetry: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: on delete project user, locally wrapped
   */
  onRetry = () => {
    const { entity, onRetry } = this.props
    onRetry(entity)
  }

  render() {
    const { entity, isLoading } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <HateoasIconAction
        disabled={isLoading}
        title={formatMessage({ id: 'datapreparation.table.actions.retry.tooltip' })}
        onClick={this.onRetry}
        // HATOAS control
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.RETRY}
        disableInsteadOfHide
      >
        <RetryIcon />
      </HateoasIconAction>
    )
  }
}

export default RetryRequestComponent
