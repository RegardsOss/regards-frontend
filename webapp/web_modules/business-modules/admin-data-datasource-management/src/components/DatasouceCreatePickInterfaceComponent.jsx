

/**
* Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FileImport from 'mdi-material-ui/FileImport'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * React component to prevent user to create datasource if he doesn't have a connection yet
 */

export class DatasouceCreatePickInterfaceComponent extends React.Component {
  static propTypes = {
    createDBDasourceUrl: PropTypes.string.isRequired,
    createAIPDasourceUrl: PropTypes.string.isRequired,
    createOpenSearchCrawlerUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static pluginWrapper = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '33%',
  }

  static styleIcon = {
    height: 108,
    width: 108,
    margin: '30px 0px',
  }

  static styleButton = {
    margin: '30px 0px',
  }

  static contentWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20px',
  }

  render() {
    const {
      createDBDasourceUrl, createAIPDasourceUrl, createOpenSearchCrawlerUrl, backUrl,
    } = this.props
    return (
      <div>
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'datasource.form.create.pick-interface.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'datasource.form.create.pick-interface.subtitle' })}
          />
          <CardText>
            <div style={DatasouceCreatePickInterfaceComponent.contentWrapper}>
              <div style={DatasouceCreatePickInterfaceComponent.pluginWrapper}>
                <FileImport style={DatasouceCreatePickInterfaceComponent.styleIcon} />
                {this.context.intl.formatMessage({ id: 'datasource.form.create.pick-interface.description.aip' })}
                <Link to={createAIPDasourceUrl}>

                  <RaisedButton
                    label={this.context.intl.formatMessage({ id: 'datasource.form.create.pick-interface.action.select' })}
                    secondary
                    style={DatasouceCreatePickInterfaceComponent.styleButton}
                  />
                </Link>

              </div>
              <div style={DatasouceCreatePickInterfaceComponent.pluginWrapper}>
                <Database style={DatasouceCreatePickInterfaceComponent.styleIcon} />
                {this.context.intl.formatMessage({ id: 'datasource.form.create.pick-interface.description.db' })}
                <Link to={createDBDasourceUrl}>
                  <RaisedButton
                    label={this.context.intl.formatMessage({ id: 'datasource.form.create.pick-interface.action.select' })}
                    secondary
                    style={DatasouceCreatePickInterfaceComponent.styleButton}
                  />
                </Link>
              </div>
              <div style={DatasouceCreatePickInterfaceComponent.pluginWrapper}>
                <Search style={DatasouceCreatePickInterfaceComponent.styleIcon} />
                {this.context.intl.formatMessage({ id: 'datasource.form.create.pick-interface.description.opensearch' })}
                <Link to={createOpenSearchCrawlerUrl}>
                  <RaisedButton
                    label={this.context.intl.formatMessage({ id: 'datasource.form.create.pick-interface.action.select' })}
                    secondary
                    style={DatasouceCreatePickInterfaceComponent.styleButton}
                  />
                </Link>
              </div>
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.create.pick-interface.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default DatasouceCreatePickInterfaceComponent
