/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import get from 'lodash/get'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { getTypeRender } from '@regardsoss/attributes-common'


/**
 * Renders the list of attributes
 */
class GalleryParametersComponent extends React.PureComponent {
  static propTypes = {
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    attributePresentationModels: AccessShapes.AttributePresentationModelArray.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render = () => {
    const { moduleTheme } = this.context
    const { attributePresentationModels } = this.props
    const {
      attributesStyles, labelCellStyle, labelColumnStyles, valueCellStyle, valueColumnStyles,
    } = moduleTheme.user.listViewStyles

    return (
      <div style={attributesStyles} >
        <div style={labelColumnStyles}>

          {
            map(attributePresentationModels, (attributePresentationModel) => {
              const firstAttributeDisplayed = attributePresentationModel.attributes[0].content
              return (
                <div style={labelCellStyle} key={firstAttributeDisplayed.name}>
                  {firstAttributeDisplayed.label}
                </div>)
            })
          }
        </div>
        <div style={valueColumnStyles}>

          {
            map(attributePresentationModels, (attributePresentationModel) => {
              const firstAttributeDisplayed = attributePresentationModel.attributes[0].content
              const AttributeConstructor = getTypeRender(firstAttributeDisplayed.type)
              const value = get(this.props.entity, `content.${firstAttributeDisplayed.jsonPath}`)
              return (
                <div style={valueCellStyle} key={firstAttributeDisplayed.name}>
                  <AttributeConstructor
                    value={value}
                  />
                </div>)
            })
          }
        </div>
      </div>
    )
  }
}

export default GalleryParametersComponent
