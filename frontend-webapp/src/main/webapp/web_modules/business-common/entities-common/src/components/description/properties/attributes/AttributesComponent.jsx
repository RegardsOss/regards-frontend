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
import { FormattedMessage } from 'react-intl'
import Subheader from 'material-ui/Subheader'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ScrollArea } from '@regardsoss/adapters'
import LoadingDisplayerComponent from '../../LoadingDisplayerComponent'

/**
 * Attributes view component
 */
class AttributesComponent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // entity attributes, empty array allowed
    attributes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      Renderer: PropTypes.func.isRequired,
      renderValue: PropTypes.any,
    })).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  render() {
    const { loading, attributes } = this.props
    const { intl: { formatMessage } } = this.context
    const { attributes: { rootStyle, attributesContainer, scrollArea }, messageContainerStyle, loadingContainerStyle } =
      this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab

    return (
      <ScrollArea horizontal={false} vertical style={scrollArea}>
        <div style={rootStyle}>
          <Subheader>
            <FormattedMessage id="entities.common.properties.attributes" />
          </Subheader>

          {
            (function renderContent() {
              if (loading) {
                return (
                  <div style={loadingContainerStyle} >
                    <LoadingDisplayerComponent message={formatMessage({ id: 'entities.common.properties.loading.attributes' })} />
                  </div>
                )
              }
              if (!attributes.length) {
                return (
                  <div style={messageContainerStyle} >
                    <FormattedMessage id="entities.common.properties.no.attribute" />
                  </div>
                )
              }
              return (
                <div style={attributesContainer.rootStyle} >
                  { // map every attribute to a table row layout
                    attributes.map(({
 id, label, Renderer, renderValue,
}) => (
  <div key={id} style={attributesContainer.rowStyle}>
    <div style={attributesContainer.labelStyle}>{label}</div>
    <div style={attributesContainer.valueStyle}>
      <Renderer value={renderValue} />
    </div>
  </div>))
                  }
                </div>
              )
            }())
          }
        </div >
      </ScrollArea>
    )
  }
}

export default AttributesComponent
