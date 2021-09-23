/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'

/**
 * Renders the list of attributes in a quicklook cell
 * @author Raphaël Mechali
 */
class QuicklookCellAttributesComponent extends React.PureComponent {
  static propTypes = {
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    presentationModels: PropTypes.arrayOf(UIShapes.AttributePresentationModel).isRequired,
    locale: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render = () => {
    const { moduleTheme } = this.context
    const { presentationModels, locale } = this.props
    const {
      attributesStyles, labelCellStyle, labelColumnStyles, valueCellStyle, valueColumnStyles,
    } = moduleTheme.user.listViewStyles

    return (
      <div style={attributesStyles}>
        <div style={labelColumnStyles}>
          { /* Show label on first column */
            map(presentationModels, (attributePresentationModel) => (
              <div style={labelCellStyle} key={attributePresentationModel.key}>
                {attributePresentationModel.label[locale]}
              </div>))
          }
        </div>
        <div style={valueColumnStyles}>
          { /* Show value on second column */
            map(presentationModels, (attributePresentationModel) => (
              <div style={valueCellStyle} key={attributePresentationModel.key}>
                {
                  AttributeColumnBuilder.buildRenderDelegates(attributePresentationModel.attributes).map(({
                    path, RenderConstructor, props,
                  }) => (
                    <RenderConstructor
                      key={path}
                      value={get(this.props.entity, path)}
                      {...props}
                    />))
                }
              </div>))
          }
        </div>
      </div>
    )
  }
}

export default QuicklookCellAttributesComponent
