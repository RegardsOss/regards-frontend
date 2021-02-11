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
import flatMap from 'lodash/flatMap'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AttributeGroup } from '../../../../shapes/DescriptionState'

/**
 * Displays an attribute group in parameters section
 * @author Raphaël Mechali
 */
class AttributesGroupComponent extends React.Component {
  static propTypes = {
    group: AttributeGroup.isRequired,
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
    const {
      intl: { locale }, moduleTheme: {
        user: {
          main: {
            content: {
              parameters: { attributesGroupsContainer },
            },
          },
        },
      },
    } = this.context

    // Note: we work here within fragments to not break parent grid layout
    return (
      <>
        { /* 1. Show group title if configured */
          showTitle ? ( // title
            <div key={`title.${key}`} style={attributesGroupsContainer.groupTitleStyle}>
              {title[locale]}
            </div>) : ( // no title, show placeholder
              <div style={attributesGroupsContainer.groupTitlePlaceholdStyle} />
          )
        }
        { /* 2. Show group elements */
          elements.map(({ key: elementKey, label, displayedAttributes }) => (
            <React.Fragment key={elementKey}>
              <div title={label[locale]} style={attributesGroupsContainer.labelStyle}>
                {label[locale]}
              </div>
              <div style={attributesGroupsContainer.valueStyle}>
                { /** Render attributes values */
                  flatMap(displayedAttributes, (({
                    key: attributeKey, render: { Constructor, props },
                  }, index) => [
                    index
                    // append next value separator, when not first element
                      ? <div key={`separator.${attributeKey}`} style={attributesGroupsContainer.valuesSeparator} />
                      : null,
                    <Constructor
                      key={`value.${attributeKey}`}
                      {...props}
                      multilineDisplay
                    />]))
                }
              </div>
            </React.Fragment>
          ))
        }
      </>
    )
  }
}

export default AttributesGroupComponent
