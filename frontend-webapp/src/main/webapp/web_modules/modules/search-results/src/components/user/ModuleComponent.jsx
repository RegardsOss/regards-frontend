/**
* LICENSE_PLACEHOLDER
**/
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { AttributeModel, AttributeConfiguration, AttributesRegroupementConfiguration, SearchResultsTargetsEnum } from '@regardsoss/model'
import SearchResultsContainer from '../../containers/user/results/SearchResultsContainer'
import NavigationContainer from '../../containers/user/navigation/NavigationContainer'

/**
* Search results module view
*/
class ModuleComponent extends React.Component {

  static propTypes = {
    // sub modules rendering
    appName: React.PropTypes.string,
    project: React.PropTypes.string,

    // initial configuration
    // eslint-disable-next-line react/no-unused-prop-types
    searchQuery: React.PropTypes.string,

    // facettes configuration
    enableFacettes: React.PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    facettesQuery: React.PropTypes.string,

    // Dataset configuration
    // eslint-disable-next-line react/no-unused-prop-types
    initialDatasetIpId: React.PropTypes.string,

    // Attributes configurations for results columns
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    attributeModels: React.PropTypes.objectOf(AttributeModel),

  }

  static defaultProps = {}

  render() {
    const {
      appName, project, searchQuery, enableFacettes, facettesQuery, initialDatasetIpId,
      attributesConf, attributesRegroupementsConf, attributeModels } = this.props
    return (
      <Card>
        <CardTitle title={<NavigationContainer />} />
        <CardMedia>
          <SearchResultsContainer
            appName={appName}
            project={project}
            enableFacettes={enableFacettes}
            searchQuery={searchQuery}
            facettesQuery={facettesQuery}
            initialDatasetIpId={initialDatasetIpId}
            attributesConf={attributesConf}
            attributesRegroupementsConf={attributesRegroupementsConf}
            attributeModels={attributeModels}
          />
        </CardMedia>
      </Card>
    )
  }
}
export default ModuleComponent
