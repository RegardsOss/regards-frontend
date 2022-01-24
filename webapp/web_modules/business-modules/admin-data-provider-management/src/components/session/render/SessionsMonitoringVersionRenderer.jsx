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
import reduce from 'lodash/reduce'
import Menu from 'mdi-material-ui/DotsVertical'
import MenuItem from 'material-ui/MenuItem'
import SelectVersionOptionIcon from 'mdi-material-ui/CogSync'
import IgnoredChangesIcon from 'mdi-material-ui/PencilMinus'
import { AccessDomain, IngestDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { IngestClient } from '@regardsoss/client'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton } from '@regardsoss/components'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'

/**
 * Column to render product products versions and state (waiting status, ignored products, new versions...)
 * @author Raphaël Mechali
 */
class SessionsMonitoringVersionRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    // show requests callback like (sessionName, requestsStatus) => ()
    onViewRequestsOAIS: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Dependencies to show requests state */
  static VIEW_REQUESTS_DEPENDENCIES = [
    new IngestClient.RequestActions('any').getDependency(RequestVerbEnum.POST),
  ]

  /** Fields to retrieve in lifecycle oais for this render, by the name used to address them  */
  static FIELDS_BY_NAME = {
    ignored: 'products_ignored',
    waiting: 'products_waiting_versioning_mode',
    replaced: 'products_replaced',
    newVersions: 'new_product_versions',
  }

  /**
   * Extract values sum in catalog lifecycle fields
   * @param {*} entity matching AccessShapes.Session
   * @param {...string} fields fields in oais objet
   * @return {{*}} object holding field value
   */
  static getVersionData(entity) {
    return reduce(SessionsMonitoringVersionRenderer.FIELDS_BY_NAME, (acc, lifecycleField, fieldName) => {
      const fieldValue = get(entity, `content.lifeCycle.oais.${lifecycleField}`, 0)
      return {
        ...acc,
        [fieldName]: fieldValue,
        noData: acc.noData && !fieldValue, // no data when all values are 0
      }
    }, { noData: true })
  }

  /**
   * Inner callback: navigate to requests list, for this session, in status as parameter
   * @param {string} requestsStatus from IngestDomain.AIP_REQUEST_STATUS_ENUM
   */
  onViewRequests = (requestsStatus) => {
    const { entity: { content: { source, name } }, onViewRequestsOAIS } = this.props
    onViewRequestsOAIS(source, name, requestsStatus)
  }

  /** User callback: view ignored requests */
  onViewIgnoredRequests = () => this.onViewRequests(IngestDomain.AIP_REQUEST_STATUS_ENUM.IGNORED)

  /** User callback: view waiting requests */
  onViewWaitingRequests = () => this.onViewRequests(IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE)

  render() {
    const {
      intl: { formatMessage, formatNumber },
      moduleTheme: {
        sessionsStyles: {
          menuDropDown,
          gridCell: {
            gridContainer, gridHeaderContainer, infosContainer, lineFourContainer, listFourValues, cellContainer,
            lines: {
              one, two, three, four,
            },
            versioningState: { waiting: waitingStyles },
          },
        },
      },
    } = this.context
    const { entity, availableDependencies } = this.props
    const {
      ignored, waiting, replaced, newVersions, noData,
    } = SessionsMonitoringVersionRenderer.getVersionData(entity)

    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.ERROR}
        isDeleted={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.DELETED}
      >
        <div style={cellContainer}>
          { noData ? (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
                -
              </div>
            </div>
          ) : (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
                {/* Clickable title for waiting elements */
                  waiting ? (
                    <div
                      style={waitingStyles.container}
                      title={formatMessage({ id: 'acquisition-sessions.states.waiting.tooltip' })}
                      onClick={this.onViewWaitingRequests}
                    >
                      <div style={waitingStyles.text}>
                        {formatMessage({ id: 'acquisition-sessions.states.waiting.header' })}
                      </div>
                      <SelectVersionOptionIcon color={waitingStyles.iconColor} />
                    </div>
                  ) : null
                }
              </div>
              <div style={infosContainer}>
                <div style={lineFourContainer}>
                  <div style={one} title={formatMessage({ id: 'acquisition-sessions.states.new.version.tooltip' })}>
                    {formatMessage({ id: 'acquisition-sessions.states.new.version.label' })}
                  </div>
                  <div style={two} title={formatMessage({ id: 'acquisition-sessions.states.replaced.tooltip' })}>
                    {formatMessage({ id: 'acquisition-sessions.states.replaced.label' })}
                  </div>
                  <div style={three} title={formatMessage({ id: 'acquisition-sessions.states.ignored.tooltip' })}>
                    {formatMessage({ id: 'acquisition-sessions.states.ignored.label' })}
                  </div>
                  <div style={four} title={formatMessage({ id: 'acquisition-sessions.states.waiting.tooltip' })}>
                    {formatMessage({ id: 'acquisition-sessions.states.waiting.label' })}
                  </div>
                </div>
                <div style={listFourValues}>
                  <div style={one} title={formatMessage({ id: 'acquisition-sessions.states.new.version.tooltip' })}>{formatNumber(newVersions)}</div>
                  <div style={two} title={formatMessage({ id: 'acquisition-sessions.states.replaced.tooltip' })}>{formatNumber(replaced)}</div>
                  <div style={three} title={formatMessage({ id: 'acquisition-sessions.states.ignored.tooltip' })}>{formatNumber(ignored)}</div>
                  <div style={four} title={formatMessage({ id: 'acquisition-sessions.states.waiting.tooltip' })}>{formatNumber(waiting)}</div>
                </div>
                { // build menu IIFE
                  (() => {
                    const items = []
                    const canShowRequests = allMatchHateoasDisplayLogic(SessionsMonitoringVersionRenderer.VIEW_REQUESTS_DEPENDENCIES, availableDependencies)
                    if (canShowRequests) {
                      // A - view ignored requests
                      if (ignored) {
                        items.push(
                          <MenuItem
                            key="viewIgnoredRequests"
                            leftIcon={<IgnoredChangesIcon />}
                            primaryText={formatMessage({ id: 'acquisition-sessions.menus.versioning.view.ignored.requests' })}
                            onClick={this.onViewIgnoredRequests}
                            value="viewIgnored"
                          />)
                      }
                      // B - view waiting requests
                      if (waiting) {
                        items.push(
                          <MenuItem
                            key="viewWaitingRequests"
                            leftIcon={<SelectVersionOptionIcon />}
                            primaryText={formatMessage({ id: 'acquisition-sessions.menus.versioning.view.waiting.requests' })}
                            onClick={this.onViewWaitingRequests}
                            value="viewIgnored"
                          />)
                      }
                    }
                    return items.length ? (
                      <div style={{ gridArea: 'menu', alignSelf: 'end' }}>
                        <DropDownButton
                          title={formatMessage({ id: 'acquisition-sessions.menus.archives' })}
                          style={menuDropDown}
                          icon={<Menu />}
                        >
                          {items}
                        </DropDownButton>
                      </div>) : null
                  })()

                }
              </div>
            </div>
          )}
        </div>
      </SessionsMonitoringTableBackgroundComponent>
    )
  }
}
export default SessionsMonitoringVersionRenderer
