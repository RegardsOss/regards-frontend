/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import PropertiesIcon from 'material-ui/svg-icons/action/view-list'
import DescriptionIcon from 'material-ui/svg-icons/action/description'
import DocumentsIcon from 'material-ui/svg-icons/file/folder'
import QuicklookIcon from 'material-ui/svg-icons/image/panorama'
import { CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { PositionedDialog } from '@regardsoss/components'
import { CatalogShapes } from '@regardsoss/shape'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import { DESCRIPTION_TABS, DESCRIPTION_TABS_ENUM, getAvailableTabs } from '../../model/DescriptionTabsEnum'
import DescriptionBreadcrumbContainer from '../../containers/user/breadcrumb/DescriptionBreadcrumbContainer'
import FilesContainer from '../../containers/user/files/FilesContainer'
import PropertiesTabComponent from './properties/PropertiesTabComponent'
import DataQuicklookComponent from './quicklook/DataQuicklookComponent'


/**
 * Main description module component. It show entity description view.
 * @author Raphaël Mechali
 */
class EntityDescriptionComponent extends React.Component {
  static propTypes = {
    // configuration
    moduleConf: ModuleConfiguration.isRequired,
    // description context
    currentTab: PropTypes.oneOf(DESCRIPTION_TABS),
    entity: CatalogShapes.Entity,
    // user auth info
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,

    // control callback
    onSearchTag: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onChangeTab: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Default type configuration (to be used when there is no entity)
   */
  static DEFAULT_TYPE_CONFIGURATION = {
    showDescription: true,
    showTags: true,
    showLinkedDocuments: true,
    showThumbnail: false,
    groups: [],
  }

  /**
   * @return {DescriptionConfiguration} configuration for current entity (or default configuration)
   */
  getCurrentEntityConfiguration = () => {
    const { entity, moduleConf } = this.props
    if (entity) {
      const { entityType } = entity.content
      return moduleConf[entityType]
    }
    return EntityDescriptionComponent.DEFAULT_TYPE_CONFIGURATION
  }

  /**
   * Overrides MUI tab rendering: forbig showing the tab if not selected (by default MUI use display:hidden,
   * but it breaks with flex layout, as flex ignores hidden parameter)
   */
  renderTab = props => props.selected ? props.children : null


  /**
   * @return {React.Element} rendered properties tab
   */
  renderPropertiesTab = () => {
    const {
      entity, onSearchTag, moduleConf, accessToken, projectName,
    } = this.props
    const { formatMessage } = this.context.intl
    const currentEntityConfiguration = this.getCurrentEntityConfiguration()
    return (
      <Tab
        key="properties"
        icon={<PropertiesIcon />}
        label={formatMessage({ id: 'module.description.properties.tabs' })}
        value={DESCRIPTION_TABS_ENUM.PROPERTIES}
      >
        <PropertiesTabComponent
          accessToken={accessToken}
          projectName={projectName}
          moduleConf={moduleConf}
          typeConfiguration={currentEntityConfiguration}
          entity={entity}
          onSearchTag={onSearchTag}
        />
      </Tab>)
  }

  /**
   * @return {React.Element} rendered description tab
   */
  renderDescriptionTab = () => {
    const { entity, accessToken, projectName } = this.props
    const { formatMessage } = this.context.intl
    return (
      <Tab
        key="description"
        icon={<DescriptionIcon />}
        label={formatMessage({ id: 'module.description.description.tabs' })}
        value={DESCRIPTION_TABS_ENUM.DESCRIPTION}
      >
        <FilesContainer
          entity={entity}
          fileType={CommonDomain.DataTypesEnum.DESCRIPTION}
          accessToken={accessToken}
          projectName={projectName}
        />
      </Tab>)
  }

  /**
   * @return {React.Element} rendered document files tab
   */
  renderDocumentFilesTab = () => {
    const { entity, accessToken, projectName } = this.props
    const { formatMessage } = this.context.intl
    return (
      <Tab
        key="documents"
        icon={<DocumentsIcon />}
        label={formatMessage({ id: 'module.description.files.tabs' })}
        value={DESCRIPTION_TABS_ENUM.FILES}
      >
        <FilesContainer
          entity={entity}
          fileType={CommonDomain.DataTypesEnum.DOCUMENT}
          accessToken={accessToken}
          projectName={projectName}
        />
      </Tab>)
  }

  /**
   * @return {React.Element} rendered quicklook tab
   */
  renderQuicklookTab = () => {
    const { entity, accessToken, projectName } = this.props
    const { formatMessage } = this.context.intl
    return (
      <Tab
        key="quicklook"
        icon={<QuicklookIcon />}
        label={formatMessage({ id: 'module.description.quicklook.tabs' })}
        value={DESCRIPTION_TABS_ENUM.QUICKLOOK}
      >
        <DataQuicklookComponent
          entity={entity}
          accessToken={accessToken}
          projectName={projectName}
        />
      </Tab>
    )
  }

  render() {
    const {
      currentTab, entity, onChangeTab, onClose, ...otherDialogProperties
    } = this.props
    const { moduleTheme: { descriptionDialog } } = this.context
    const actions = [<FlatButton
      key="close.button"
      label={this.context.intl.formatMessage({ id: 'module.description.close.button' })}
      onClick={onClose}
    />]
    const availableTabs = getAvailableTabs(entity)
    return (
      <PositionedDialog
        open={!!entity}
        dialogHeightPercent={descriptionDialog.heightPercent}
        dialogWidthPercent={descriptionDialog.widthPercent}
        onRequestClose={onClose}
        bodyStyle={descriptionDialog.body}
        actions={actions}
        {...otherDialogProperties}
      >
        <Card style={descriptionDialog.card.style} containerStyle={descriptionDialog.card.containerStyle}>
          <CardTitle
            title={<DescriptionBreadcrumbContainer />}
            style={descriptionDialog.card.titleStyle}
          />
          <CardMedia style={descriptionDialog.card.media.rootStyle} mediaStyle={descriptionDialog.card.media.mediaStyle}>
            <div style={descriptionDialog.card.media.tabs.rootStyle} >
              <Tabs
                style={descriptionDialog.card.media.tabs.rootStyle}
                tabItemContainerStyle={descriptionDialog.card.media.tabs.tabItemContainerStyle}
                contentContainerStyle={descriptionDialog.card.media.tabs.contentContainerStyle}
                tabTemplate={this.renderTab}
                tabTemplateStyle={descriptionDialog.card.media.tabs.tabTemplateStyle}
                value={currentTab}
                onChange={onChangeTab}
              >
                {
                  availableTabs.map((tabType) => {
                    switch (tabType) {
                      case DESCRIPTION_TABS_ENUM.PROPERTIES:
                        return this.renderPropertiesTab()
                      case DESCRIPTION_TABS_ENUM.DESCRIPTION:
                        return this.renderDescriptionTab()
                      case DESCRIPTION_TABS_ENUM.FILES:
                        return this.renderDocumentFilesTab()
                      case DESCRIPTION_TABS_ENUM.QUICKLOOK:
                        return this.renderQuicklookTab()
                      default:
                        throw new Error(`Unknown tab type ${tabType}`)
                    }
                  })
                }
              </Tabs>
            </div>
          </CardMedia>
        </Card>
      </PositionedDialog >

    )
  }
}
export default EntityDescriptionComponent
