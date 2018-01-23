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
import { Tab, Tabs } from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { PositionedDialog } from '@regardsoss/components'
import { CatalogShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import DownloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import DescriptionLevelActions from '../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../model/description/DescriptionLevelSelectors'
import DescriptionBreadcrumbContainer from '../../containers/description/breadcrumb/DescriptionBreadcrumbContainer'
import PropertiesTabComponent from './properties/PropertiesTabComponent'
import DescriptionFileContainer from '../../containers/description/file/DescriptionFileContainer'
import DocumentFilesContainer from '../../containers/description/file/DocumentFilesContainer'
import DataQuicklookComponent from './quicklook/DataQuicklookComponent'

/**
 * Shows entity description view.
 * Note: you can add here properties that should be sent to inner dialog.
 */
class EntityDescriptionComponent extends React.Component {
  static propTypes = {
    // component API
    entity: CatalogShapes.Entity,
    currentTab: PropTypes.string.isRequired,
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
    changeTab: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static PROPERTIES_TAB = 'properties'
  static FILES_TAB = 'files'
  static DESCRIPTION_TAB = 'description'
  static QUICKLOOK_TAB = 'quicklook'

  state = {
    isDocument: false,
    isDataObject: false,
    isDataset: false,
    isCollection: false,
    hasQuicklook: false,
    hasDescription: false,
  }

  componentWillMount() {
    this.updateEntityType(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (get(this.props.entity, 'content.entityType') !== get(nextProps.entity, 'content.entityType')) {
      this.updateEntityType(nextProps)
    }
  }

  updateEntityType = (props) => {
    const isDocument = get(props.entity, 'content.entityType') === ENTITY_TYPES_ENUM.DOCUMENT
    const isDataset = get(props.entity, 'content.entityType') === ENTITY_TYPES_ENUM.DATASET
    const isCollection = get(props.entity, 'content.entityType') === ENTITY_TYPES_ENUM.COLLECTION
    const isDataObject = get(props.entity, 'content.entityType') === ENTITY_TYPES_ENUM.DATA
    const hasQuicklook = has(props.entity, 'content.files.QUICKLOOK_SD[0]') &&
      has(props.entity, 'content.files.QUICKLOOK_SD[0].imageWidth') && has(props.entity, 'content.files.QUICKLOOK_SD[0].imageHeight')

    const hasDescription = !isEmpty(get(props.entity, 'content.descriptionFile', {}))
    this.setState({
      isDocument,
      isDataObject,
      isDataset,
      isCollection,
      hasQuicklook,
      hasDescription,
    })
  }

  /**
   * Overrides MUI tab rendering: forbig showing the tab if not selected (by default MUI use display:hidden,
   * but it breaks with flex layout, as flex ignores hidden parameter)
   */
  renderTab = props => props.selected ? props.children : null

  renderTabs = () => {
    const {
      entity, onSearchTag, downloadDescriptionClient, fetchModelAttributesActions,
      fetchModelAttributesSelectors, levelActions, levelSelectors,
    } = this.props
    const {
      isDocument,
      isDataObject,
      isCollection,
      isDataset,
      hasQuicklook,
      hasDescription,
    } = this.state

    const result = [(
      <Tab
        key="properties"
        label={this.context.intl.formatMessage({ id: 'entities.common.properties.tabs' })}
        value={DescriptionLevelActions.TABS_ENUM.PROPERTIES}
      >
        <PropertiesTabComponent
          entity={entity}
          onSearchTag={onSearchTag}
          fetchModelAttributesActions={fetchModelAttributesActions}
          fetchModelAttributesSelectors={fetchModelAttributesSelectors}
          levelActions={levelActions}
          levelSelectors={levelSelectors}
        />
      </Tab>)]
    if ((isDataset || isCollection) && hasDescription) {
      result.push(
        <Tab
          key="description"
          label={this.context.intl.formatMessage({ id: 'entities.common.description.tabs' })}
          value={DescriptionLevelActions.TABS_ENUM.DESCRIPTION}
        >
          <DescriptionFileContainer
            entity={entity}
            downloadDescriptionClient={downloadDescriptionClient}
          />
        </Tab>,
      )
    } else if (isDocument) {
      result.push(
        <Tab
          key="files"
          label={this.context.intl.formatMessage({ id: 'entities.common.files.tabs' })}
          value={DescriptionLevelActions.TABS_ENUM.FILES}
        >
          <DocumentFilesContainer
            entity={entity}
          />
        </Tab>)
    } else if (isDataObject && hasQuicklook) {
      result.push(
        <Tab
          key="quicklook"
          label={this.context.intl.formatMessage({ id: 'entities.common.quicklook.tabs' })}
          value={DescriptionLevelActions.TABS_ENUM.QUICKLOOK}
        >
          <DataQuicklookComponent
            entity={entity}
          />
        </Tab>)
    }
    return result
  }

  render() {
    const {
      open, onClose, levelActions, levelSelectors, changeTab, currentTab, ...otherDialogProperties
    } = this.props
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
            <div style={descriptionDialog.card.media.tabs.rootStyle} >
              <Tabs
                style={descriptionDialog.card.media.tabs.rootStyle}
                tabItemContainerStyle={descriptionDialog.card.media.tabs.tabItemContainerStyle}
                contentContainerStyle={descriptionDialog.card.media.tabs.contentContainerStyle}
                tabTemplate={this.renderTab}
                tabTemplateStyle={descriptionDialog.card.media.tabs.tabTemplateStyle}
                value={currentTab}
                onChange={changeTab}
              >
                {this.renderTabs()}
              </Tabs>
            </div>
          </CardMedia>
        </Card>
      </PositionedDialog >

    )
  }
}
export default EntityDescriptionComponent
