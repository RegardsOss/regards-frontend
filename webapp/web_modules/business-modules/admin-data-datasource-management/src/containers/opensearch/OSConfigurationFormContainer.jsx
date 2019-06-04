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
import compose from 'lodash/fp/compose'
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasourceSelectors, datasourceActions } from '../../clients/DatasourceClient'
import OSCrawlerConfigurationContainer from './OSCrawlerConfigurationContainer'
import OSQueryConfigurationContainer from './OSQueryConfigurationContainer'
import OSResultsConfigurationContainer from './OSResultsConfigurationContainer'
import messages from '../../i18n'
import styles from '../../styles'


const STATE = {
  CRAWLER: 'CRAWLER',
  QUERY: 'QUERY',
  RESULTS: 'RESULTS',
}

/**
 * Main container for OpenSearch crawler configuration
 */
export class OSConfigurationFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      datasourceId: PropTypes.string,
    }),
    route: PropTypes.shape({
      path: PropTypes.string,
    }),
    // From map state to props
    currentDatasource: DataManagementShapes.Datasource,
    // From map dispatch to props
    createDatasource: PropTypes.func.isRequired,
    editDatasource: PropTypes.func.isRequired, // TODO why not used????
    fetchDatasource: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, props) {
    return {
      currentDatasource: props.params.datasourceId
        ? datasourceSelectors.getById(state, props.params.datasourceId)
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

  /**
   * Computes each part of the form initial edition values from edited datasource
   * @param {*} datasource edited datasource, never null (used only for edition data)
   * @return {crawler: {*}, query: {*}, results: {*}} initial values for each parts of the form
   */
  static getInitialEditionValues(datasource) {
    const { content: { parameters, label, refreshRate } } = datasource
    const webserviceConfiguration = parameters.find(config => config.name === 'webserviceConfiguration')
    const conversionConfiguration = parameters.find(config => config.name === 'conversionConfiguration')
    return {
      crawler: {
        descriptor: webserviceConfiguration.value.opensearchDescriptorURL,
        name: label,
        refreshRate,
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

  /** Initial values when in creation mode */
  static INITIAL_CREATION_VALUES = {
    crawler: {
      refreshRate: 86400,
    },
    query: { },
    results: { },
  }

  state = {
    // is in edition mode?
    isEditing: !isNil(this.props.params.datasourceId),
    // Is ready for edition? (or does it require to retrieve the edited datasource first)
    ready: isNil(this.props.params.datasourceId),
    // currently edited values
    formValues: OSConfigurationFormContainer.INITIAL_CREATION_VALUES,
    // initially presented step
    formState: STATE.CRAWLER,
  }


  /**
   * Lifecycle method: component did mount. Used here to fetch the data source the state
   */
  componentDidMount() {
    if (this.state.isEditing) {
      Promise.resolve(this.props.fetchDatasource(this.props.params.datasourceId))
    }
  }


  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: Used here to update state when edition data has been fetched (useless
   * in creation mode)
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { params = {}, currentDatasource: oldDatasource } = this.props
    const { currentDatasource: newDatasource } = newProps
    if (params.datasourceId && !oldDatasource && newDatasource) {
      // Detected: edition data has been fetch successfully, let user start editing
      this.setState({
        ready: true,
        formValues: OSQueryConfigurationContainer.getInitialEditionValues(newDatasource),
      })
    }
  }

  /**
   * On crawler root configuration part submitted: update part values and set up next step presentation
   * @param {*} fields edited form fields
   */
  onCrawlerSubmit = (fields) => {
    console.error('ALL THE FIELDS', fields, typeof fields.refreshRate)
    // TODO probably some control on other parts (with previous state value)
    this.setState({
      formValues: {
        ...this.state.formValues,
        crawler: fields,
      },
      formState: STATE.QUERY,
    })
  }

  /**
   * On crawler query configuration part submitted: update part values and set up next step presentation
   * @param {*} fields edited form fields
   */
  onQuerySubmit = (fields, pageIndexParam, startPageIndex, pageSizeParam, webserviceURL) => {
    // TODO Convert here: from fields with queryValue to {paramName}:{queryValue} or URL, to be checked
    this.setState({
      formValues: {
        ...this.state.formValues,
        query: {
          ...fields,
          pageIndexParam,
          startPageIndex,
          pageSizeParam,
          webserviceURL,
        },
      },
      formState: STATE.RESULTS,
    })
  }

  /**
   * On crawler results conversion configuration part submitted: update part values then attempt server update
   * @param {*} fields edited form fields
   */
  onResultsSubmit = (fields) => {
    // Note: we publish in state before to handle the error case followed by user edition
    this.setState({
      formValues: {
        ...this.state.formValues,
        results: fields,
      },
    }, this.publishPluginConfiguration)
  }

  /**
   * Redirect user to configurations list
   */
  redirectToList = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/datasource/list`
    browserHistory.push(url)
  }

  /**
   * Publishes the plugin configuration to backend, from current state
   */
  publishPluginConfiguration = () => {
    const { formValues: { crawler, query, results } } = this.state
    const conf = {
      pluginId: 'webservice-datasource',
      label: crawler.name,
      version: '1.0-SNAPSHOT',
      priorityOrder: 0,
      refreshRate: +crawler.refreshRate, // TODO: Doesn't seem to exist // TODO what '+'??????
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
      // TODO : Ce que j'ai fait ici ne marchait pas du tout. RMI: verifier
    } else {
      // TODO use edit here!!!
      Promise.resolve(this.props.createDatasource(conf)).then((actionResults) => {
        if (!actionResults.error) {
          this.redirectToList()
        }
      })
    }
    return conf
  }

  /**
   * Redirects user on previous screen
   */
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

  /**
   * Render the current form according with step
   * @return {React.Component} render element
   */
  renderSubContainer = () => {
    const { project } = this.props.params
    const { formValues: { crawler, query, results }, formState } = this.state
    switch (formState) {
      case STATE.CRAWLER:
      default:
        return (
          <OSCrawlerConfigurationContainer
            project={project}
            initialValues={crawler}
            isEditing={this.state.isEditing}
            onBack={this.handleBack}
            onSubmit={this.onCrawlerSubmit}
          />
        )
      case STATE.QUERY:
        return (
          <OSQueryConfigurationContainer
            initialValues={query}
            isEditing={this.state.isEditing}
            onBack={this.handleBack}
            onSubmit={this.onQuerySubmit}
          />
        )
      case STATE.RESULTS:
        return (
          <OSResultsConfigurationContainer
            initialValues={results}
            isEditing={this.state.isEditing}
            onBack={this.handleBack}
            onSubmit={this.onResultsSubmit}
          />
        )
    }
  }

  render() {
    const { ready } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator isLoading={!ready}>
          {this.renderSubContainer()}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default compose(
  connect(OSConfigurationFormContainer.mapStateToProps, OSConfigurationFormContainer.mapDispatchToProps),
  withModuleStyle(styles))(OSConfigurationFormContainer)
