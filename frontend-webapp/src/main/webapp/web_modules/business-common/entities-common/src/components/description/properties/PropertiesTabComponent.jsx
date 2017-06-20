/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'
import { CatalogEntity } from '@regardsoss/model'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import DescriptionLevelActions from '../../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../../model/description/DescriptionLevelSelectors'
import AttributesContainer from '../../../containers/description/properties/attributes/AttributesContainer'
import TagsContainer from '../../../containers/description/properties/tags/TagsContainer'

/**
* The properties tab content
*/
class PropertiesTabComponent extends React.Component {

  static propTypes = {
    entity: CatalogEntity,
    onSearchTag: PropTypes.func,
    fetchModelAttributesActions: PropTypes.instanceOf(DataManagementClient.ModelAttributesActions).isRequired,
    fetchModelAttributesSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    levelActions: PropTypes.instanceOf(DescriptionLevelActions).isRequired,
    levelSelectors: PropTypes.instanceOf(DescriptionLevelSelectors).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { entity, onSearchTag,
      fetchModelAttributesActions, fetchModelAttributesSelectors, levelActions, levelSelectors } = this.props
    const { rootStyle } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab
    return (
      <div style={rootStyle}>
        <AttributesContainer
          entity={entity}
          fetchModelAttributesActions={fetchModelAttributesActions}
          fetchModelAttributesSelectors={fetchModelAttributesSelectors}
        />
        <TagsContainer
          entity={entity}
          onSearchTag={onSearchTag}
          levelActions={levelActions}
          levelSelectors={levelSelectors}
        />
      </div>
    )
  }
}
export default PropertiesTabComponent
