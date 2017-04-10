/**
 * LICENSE_PLACEHOLDER
 **/
import last from 'lodash/last'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { CatalogEntity, CatalogEntityTypes } from '@regardsoss/model'
import ModuleConfiguration from '../model/ModuleConfiguration'
import GraphSelectionSelectors from '../model/graph/GraphSelectionSelectors'
import NavigableSearchResults from '../components/user/NavigableSearchResults'
import SearchGraph from '../components/user/SearchGraph'

/**
 * Module container for user interface
 **/
class UserModuleContainer extends React.Component {

  static mapStateToProps = (state) => {
    // retrieve last selected dataset (ignore collections)
    const selectionPath = GraphSelectionSelectors.getSelectionPath(state)
    const selection = selectionPath.length ? last(selectionPath) : null
    const selectedDataset = selection && selection.type === CatalogEntityTypes.DATASET ? selection : null
    return { selectedDataset }
  }

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    // Module configuration
    moduleConf: ModuleConfiguration.isRequired,
    // from map state to props
    selectedDataset: CatalogEntity,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { appName, project, moduleConf } = this.props
    const { moduleTheme: { user } } = this.context

    // TODO : back after valid graph
    // <NavigableSearchResults
    //                appName={appName}
    //            project={project}
    //            moduleConf={moduleConf}
    //        searchQuery=TODO avec selectedDataset.ipId
    //          />
    return (
      <div style={user.styles}>
        <SearchGraph moduleConf={moduleConf} />
      </div>)
  }
}

export default connect(UserModuleContainer.mapStateToProps)(UserModuleContainer)
