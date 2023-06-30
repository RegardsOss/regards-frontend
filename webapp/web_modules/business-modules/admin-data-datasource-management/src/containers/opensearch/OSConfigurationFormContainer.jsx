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
import compose from 'lodash/fp/compose'
import isNil from 'lodash/isNil'
import { browserHistory } from 'react-router'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { datasourceSelectors, datasourceActions } from '../../clients/DatasourceClient'
import OSCrawlerConfigurationContainer from './OSCrawlerConfigurationContainer'
import OSQueryConfigurationContainer from './OSQueryConfigurationContainer'
import OSResultsConfigurationContainer from './OSResultsConfigurationContainer'
import messages from '../../i18n'
import styles from '../../styles'

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
    // From map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    currentDatasource: DataManagementShapes.Datasource, // used only in on properties updated
    // From map dispatch to props
    createDatasource: PropTypes.func.isRequired,
    updateDatasouce: PropTypes.func.isRequired,
    fetchDatasource: PropTypes.func.isRequired,
  }

  static STATE = {
    CRAWLER: 'CRAWLER',
    QUERY: 'QUERY',
    RESULTS: 'RESULTS',
  }

  /** Initial values when in creation mode */
  static INITIAL_CREATION_VALUES = {
    crawler: {
      refreshRate: '86400',
    },
    query: { },
    results: { },
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
      createDatasource: (values) => dispatch(datasourceActions.createEntity(values)),
      updateDatasouce: (id, values) => dispatch(datasourceActions.updateEntity(id, values)),
      fetchDatasource: (id) => dispatch(datasourceActions.fetchEntity(id)),
    }
  }

  /**
   * Computes each part of the form initial edition values from edited datasource
   * @param {*} datasource edited datasource, never null (used only for edition data)
   * @return {crawler: {*}, query: {*}, results: {*}} initial values for each parts of the form
   */
  static getInitialEditionValues(datasource) {
    const { content: { parameters, label } } = datasource
    const refreshRateParameter = parameters.find((config) => config.name === 'refreshRate')
    const { value: { opensearchDescriptorURL, ...webserviceValues } } = parameters.find((config) => config.name === 'webserviceConfiguration')
    const { value: conversionValues } = parameters.find((config) => config.name === 'conversionConfiguration')
    return {
      crawler: {
        label,
        opensearchDescriptorURL,
        refreshRate: refreshRateParameter && refreshRateParameter.value ? refreshRateParameter.value.toString() : undefined, // undefined is OK here
      },
      query: {
        //  webserviceURL, pageIndexParam, pageSizeParam, lastUpdateParam, webserviceParameters unchanged, remove
        ...webserviceValues,
        // startPageIndex and pagesSize : same field name but convert to string for form edition
        startPageIndex: webserviceValues.startPageIndex && webserviceValues.startPageIndex.toString(), // undefined is OK here
        pagesSize: webserviceValues.pagesSize && webserviceValues.pagesSize.toString(), // undefined is OK here
      },
      // all fields and fields values for results
      results: conversionValues,
    }
  }

  /**
   * Computes resulting plugin model from edited values
   * @param {number} businessId edited plugin business id (leave undefined when creating)
   * @param {{crawler, query, results}} editedValues
   * @return {*} plugin model for edited values
   */
  static getPluginModelFromEdition({ crawler, query, results }, businessId) {
    return {
      businessId,
      pluginId: 'webservice-datasource',
      label: crawler.label,
      priorityOrder: 0,
      active: true,
      pluginClassName: 'fr.cnes.regards.modules.dam.plugins.datasources.webservice.WebserviceDatasourcePlugin',
      parameters: [{
        name: 'refreshRate',
        type: 'INTEGER',
        value: crawler.refreshRate && parseInt(crawler.refreshRate, 10),
      }, {
        name: 'webserviceConfiguration',
        type: 'POJO',
        value: {
          // descriptor URL from crawler edition
          opensearchDescriptorURL: crawler.opensearchDescriptorURL,
          // all query values but convert start page index and pages size into integer values
          ...query,
          startPageIndex: query.startPageIndex && parseInt(query.startPageIndex, 10),
          pagesSize: query.pagesSize && parseInt(query.pagesSize, 10),
        },
        clazz: 'fr.cnes.regards.modules.dam.plugins.datasources.webservice.configuration.WebserviceConfiguration',
      }, {
        name: 'conversionConfiguration',
        value: results, // strictly the same than converted output edition model
        type: 'POJO',
        clazz: 'fr.cnes.regards.modules.dam.plugins.datasources.webservice.configuration.ConversionConfiguration',
      }],
    }
  }

  state = {
    // is in edition mode?
    isEditing: !isNil(this.props.params.datasourceId),
    // Is ready for edition? (or does it require to retrieve the edited datasource first)
    ready: isNil(this.props.params.datasourceId),
    // currently edited values
    formValues: OSConfigurationFormContainer.INITIAL_CREATION_VALUES,
    // initially presented step
    formState: OSConfigurationFormContainer.STATE.CRAWLER,
  }

  /**
   * Lifecycle method: component did mount. Used here to fetch the data source the state
   */
  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchDatasource(this.props.params.datasourceId)
    }
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: Used here to update state when edition data has been fetched (useless
   * in creation mode)
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { currentDatasource: oldDatasource } = oldProps
    const { params = {}, currentDatasource: newDatasource } = newProps
    if (params.datasourceId && !oldDatasource && newDatasource) {
      // Detected: edition data has been fetch successfully, let user start editing
      this.setState({
        ready: true,
        formValues: OSConfigurationFormContainer.getInitialEditionValues(newDatasource),
      })
    }
  }

  /**
   * On crawler root configuration part submitted: update part values and set up next step presentation
   * @param {*} crawler new crawler values (must match expected format)
   */
  onCrawlerSubmit = (crawler) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        crawler,
      },
      formState: OSConfigurationFormContainer.STATE.QUERY,
    })
  }

  /**
   * On crawler query configuration part submitted: update part values and set up next step presentation
   * @param {*} query new query values (must match expected shape)
   */
  onQuerySubmit = (query) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        query,
      },
      formState: OSConfigurationFormContainer.STATE.RESULTS,
    })
  }

  /**
   * On crawler results conversion configuration part submitted: update part values then attempt server update
   * @param {*} results new results values (must match expected shape)
   */
  onResultsSubmit = (results) => {
    // Note: we publish in state before to handle the error case followed by user edition
    this.setState({
      formValues: {
        ...this.state.formValues,
        results,
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
    const { isEditing, formValues } = this.state
    const { createDatasource, updateDatasouce, params } = this.props
    const pluginConfiguration = PluginFormUtils.formatPluginConf(OSConfigurationFormContainer.getPluginModelFromEdition(formValues, isEditing ? params.datasourceId : null))
    Promise.resolve(isEditing ? updateDatasouce(params.datasourceId, pluginConfiguration) : createDatasource(pluginConfiguration))
      .then((actionResults) => {
        if (!actionResults.error) {
          this.redirectToList()
        }
      })
  }

  /**
   * Redirects user on previous screen
   */
  handleBack = () => {
    const { isEditing, formState } = this.state
    switch (formState) {
      case OSConfigurationFormContainer.STATE.QUERY:
        this.setState({ formState: OSConfigurationFormContainer.STATE.CRAWLER })
        break
      case OSConfigurationFormContainer.STATE.RESULTS:
        this.setState({ formState: OSConfigurationFormContainer.STATE.QUERY })
        break
      case OSConfigurationFormContainer.STATE.CRAWLER:
      default:
        if (isEditing) { // back to list when editing
          this.redirectToList()
        } else { // back to selection screen when creating
          browserHistory.push(`/admin/${this.props.params.project}/data/acquisition/datasource/create/interface`)
        }
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
      case OSConfigurationFormContainer.STATE.CRAWLER:
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
      case OSConfigurationFormContainer.STATE.QUERY:
        return (
          <OSQueryConfigurationContainer
            initialValues={query}
            isEditing={this.state.isEditing}
            onBack={this.handleBack}
            onSubmit={this.onQuerySubmit}
          />
        )
      case OSConfigurationFormContainer.STATE.RESULTS:
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
