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
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CatalogShapes } from '@regardsoss/shape'
import { ScrollArea } from '@regardsoss/adapters'
import { EntityIpIdTester } from '@regardsoss/domain/common'
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

  state = {
    tags: [],
    documents: [],
  }

  componentWillMount() {
    this.updateTagsAndDocuments(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.entityTags, nextProps.entityTags)) {
      this.updateTagsAndDocuments(nextProps)
    }
  }

  updateTagsAndDocuments = (props) => {
    const tags = filter(props.entityTags, entity => !EntityIpIdTester.isIpIdADocument(entity.content.ipId)) || []
    const documents = filter(props.entityTags, entity => EntityIpIdTester.isIpIdADocument(entity.content.ipId)) || []
    this.setState({
      tags,
      documents,
    })
  }

  renderDocuments = () => {
    const { intl: { formatMessage } } = this.context
    const {
      loading, levelActions, levelSelectors,
    } = this.props
    const { documents } = this.state
    const {
      tags: { sectionStyle, tagsContainer, scrollAreaContent },
      loadingContainerStyle, messageContainerStyle,
    } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab
    const { fullHeight } = this.context.moduleTheme
    return (
      <ScrollArea horizontal={false} vertical contentStyle={scrollAreaContent} style={fullHeight}>
        <div style={sectionStyle}>
          <Subheader>
            <FormattedMessage id="entities.common.properties.documents.entities" />
          </Subheader>
          {
            (function renderContent() {
              if (loading) {
                return (
                  <div style={loadingContainerStyle} >
                    <LoadingDisplayerComponent message={formatMessage({ id: 'entities.common.properties.loading.document' })} />
                  </div>
                )
              } else if (!documents.length) {
                return (
                  <div style={messageContainerStyle}>
                    <FormattedMessage id="entities.common.properties.no.document" />
                  </div>)
              }
              return (
                <div style={tagsContainer.rootStyle}>
                  {
                    documents.map(entity => (
                      <EntityTagContainer
                        key={entity.content.ipId}
                        entity={entity}
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

  renderTags = () => {
    const { intl: { formatMessage } } = this.context
    const {
      loading, simpleTags, onSearchTag, levelActions, levelSelectors,
    } = this.props
    const { tags: { sectionStyle, tagsContainer, scrollAreaContent }, loadingContainerStyle, messageContainerStyle } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab
    const { fullHeight } = this.context.moduleTheme
    const { tags } = this.state
    return (
      <ScrollArea horizontal={false} vertical contentStyle={scrollAreaContent} style={fullHeight}>
        <div style={sectionStyle}>
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
              } else if (!simpleTags.length && !tags.length) {
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
                    tags.map(entity => (
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

  render() {
    const {
      rootStyle, tagsRootStyle, documentsRootStyle, horizontalAreaSeparator,
    } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab.tags
    return (
      <div style={rootStyle}>
        {/* tags */}
        <div style={tagsRootStyle}>{this.renderTags()}</div>
        {/* layout separator */}
        <div style={horizontalAreaSeparator} />
        {/* documents */}
        <div style={documentsRootStyle}>{this.renderDocuments()}</div>
      </div>
    )
  }
}


export default TagsComponent