/**
 * LICENSE_PLACEHOLDER
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
      renderer: PropTypes.func.isRequired,
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
                    <FormattedMessage id="entities.common.properties.attribute.cell.no.value" />
                  </div>
                )
              }
              return (
                <div style={attributesContainer.rootStyle} >
                  { // map every attribute to a table row layout
                    attributes.map(({ id, label, renderer: Renderer, renderValue }) => (
                      <div key={id} style={attributesContainer.rowStyle}>
                        <div style={attributesContainer.labelStyle}>{label}</div>
                        <div style={attributesContainer.valueStyle}>
                          {
                            renderValue ?
                              (<Renderer attributes={renderValue} />) :
                              (<FormattedMessage id="entities.common.attribute.cell.no.value" />)
                          }
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
