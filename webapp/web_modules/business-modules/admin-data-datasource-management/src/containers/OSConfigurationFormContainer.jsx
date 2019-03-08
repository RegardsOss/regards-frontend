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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import messages from '../i18n'
import OSCrawlerConfigurationContainer from './OSCrawlerConfigurationContainer'
import OSQueryConfigurationContainer from './OSQueryConfigurationContainer'
import OSResultsConfigurationContainer from './OSResultsConfigurationContainer'

const STATE = {
  CRAWLER: 'CRAWLER',
  QUERY: 'QUERY',
  RESULTS: 'RESULTS',
}

/**
 * Show the datasource form
 */
export class OSConfigurationFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    route: PropTypes.shape({
      path: PropTypes.string,
    }),
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {}
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {}
  }

  state = {
    crawler: {},
    query: {},
  }

  onCrawlerSubmit = (fields) => {
    this.setState({
      crawler: fields,
      formState: STATE.QUERY,
    })
  }

  onQuerySubmit = (fields) => {
    this.setState({
      query: fields,
      formState: STATE.RESULTS,
    })
  }

  onResultsSubmit = (fields) => {
    this.setState(
      {
        results: fields,
      },
      () => {
        console.log('Crawler:', this.state.crawler)
        console.log('Query:', this.state.query)
        console.log('Results:', this.state.results)
      },
    )
  }

  createConfPlugin = () => {
    const { crawler, query, results } = this.state
    const conf = {
      pluginId: 'webservice-datasource',
      label: crawler.name,
      verson: '1.0-SNAPSHOT',
      priorityOrder: 0,
      active: true,
      interfaceNames: ['fr.cnes.regards.modules.dam.domain.datasources.plugins.IDataSourcePlugin'],
      pluginClassName: 'fr.cnes.regards.modules.dam.plugins.datasources.webservice.WebserviceDatasourcePlugin',
      parameters: [
        {
          name: 'webserviceConfiguration',
          value: {
            webserviceURL: crawler.descriptor,
            queryParams: query.filters.map(filter => ({
              [filter.label]: filter.value,
            })),
            pageSizeParam: query.pageSize,
            pageIndexParam: 'from descriptor',
            lastUpdateParam: query.lastUpdate,
            startPageIndex: 'from descriptor',
            pageSize: 'from form',
          },
          type: 'fr.cnes.regards.modules.dam.plugins.datasources.webservice.configuration.WebserviceConfiguration',
        }, {
          name: 'conversionConfiguation',
          value: {
            modelName: results.modelName,
            totalResultsFields: '',
            pageSizeField: '',
            attributeToJsonField: {
              label: results.propertiesLabel,
            },
            thumbnailURLPath: results.thumbnailURLPath,
            rawDataURLPath: results.rawDataURLPath,
            quicklookURLPath: results.quicklookURLPath,
          },
        },
      ],
    }

    return conf
  }

  handleBack = () => {
    switch (this.state.formState) {
      case STATE.CRAWLER:
      default:
        browserHistory.push(`/admin/${this.props.params.project}/data/acquisition/datasource/create/interface`)
        break
      case STATE.QUERY:
        this.setState({ formState: STATE.CRAWLER })
        break
      case STATE.RESULTS:
        this.setState({ formState: STATE.QUERY })
        break
    }
  }

  renderSubContainer = () => {
    const { project } = this.props.params
    const { formState } = this.state

    switch (formState) {
      case STATE.CRAWLER:
      default:
        return (
          <OSCrawlerConfigurationContainer
            onBack={this.handleBack}
            onSubmit={this.onCrawlerSubmit}
            project={project}
            initialValues={this.state.crawler}
          />
        )
      case STATE.QUERY:
        return (
          <OSQueryConfigurationContainer
            onBack={this.handleBack}
            onSubmit={this.onQuerySubmit}
            initialValues={this.state.query}
          />
        )
      case STATE.RESULTS:
        return (
          <OSResultsConfigurationContainer
            onBack={this.handleBack}
            onSubmit={this.onResultsSubmit}
          />
        )
    }
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator isLoading={false}>
          {this.renderSubContainer()}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(
  OSConfigurationFormContainer.mapStateToProps,
  OSConfigurationFormContainer.mapDispatchToProps,
)(OSConfigurationFormContainer)
