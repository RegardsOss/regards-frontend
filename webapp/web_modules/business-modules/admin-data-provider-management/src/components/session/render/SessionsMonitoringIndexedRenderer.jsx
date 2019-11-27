/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'

/**
 * Comment Here
 * @author Kevin Picart
 */
export class SessionsMonitoringIndexedRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    onClickListIndexed: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onClickListIndexed = () => {
    const { entity, onClickListIndexed } = this.props
    onClickListIndexed(entity.content.source, entity.content.session)
  }

  getIndexed = (entity) => {
    const { intl: { formatNumber } } = this.context
    const indexed = get(entity, 'content.lifeCycle.catalog.indexed', 0)
    return formatNumber(parseInt(indexed, 10))
  }

  getErrors = (entity) => {
    const { intl: { formatNumber } } = this.context
    const indexed = get(entity, 'content.lifeCycle.catalog.indexedError', 0)
    return formatNumber(parseInt(indexed, 10))
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        sessionsStyles: {
          gridCell: {
            gridContainer, gridHeaderContainer, infosContainer, lineContainer, listValues, cellContainer,
            lines: {
              one, two,
            },
          },
        },
      },
    } = this.context
    const { entity } = this.props
    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={entity.content.state === 'ERROR'}
      >
        <div style={cellContainer}>
          { !entity.content.lifeCycle.oais ? (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
            -
              </div>
            </div>
          ) : (
            <div style={gridContainer}>
              <div style={infosContainer}>
                <div style={lineContainer}>
                  <div style={one}>
                    {formatMessage({ id: 'acquisition-sessions.states.indexed' })}
                    :
                  </div>
                  <div style={two}>
                    {formatMessage({ id: 'acquisition-sessions.states.index.errors' })}
                    :
                  </div>
                </div>
                <div style={listValues}>
                  <div style={one}>{this.getIndexed(entity)}</div>
                  <div style={two}>{this.getErrors(entity)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SessionsMonitoringTableBackgroundComponent>
    )
  }
}
