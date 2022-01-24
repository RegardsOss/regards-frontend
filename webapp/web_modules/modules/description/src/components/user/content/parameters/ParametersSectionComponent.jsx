/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import NoParameterIcon from 'mdi-material-ui/MonitorOff'
import { themeContextType } from '@regardsoss/theme'
import { ScrollArea } from '@regardsoss/adapters'
import { NoContentComponent } from '@regardsoss/components'
import { AttributeGroup, FileData } from '../../../../shapes/DescriptionState'
import AttributesGroupComponent from './AttributesGroupComponent'
import ThumbnailComponent from './DescriptionThumbnailComponent'

/**
 * Parameters section component: shows thumbnail,  attributes and groups
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class ParametersSectionComponent extends React.Component {
  static propTypes = {
    // attributes groups
    attributesGroups: PropTypes.arrayOf(AttributeGroup).isRequired,
    // thumbnail,  provided only when it should be shown
    thumbnail: FileData,
    scrollAreaHeight: PropTypes.number,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { attributesGroups, thumbnail, scrollAreaHeight } = this.props
    const {
      moduleTheme: {
        user: {
          main: {
            content: {
              scrolling,
              parameters: {
                root,
                attributesGroupsContainer,
              },
            },
          },
        },
      },
    } = this.context

    // Compute scroll height area
    const style = {
      ...scrolling.scrollArea,
      height: scrollAreaHeight,
    }

    return !attributesGroups.length && !thumbnail
      ? (
        <NoContentComponent
          titleKey="module.description.no.parameter.title"
          messageKey="module.description.no.parameter.message"
          Icon={NoParameterIcon}
        />)
      : (
        <ScrollArea vertical contentStyle={scrolling.scrollAreaContent} style={style}>
          <div style={root}>
            { /* 1. Thumbnail  */
            thumbnail ? <ThumbnailComponent thumbnail={thumbnail} /> : null
          }
            { /* 2. Groups (when not empty) */
            attributesGroups.length ? (
              <div style={attributesGroupsContainer.root}>
                { // render every group
                  attributesGroups.map((group) => <AttributesGroupComponent key={group.key} group={group} />)
                }
              </div>
            ) : null
          }
          </div>
        </ScrollArea>)
  }
}

export default ParametersSectionComponent
