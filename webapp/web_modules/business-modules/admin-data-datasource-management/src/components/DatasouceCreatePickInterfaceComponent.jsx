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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { Link } from 'react-router'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import Database from 'mdi-material-ui/Database'
import Search from 'mdi-material-ui/CloudSearch'
import RaisedButton from 'material-ui/RaisedButton'
import { IngestClient, CatalogClient } from '@regardsoss/client'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import PickFemDatasourceComponent from './datasources/PickFemDatasourceComponent'
import PickIngestDatasourceComponent from './datasources/PickIngestDatasourceComponent'

// Build endpoint for ressource
const endpointAIP = new IngestClient.AIPActions('').getDependency(RequestVerbEnum.POST)
const endpointFeature = new CatalogClient.FEMFeatureRequestsActions('').getDependency(CatalogClient.FEMFeatureRequestsActions.NOTIFY, RequestVerbEnum.POST)

/**
 * React component to pick the type of datasource
 */
export class DatasouceCreatePickInterfaceComponent extends React.Component {
  static propTypes = {
    createDBDasourceUrl: PropTypes.string.isRequired,
    createAIPDasourceUrl: PropTypes.string.isRequired,
    createOpenSearchCrawlerUrl: PropTypes.string.isRequired,
    createFeatureDatasourceUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      createDBDasourceUrl, createAIPDasourceUrl, createOpenSearchCrawlerUrl, createFeatureDatasourceUrl, backUrl,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        pickDatsource: {
          styleIcon, styleButton, pluginWrapper, contentWrapper,
        },
      },
    } = this.context
    return (
      <div>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'datasource.form.create.pick-interface.title' })}
            subtitle={formatMessage({ id: 'datasource.form.create.pick-interface.subtitle' })}
          />
          <CardText>
            <div style={contentWrapper}>
              <PickIngestDatasourceComponent
                url={createAIPDasourceUrl}
                resourceDependencies={endpointAIP}
              />
              <PickFemDatasourceComponent
                url={createFeatureDatasourceUrl}
                resourceDependencies={endpointFeature}
              />
              <div style={pluginWrapper}>
                <Database style={styleIcon} />
                {formatMessage({ id: 'datasource.form.create.pick-interface.description.db' })}
                <Link to={createDBDasourceUrl}>
                  <RaisedButton
                    label={formatMessage({ id: 'datasource.form.create.pick-interface.action.select' })}
                    secondary
                    style={styleButton}
                  />
                </Link>
              </div>
              <div style={pluginWrapper}>
                <Search style={styleIcon} />
                {formatMessage({ id: 'datasource.form.create.pick-interface.description.opensearch' })}
                <Link to={createOpenSearchCrawlerUrl}>
                  <RaisedButton
                    label={formatMessage({ id: 'datasource.form.create.pick-interface.action.select' })}
                    secondary
                    style={styleButton}
                  />
                </Link>
              </div>
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              secondaryButtonLabel={formatMessage({ id: 'datasource.form.create.pick-interface.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default DatasouceCreatePickInterfaceComponent
