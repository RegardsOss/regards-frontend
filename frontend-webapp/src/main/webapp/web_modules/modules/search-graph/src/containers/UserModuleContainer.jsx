/**
 * LICENSE_PLACEHOLDER
 **/
import last from 'lodash/last'
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import { connect } from '@regardsoss/redux'
import { CatalogEntity, CatalogEntityTypes, AttributeModel, AttributeModelController, AttributeConfigurationController } from '@regardsoss/model'
import { getTypeRender } from '@regardsoss/attributes-common'
import { ShowableAtRender } from '@regardsoss/components'
import ModuleConfiguration from '../model/ModuleConfiguration'
import { AttributeModelAction, AttributeModelSelector } from '../model/client/AttributeModelClient'
import GraphContextSelectors from '../model/graph/GraphContextSelectors'
import NavigableSearchResults from '../components/user/NavigableSearchResults'
import SearchGraph from '../components/user/SearchGraph'

/**
 * Module container for user interface
 **/
class UserModuleContainer extends React.Component {

  static mapStateToProps = (state, { moduleConf }) => {
    // retrieve last selected dataset (ignore collections)
    const selectionPath = GraphContextSelectors.getSelectionPath(state)
    const selection = selectionPath.length ? last(selectionPath) : null
    const selectedDataset = selection && selection.type === CatalogEntityTypes.DATASET ? selection : null
    return {
      selectedDataset,
      attributeModels: AttributeModelSelector.getList(state),
      moduleCollapsed: GraphContextSelectors.isModuleCollapsed(state),
    }
  }

  static mapDispatchToProps = dispatch => ({
    fetchAttributeModels: () => dispatch(AttributeModelAction.fetchPagedEntityList()),
  })

  static propTypes = {
    // supplied by LazyModuleComponent
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    moduleConf: ModuleConfiguration.isRequired, // Module configuration
    // from map state to props
    selectedDataset: CatalogEntity,
    attributeModels: React.PropTypes.objectOf(AttributeModel),
    moduleCollapsed: React.PropTypes.bool.isRequired,
    // from map dispatch to props
    fetchAttributeModels: React.PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    // initialize resolved dataset attributes to empty collection
    // note: the moment it will get resolved is not important for this component
    this.setState({ graphDatasetAttributes: [] })
  }

  componentDidMount = () => {
    // Fetch attribute models in order to resolve dataset attributes for the graph
    const { fetchAttributeModels } = this.props
    fetchAttributeModels()
  }

  componentWillReceiveProps = ({
    moduleConf: { graphDatasetAttributes: nextGraphDatasetAttributes },
    attributeModels: nextAttributesModels,
    selectedDataset: nextSelectedDataset }) => {
    const { moduleConf: { graphDatasetAttributes }, attributeModels, selectedDataset } = this.props
    // update graph attributes if required (store it in state)
    if (!isEqual(graphDatasetAttributes, nextGraphDatasetAttributes) || !isEqual(attributeModels, nextAttributesModels)) {
      const attributesConfiguration = nextGraphDatasetAttributes || []
      const fetchedAtributesModels = nextAttributesModels || {}
      // 1 - filter (only visible attributes from configuration)
      const filtered = filter(attributesConfiguration, ({ visibility }) => visibility)
      // 2 - order them as they sould be dispayed (if no order, place before all)
      const sorted = sortBy(filtered, a => a.order || 0)
      // 3 - resolve attributes from model (ignore the non resolved attributes, as they come from model changes)
      const resolvedGraphDatasetAttributes = sorted.reduce((resolvedAcc, attributeConfiguration) => {
        const fullQualifiedName = attributeConfiguration.attributeFullQualifiedName
        let resolvedAttribute = null
        if (AttributeConfigurationController.isStandardAttribute(attributeConfiguration)) {
          // 3.a - standard attribute mapping, always resolves
          resolvedAttribute = {
            label: fullQualifiedName,
            attributePath: [fullQualifiedName], // root attribute
            render: getTypeRender(), // default render
          }
        } else {
          // 3.b - dynamic attribute mapping, resolves if found in fetched models
          const foundModel = find(fetchedAtributesModels, attributeModel =>
            AttributeModelController.getAttributeFullyQualifiedName(attributeModel) === fullQualifiedName)
          if (foundModel) {
            resolvedAttribute = {
              label: foundModel.content.label,
              attributePath: AttributeModelController.getAttributeAccessPath(foundModel), // fragment attribute
              render: getTypeRender(foundModel.content.type),
            }
          }
          // else : not found, ignore it
        }
        // Append only when resolved
        return resolvedAttribute ? [...resolvedAcc, resolvedAttribute] : resolvedAcc
      }, [])
      this.setState({ graphDatasetAttributes: resolvedGraphDatasetAttributes })
    }
    // update search query
    if (!isEqual(selectedDataset, nextSelectedDataset)) {
      this.setState({ openSearchQuery: this.buildOpenSearchQuery(nextSelectedDataset) })
    }
  }

  buildOpenSearchQuery = nextSelectedDataset => nextSelectedDataset ? `tags:${nextSelectedDataset.ipId}` : null

  render() {
    const { appName, project, moduleCollapsed, moduleConf } = this.props
    const { graphDatasetAttributes, openSearchQuery } = this.state

    return (
      <div>
        <SearchGraph
          moduleCollapsed={moduleCollapsed}
          graphDatasetAttributes={graphDatasetAttributes}
          moduleConf={moduleConf}
        />
        <ShowableAtRender show={!!openSearchQuery}>
          <NavigableSearchResults
            appName={appName}
            project={project}
            moduleConf={moduleConf}
            searchQuery={openSearchQuery}
          />
        </ShowableAtRender>
      </div>)
  }
}

export default connect(
  UserModuleContainer.mapStateToProps,
  UserModuleContainer.mapDispatchToProps)(UserModuleContainer)

