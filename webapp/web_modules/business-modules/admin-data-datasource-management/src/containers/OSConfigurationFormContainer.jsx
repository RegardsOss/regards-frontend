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
import map from 'lodash/map'
import messages from '../i18n'
import OSCrawlerConfigurationContainer from './OSCrawlerConfigurationContainer'
import OSQueryConfigurationContainer from './OSQueryConfigurationContainer'
import OSResultsConfigurationContainer from './OSResultsConfigurationContainer'
import { datasourceSelectors, datasourceActions } from '../clients/DatasourceClient'

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
  static mapStateToProps(state, ownProps) {
    return {
      currentDatasource: ownProps.params.datasourceId
        ? datasourceSelectors.getById(state, ownProps.params.datasourceId)
        : null,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      createDatasource: values => dispatch(datasourceActions.createEntity(values)),
      editDatasource: (id, values) => dispatch(datasourceActions.updateEntity(id, values)),
      fetchDatasource: id => dispatch(datasourceActions.fetchEntity(id)),
    }
  }

  state = {
    query: {
      filters: [],
    },
    isEditing: !(this.props.params.datasourceId === undefined),
  }

  componentDidMount() {
    if (this.state.isEditing) {
      Promise.resolve(this.props.fetchDatasource(this.props.params.datasourceId))
    }
  }

  createInitialValues = () => {
    if (this.props.currentDatasource) {
      const { currentDatasource } = this.props
      const webserviceConfiguration = currentDatasource.content.parameters.find(config => config.name === 'webserviceConfiguration')
      const conversionConfiguration = currentDatasource.content.parameters.find(config => config.name === 'conversionConfiguration')
      return {
        crawler: {
          descriptor: webserviceConfiguration.value.opensearchDescriptorURL,
          name: currentDatasource.content.label,
          refreshRate: currentDatasource.content.refreshRate,
        },
        query: {
          filters: map(webserviceConfiguration.value.webserviceParameters, (value, key) => ({ name: key, value })),
          lastUpdate: webserviceConfiguration.value.lastUpdateParam,
          pageSize: webserviceConfiguration.value.pageSize,
          totalResultsField: conversionConfiguration.value.totalResultsField,
          pageSizeField: conversionConfiguration.value.pageSizeField,
        },
        results: {
          modelName: conversionConfiguration.value.modelName,
          propertiesLabel: '', // TODO
          propertiesGeometry: '', // TODO
          rawDataURLPath: conversionConfiguration.value.rawDataURLPath,
          quicklookURLPath: conversionConfiguration.value.quicklookURLPath,
          thumbnailURLPath: conversionConfiguration.value.thumbnailURLPath,
          dynamic: conversionConfiguration.value.attributeToJsonField,
        },
      }
    }
    return { crawler: null, query: null, results: null }
  }

  onCrawlerSubmit = (fields) => {
    this.setState({
      crawler: fields,
      formState: STATE.QUERY,
    })
  }

  onQuerySubmit = (fields, pageIndexParam, startPageIndex, pageSizeParam, webserviceURL) => {
    this.setState({
      query: {
        ...fields,
        pageIndexParam,
        startPageIndex,
        pageSizeParam,
        webserviceURL,
      },
      formState: STATE.RESULTS,
    })
  }

  onResultsSubmit = (fields) => {
    this.setState({ results: fields }, this.createConfPlugin)
  }

  redirectToList = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/datasource/list`
    browserHistory.push(url)
  }

  createConfPlugin = () => {
    const { crawler, query, results } = this.state
    const conf = {
      pluginId: 'webservice-datasource',
      label: crawler.name,
      version: '1.0-SNAPSHOT',
      priorityOrder: 0,
      refreshRate: +crawler.refreshRate, // TODO: Doesn't seem to exist
      active: true,
      interfaceNames: ['fr.cnes.regards.modules.dam.domain.datasources.plugins.IDataSourcePlugin'],
      pluginClassName:
        'fr.cnes.regards.modules.dam.plugins.datasources.webservice.WebserviceDatasourcePlugin',
      parameters: [
        {
          name: 'webserviceConfiguration',
          value: {
            webserviceURL: query.webserviceURL,
            opensearchDescriptorURL: crawler.descriptor,
            webserviceParameters: query.filters ? query.filters.reduce(
              (acc, filter) => ({ ...acc, [filter.name]: filter.value }),
              {},
            ) : [],
            pageSizeParam: query.pageSizeParam,
            pageIndexParam: query.pageIndexParam,
            lastUpdateParam: query.lastUpdate,
            startPageIndex: query.startPageIndex,
            pageSize: +query.pageSize,
          },
          type:
            'fr.cnes.regards.modules.dam.plugins.datasources.webservice.configuration.WebserviceConfiguration',
        },
        {
          name: 'conversionConfiguration',
          value: {
            modelName: results.modelName,
            totalResultsField: results.totalResultsField,
            // TODO il manque les attributs standards
            pageSizeField: results.pageSizeField,
            attributeToJsonField: results.dynamic,
            thumbnailURLPath: results.thumbnailURLPath,
            rawDataURLPath: results.rawDataURLPath,
            quicklookURLPath: results.quicklookURLPath,
          },
        },
      ],
    }

    if (this.state.isEditing) {
      // TODO : Ce que j'ai fait ici ne marchait pas du tout
    } else {
      Promise.resolve(this.props.createDatasource(conf)).then((actionResults) => {
        if (!actionResults.error) {
          this.redirectToList()
        }
      })
    }
    return conf
  }

  handleBack = () => {
    switch (this.state.formState) {
      case STATE.CRAWLER:
      default:
        browserHistory.push(
          `/admin/${this.props.params.project}/data/acquisition/datasource/create/interface`,
        )
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
            isEditing={this.state.isEditing}
            onBack={this.handleBack}
            onSubmit={this.onCrawlerSubmit}
            project={project}
            initialValues={this.createInitialValues().crawler}
          />
        )
      case STATE.QUERY:
        return (
          <OSQueryConfigurationContainer
            onBack={this.handleBack}
            onSubmit={this.onQuerySubmit}
            isEditing={this.state.isEditing}
            initialValues={this.createInitialValues().query}
          />
        )
      case STATE.RESULTS:
        return (
          <OSResultsConfigurationContainer
            isEditing={this.state.isEditing}
            onBack={this.handleBack}
            onSubmit={this.onResultsSubmit}
            initialValues={this.createInitialValues().results}
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
