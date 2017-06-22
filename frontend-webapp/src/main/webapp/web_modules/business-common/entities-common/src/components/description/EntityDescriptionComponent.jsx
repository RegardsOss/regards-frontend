/**
 * LICENSE_PLACEHOLDER
 **/
import { Tab, Tabs } from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { PositionedDialog } from '@regardsoss/components'
import { CatalogShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import DownloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import DescriptionLevelActions from '../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../model/description/DescriptionLevelSelectors'
import DescriptionBreadcrumbContainer from '../../containers/description/breadcrumb/DescriptionBreadcrumbContainer'
import PropertiesTabComponent from './properties/PropertiesTabComponent'
import DescriptionFileContainer from '../../containers/description/file/DescriptionFileContainer'

/**
 * Shows entity description view.
 * Note: you can add here properties that should be sent to inner dialog.
 */
class EntityDescriptionComponent extends React.Component {

  static propTypes = {
    // component API
    entity: CatalogShapes.Entity,
    open: PropTypes.bool.isRequired,

    // clients and selectors for sub components
    downloadDescriptionClient: PropTypes.instanceOf(DownloadDescriptionClient).isRequired,
    fetchModelAttributesActions: PropTypes.instanceOf(DataManagementClient.ModelAttributesActions).isRequired,
    fetchModelAttributesSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    levelActions: PropTypes.instanceOf(DescriptionLevelActions).isRequired,
    levelSelectors: PropTypes.instanceOf(DescriptionLevelSelectors).isRequired,

    // control callback
    onSearchTag: PropTypes.func,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentWillMount = () => {
    this.setState({
      contentHeight: 0,
    })
  }


  /**
   * Overrides MUI tab rendering: forbig showing the tab if not selected (by default MUI use display:hidden,
   * but it breaks with flex layout, as flex ignores hidden parameter)
   */
  renderTab = props => props.selected ? props.children : null

  render() {
    const { open, entity, onSearchTag, onClose,
      downloadDescriptionClient, fetchModelAttributesActions, fetchModelAttributesSelectors, levelActions, levelSelectors,
      ...otherDialogProperties } = this.props
    const { moduleTheme: { descriptionDialog } } = this.context
    const breadcrumb = <DescriptionBreadcrumbContainer levelActions={levelActions} levelSelectors={levelSelectors} />
    const actions = [<FlatButton
      key="close.button"
      label={this.context.intl.formatMessage({ id: 'entities.common.close.button' })}
      onTouchTap={onClose}
    />]
    return (
      <PositionedDialog
        open={open}
        dialogHeightPercent={descriptionDialog.heightPercent}
        dialogWidthPercent={descriptionDialog.widthPercent}
        onRequestClose={onClose}
        bodyStyle={descriptionDialog.body}
        actions={actions}
        {...otherDialogProperties}
      >
        <Card style={descriptionDialog.card.style} containerStyle={descriptionDialog.card.containerStyle}>
          <CardTitle title={breadcrumb} style={descriptionDialog.card.titleStyle} />
          <CardMedia style={descriptionDialog.card.media.rootStyle} mediaStyle={descriptionDialog.card.media.mediaStyle}>
            <Tabs
              style={descriptionDialog.card.media.tabs.rootStyle}
              tabItemContainerStyle={descriptionDialog.card.media.tabs.tabItemContainerStyle}
              contentContainerStyle={descriptionDialog.card.media.tabs.contentContainerStyle}
              tabTemplate={this.renderTab}
              tabTemplateStyle={descriptionDialog.card.media.tabs.tabTemplateStyle}
            >
              <Tab label={this.context.intl.formatMessage({ id: 'entities.common.properties.tabs' })}>
                <PropertiesTabComponent
                  entity={entity}
                  onSearchTag={onSearchTag}
                  fetchModelAttributesActions={fetchModelAttributesActions}
                  fetchModelAttributesSelectors={fetchModelAttributesSelectors}
                  levelActions={levelActions}
                  levelSelectors={levelSelectors}
                />
              </Tab>
              <Tab label={this.context.intl.formatMessage({ id: 'entities.common.description.tabs' })}>
                <DescriptionFileContainer
                  entity={entity}
                  downloadDescriptionClient={downloadDescriptionClient}
                />
              </Tab>
            </Tabs>
          </CardMedia>
        </Card>
      </PositionedDialog >

    )
  }

}
export default EntityDescriptionComponent
