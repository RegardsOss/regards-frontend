/**
* LICENSE_PLACEHOLDER
**/
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { AttributeModel, AttributeConfiguration, AttributesRegroupementConfiguration } from '@regardsoss/model'
import SearchResultsContainer from '../../containers/user/results/SearchResultsContainer'
import NavigationContainer from '../../containers/user/navigation/NavigationContainer'

/**
* Search results module view
*/
class ModuleComponent extends React.Component {

  static propTypes = {
    // sub modules rendering
    appName: PropTypes.string,
    project: PropTypes.string,

    // initial configuration
    // eslint-disable-next-line react/no-unused-prop-types
    searchQuery: PropTypes.string,

    // configuration
    enableFacettes: PropTypes.bool.isRequired,
    displayDatasets: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    facettesQuery: PropTypes.string,

    // Attributes configurations for results columns
    attributesConf: PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    attributeModels: PropTypes.objectOf(AttributeModel),

  }

  static defaultProps = {}

  render() {
    const {
      appName, project, searchQuery, enableFacettes, facettesQuery, displayDatasets,
      attributesConf, attributesRegroupementsConf, attributeModels } = this.props
    return (
      <Card>
        <CardTitle title={<NavigationContainer displayDatasets={displayDatasets} />} />
        <CardMedia>
          <SearchResultsContainer
            appName={appName}
            project={project}
            enableFacettes={enableFacettes}
            displayDatasets={displayDatasets}
            searchQuery={searchQuery}
            facettesQuery={facettesQuery}
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
