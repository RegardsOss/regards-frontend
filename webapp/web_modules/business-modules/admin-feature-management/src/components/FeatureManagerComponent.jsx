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
import map from 'lodash/map'
import includes from 'lodash/includes'
import split from 'lodash/split'
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { Breadcrumb, CardActionsComponent } from '@regardsoss/components'
import PageView from 'mdi-material-ui/CardSearch'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import throttle from 'lodash/throttle'
import ReferencesManagerContainer from '../containers/ReferencesManagerContainer'
import RequestManagerContainer from '../containers/RequestManagerContainer'
import FeatureManagerFiltersComponent from './filters/FeatureManagerFiltersComponent'
import SwitchTables from './SwitchTables'
import clientByPane from '../domain/ClientByPane'
import { PANE_TYPES, PANE_TYPES_ENUM } from '../domain/PaneTypes'

/**
* Feature manager component.
* @author Théo Lasserre
*/
class FeatureManagerComponent extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      type: PropTypes.string,
    }),
    clearReferencesSelection: PropTypes.func.isRequired,
    clearCreationSelection: PropTypes.func.isRequired,
    clearDeleteSelection: PropTypes.func.isRequired,
    clearExtractionSelection: PropTypes.func.isRequired,
    clearNotificationSelection: PropTypes.func.isRequired,
    clearUpdateSelection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    openedPane: PANE_TYPES_ENUM.REFERENCES,
    featureManagerFilters: FeatureManagerFiltersComponent.extractFiltersFromURL(),
    requestFilters: FeatureManagerFiltersComponent.extractStateFromURL(),
  }

  UNSAFE_componentWillMount = () => {
    const { params: { type } } = this.props
    if (includes(PANE_TYPES, type)) {
      this.setState({
        openedPane: type,
      })
    }
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onApplyFilters = throttle((featureManagerFilters) => {
    this.setState({ featureManagerFilters: FeatureManagerFiltersComponent.buildRequestParameters(featureManagerFilters) })
  }, 1000, { leading: true, trailing: true })

  clearAllSelections = () => {
    const {
      clearReferencesSelection,
      clearCreationSelection,
      clearDeleteSelection,
      clearExtractionSelection,
      clearNotificationSelection,
      clearUpdateSelection,
    } = this.props
    clearReferencesSelection()
    clearCreationSelection()
    clearDeleteSelection()
    clearExtractionSelection()
    clearNotificationSelection()
    clearUpdateSelection()
  }

  /**
  * Update state with pane type and clear all selection except choosen pane
  * @param {*} paneType see FeatureManagerComponent.PANES for values
  */
  onSwitchToPane = (paneType) => {
    this.clearAllSelections()
    this.setState({
      openedPane: paneType,
    })
  }

  renderBreadCrumb = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'feature.references.title' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={(label) => label}
        onAction={this.onBack}
      />
    )
  }

  onApplyRequestFilter = (requestFilters) => {
    this.setState({ requestFilters })
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { displayBlock, displayNone } } = this.context
    const { params } = this.props
    const {
      openedPane, featureManagerFilters, requestFilters,
    } = this.state
    return (
      <div>
        <Card>
          <CardTitle
            title={this.renderBreadCrumb()}
          />
          <FeatureManagerFiltersComponent
            onApplyFilters={this.onApplyFilters}
            featureManagerFilters={featureManagerFilters}
          />
          <SwitchTables
            params={params}
            onSwitchToPane={this.onSwitchToPane}
            openedPane={openedPane}
          />
          <div>
            {
              openedPane === PANE_TYPES_ENUM.REFERENCES
                ? <ReferencesManagerContainer
                    key={`feature-manager-${openedPane}`}
                    featureManagerFilters={featureManagerFilters}
                    params={params}
                    paneType={openedPane}
                /> : null
            }
            {
              map(PANE_TYPES, (pane) => {
                if (pane !== PANE_TYPES_ENUM.REFERENCES && openedPane === pane) {
                  return (
                    <RequestManagerContainer
                      key={pane}
                      featureManagerFilters={featureManagerFilters}
                      requestFilters={requestFilters}
                      onApplyRequestFilter={this.onApplyRequestFilter}
                      paneType={pane}
                      clients={clientByPane[pane]}
                    />
                  )
                }
                return null
              })
            }
          </div>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'feature.button.back' })}
              mainButtonClick={this.onBack}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default FeatureManagerComponent
