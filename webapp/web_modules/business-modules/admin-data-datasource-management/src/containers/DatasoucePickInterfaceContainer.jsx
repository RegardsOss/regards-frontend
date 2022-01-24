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
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import DatasouceCreatePickInterfaceComponent from '../components/DatasouceCreatePickInterfaceComponent'
import messages from '../i18n'
import styles from '../styles'
/**
 * Pick the datasource if existing or ask the user to create a new one
 */
export class DatasoucePickInterfaceContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/datasource/list`
  }

  getCreateDBDatasourceUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/datasource/db/create/connection`
  }

  getCreateAIPDatasourceUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/datasource/aip/create`
  }

  getCreateOSCrawlerUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/datasource/opensearch/create`
  }

  getCreateFeatureDatasourceUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/datasource/feature/create`
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <DatasouceCreatePickInterfaceComponent
          createDBDasourceUrl={this.getCreateDBDatasourceUrl()}
          createAIPDasourceUrl={this.getCreateAIPDatasourceUrl()}
          createOpenSearchCrawlerUrl={this.getCreateOSCrawlerUrl()}
          createFeatureDatasourceUrl={this.getCreateFeatureDatasourceUrl()}
          backUrl={this.getBackUrl()}
        />
      </I18nProvider>
    )
  }
}

export default withModuleStyle(styles)(DatasoucePickInterfaceContainer)
