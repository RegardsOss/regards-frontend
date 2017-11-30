/**
* LICENSE_PLACEHOLDER
**/
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CatalogShapes } from '@regardsoss/shape'
import { ScrollArea } from '@regardsoss/adapters'
import DescriptionLevelActions from '../../../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../../../model/description/DescriptionLevelSelectors'
import LoadingDisplayerComponent from '../../LoadingDisplayerComponent'
import SimpleTagContainer from '../../../../containers/description/properties/tags/SimpleTagContainer'
import EntityTagContainer from '../../../../containers/description/properties/tags/EntityTagContainer'


/**
* Tags display component.
*/
class TagsComponent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    simpleTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    entityTags: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
    onSearchTag: PropTypes.func,
    levelActions: PropTypes.instanceOf(DescriptionLevelActions).isRequired,
    levelSelectors: PropTypes.instanceOf(DescriptionLevelSelectors).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      loading, simpleTags, entityTags, onSearchTag, levelActions, levelSelectors,
    } = this.props
    const { tags: { rootStyle, tagsContainer, scrollAreaContent }, loadingContainerStyle, messageContainerStyle } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab
    return (
      <ScrollArea horizontal={false} vertical contentStyle={scrollAreaContent} >
        <div style={rootStyle}>
          <Subheader>
            <FormattedMessage id="entities.common.properties.tags.entities" />
          </Subheader>
          {
            (function renderContent() {
              if (loading) {
                return (
                  <div style={loadingContainerStyle} >
                    <LoadingDisplayerComponent message={formatMessage({ id: 'entities.common.properties.loading.tags' })} />
                  </div>
                )
              } else if (!simpleTags.length && !entityTags.length) {
                return (
                  <div style={messageContainerStyle}>
                    <FormattedMessage id="entities.common.properties.no.tag" />
                  </div>)
              }
              return (
                <div style={tagsContainer.rootStyle}>
                  {
                    simpleTags.map(tag => <SimpleTagContainer key={tag} tag={tag} onSearchTag={onSearchTag} />)
                  }
                  {
                    entityTags.map(entity => (
                      <EntityTagContainer
                        key={entity.content.ipId}
                        entity={entity}
                        onSearchTag={onSearchTag}
                        levelActions={levelActions}
                        levelSelectors={levelSelectors}
                      />))
                  }
                </div>
              )
            }())
          }
        </div>
      </ScrollArea>
    )
  }
}


export default TagsComponent
