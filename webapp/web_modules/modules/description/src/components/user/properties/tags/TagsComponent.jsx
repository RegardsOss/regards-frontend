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
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CatalogShapes } from '@regardsoss/shape'
import { ScrollArea } from '@regardsoss/adapters'
import { ModuleConfiguration } from '../../../../shapes/ModuleConfiguration'
import LoadingDisplayerComponent from '../../LoadingDisplayerComponent'
import SimpleTagContainer from '../../../../containers/user/properties/tags/SimpleTagContainer'
import EntityTagContainer from '../../../../containers/user/properties/tags/EntityTagContainer'


/**
 * Tags display component.
 * @author Raphaël Mechali
 */
class TagsComponent extends React.Component {
  static propTypes = {
    moduleConf: ModuleConfiguration.isRequired,
    loading: PropTypes.bool.isRequired,
    simpleTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    entityTags: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
    documentTags: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
    showTags: PropTypes.bool.isRequired, // should show tags
    showLinkedDocuments: PropTypes.bool.isRequired, // should show linked documents?
    onSearchTag: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Messages to render document tags group */
  static DOCUMENTS_RENDER_MESSAGES = {
    titleKey: 'module.description.properties.documents.entities',
    loadingKey: 'module.description.properties.loading.document',
    noDataKey: 'module.description.properties.no.document',
  }

  /** Messages to render entity tags group */
  static ENTITIES_RENDER_MESSAGES = {
    titleKey: 'module.description.properties.tags.entities',
    loadingKey: 'module.description.properties.loading.tags',
    noDataKey: 'module.description.properties.no.tag',
  }

  /**
   * Renders a tag group
   * @param {{titleKey: string, loadingKey: string, noDataKey: string}} messages messages for group
   * @param {boolean} allowSearchTag is search allowed for this group tags
   * @param {[string]} simpleTags simple tags in group
   * @param {[CatalogEntity]} entityTags entity tags in group
   * @return {React.Element} render element
   */
  renderTagGroup = (messages, allowSearchTag, simpleTags, entityTags) => {
    const { intl: { formatMessage } } = this.context
    const { loading, onSearchTag, moduleConf } = this.props
    const {
      tags: {
        sectionStyle, tagsContainer, scrollArea, scrollAreaContent,
      },
      loadingContainerStyle, messageContainerStyle,
    } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab
    return (
      <ScrollArea horizontal={false} vertical contentStyle={scrollAreaContent} style={scrollArea}>
        <div style={sectionStyle}>
          <Subheader>
            <FormattedMessage id={messages.titleKey} />
          </Subheader>
          {
            (function renderContent() {
              if (loading) {
                return (
                  <div style={loadingContainerStyle} >
                    <LoadingDisplayerComponent message={formatMessage({ id: messages.loadingKey })} />
                  </div>
                )
              } else if (!simpleTags.length && !entityTags.length) {
                return (
                  <div style={messageContainerStyle}>
                    <FormattedMessage id={messages.noDataKey} />
                  </div>)
              }
              return (
                <div style={tagsContainer.rootStyle}>
                  {
                    simpleTags.map(tag => <SimpleTagContainer key={tag} tag={tag} onSearchTag={allowSearchTag ? onSearchTag : null} />)
                  }
                  {
                    entityTags.map(entity => (
                      <EntityTagContainer
                        key={entity.content.ipId}
                        entity={entity}
                        moduleConf={moduleConf}
                        onSearchTag={allowSearchTag ? onSearchTag : null}
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


  render() {
    const {
      rootStyle, tagsRootStyle, documentsRootStyle, horizontalAreaSeparator,
    } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab.tags
    const {
      moduleConf, simpleTags, entityTags, documentTags, showTags, showLinkedDocuments,
    } = this.props
    return (
      <div style={rootStyle}>
        {/* tags (look in module configuration to check if search by tag should be allowed) */
          showTags ? (
            <div style={tagsRootStyle}>
              {
                this.renderTagGroup(TagsComponent.ENTITIES_RENDER_MESSAGES, moduleConf.allowTagSearch, simpleTags, entityTags)
              }
            </div>
          ) : null
        }
        {/* layout separator when required */
          showTags && showLinkedDocuments ? (
            <div style={horizontalAreaSeparator} />
          ) : null
        }
        {/* documents (tag search is always forbidden in that case) */
          showLinkedDocuments ? (
            <div style={documentsRootStyle}>
              {
                this.renderTagGroup(TagsComponent.DOCUMENTS_RENDER_MESSAGES, false, [], documentTags)
              }
            </div>
          ) : null
        }
      </div>
    )
  }
}


export default TagsComponent
