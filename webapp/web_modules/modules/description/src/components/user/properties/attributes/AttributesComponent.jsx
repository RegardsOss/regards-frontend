/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import Subheader from 'material-ui/Subheader'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ScrollArea } from '@regardsoss/adapters'
import { AttributesGroupArray } from '../../../../shapes/AttributeGroupRuntime'
import LoadingDisplayerComponent from '../../LoadingDisplayerComponent'
import AttributesGroupComponent from './AttributesGroupComponent'
import DescriptionThumbnailComponent from './DescriptionThumbnailComponent'

/**
 * Attributes view component: shows attributes and groups
 * @author Raphaël Mechali
 */
class AttributesComponent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // attributes groups
    attributeGroups: AttributesGroupArray.isRequired,
    // thumbnail URL, only when it should be shown
    thumbnailURL: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { loading, attributeGroups, thumbnailURL } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    const { attributes: { rootStyle, attributesContainer, scrollArea }, messageContainerStyle, loadingContainerStyle } = moduleTheme.user.card.media.tabs.tab.propertiesTab

    const noData = !attributeGroups.length

    return (
      <ScrollArea horizontal={false} vertical style={scrollArea}>
        <div style={rootStyle}>
          { /* 1. Default header when loading or no data */
            loading || !attributeGroups.length ? (
              <Subheader>
                <FormattedMessage id="module.description.properties.attributes" />
              </Subheader>) : null
          }
          { /* 2. loading */
            loading ? (
              <div style={loadingContainerStyle}>
                <LoadingDisplayerComponent message={formatMessage({ id: 'module.description.properties.loading.attributes' })} />
              </div>
            ) : null
          }
          { /* 3. No data (when not loading) */
            !loading && noData ? (
              <div style={messageContainerStyle}>
                <FormattedMessage id="module.description.properties.no.attribute" />
              </div>
            ) : null
          }
          { /* 4. Thumbnail (when not loading, nor empty and thumnail is available) */
            !loading && !noData && thumbnailURL
              ? <DescriptionThumbnailComponent thumbnailURL={thumbnailURL} /> : null
          }
          { /* 5. Groups (when not loading nor empty) */
            !loading && !noData ? (
              <div style={attributesContainer.rootStyle}>
                { // render every group
                  attributeGroups.map(group => <AttributesGroupComponent key={group.key} group={group} />)
                }
              </div>
            ) : null
          }
        </div>
      </ScrollArea>
    )
  }
}

export default AttributesComponent
