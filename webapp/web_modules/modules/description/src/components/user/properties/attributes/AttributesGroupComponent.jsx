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
import Subheader from 'material-ui/Subheader'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AttributesGroup } from '../../../../shapes/AttributeGroupRuntime'

/**
 * Component to render an attributes group
 * @author Raphaël Mechali
 */
class AttributesGroupComponent extends React.Component {
  static propTypes = {
    group: AttributesGroup.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      group: {
        key, showTitle, title, elements,
      },
    } = this.props
    const { intl: { locale }, moduleTheme } = this.context
    const { attributes: { attributesContainer } } = moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab

    // Note: we work here within fragments to not break parent grid layout
    return (
      <React.Fragment>
        { /* 1. Show group title if configured */
          showTitle ? ( // title
            <Subheader key={`title.${key}`} style={attributesContainer.groupTitleStyle}>
              {title[locale]}
            </Subheader>) : ( // no title, show placeholder
              <div style={attributesContainer.groupTitlePlaceholdStyle} />
          )
        }
        { /* 2. Show group elements */
          elements.map(({ key: elementKey, label, attributes }) => (
            <React.Fragment key={elementKey}>
              <div style={attributesContainer.labelStyle}>
                {label[locale]}
              </div>
              <div style={attributesContainer.valueStyle}>
                { /** Render attributes values */
                  attributes.map(({
                    key: attributeKey, Renderer, renderValue, renderUnit,
                  }) => (<Renderer
                    key={attributeKey}
                    value={renderValue}
                    unit={renderUnit}
                    multilineDisplay
                  />))
                }
              </div>
            </React.Fragment>
          ))
        }
      </React.Fragment>
    )
  }
}

export default AttributesGroupComponent
