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
import flow from 'lodash/flow'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { CatalogShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import { AuthenticationParametersSelectors, AuthenticationClient } from '@regardsoss/authentication-utils'
import DownloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import DescriptionLevelActions from '../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../model/description/DescriptionLevelSelectors'
import EntityDescriptionComponent from '../../components/description/EntityDescriptionComponent'
import styles from '../../styles/styles'
import messages from '../../i18n'

/** Render constant: module syles  */
const MODULE_STYLES = { styles }

/**
* Entity description container: Resolves the current entity in navigation context
*/
export class EntityDescriptionContainer extends React.Component {
  static mapStateToProps = (state, { levelSelectors }) => ({
    // currently shown entity resolution
    shownEntity: levelSelectors.getShownEntity(state),
    currentTab: levelSelectors.getCurrentTab(state),
    // user auth info
    accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
    projectName: AuthenticationParametersSelectors.getProject(state),
  })

  static mapDispatchToProps = (dispatch, { fetchModelAttributesActions, downloadDescriptionClient, levelActions }) => ({
    onClose: () => dispatch(levelActions.hide()),
    changeTab: tab => dispatch(levelActions.changeTab(tab)),
  })

  static propTypes = {
    // Callback to run a new search with given tag like ({@regardoss/shape/catalog/Tag} tag) => void
    onSearchTag: PropTypes.func,
    // required clients to fetch entity data and description
    fetchModelAttributesActions: PropTypes.instanceOf(DataManagementClient.ModelAttributesActions).isRequired,
    fetchModelAttributesSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    // required client for description level state
    levelActions: PropTypes.instanceOf(DescriptionLevelActions).isRequired,
    levelSelectors: PropTypes.instanceOf(DescriptionLevelSelectors).isRequired,
    // required client for file description download
    downloadDescriptionClient: PropTypes.instanceOf(DownloadDescriptionClient).isRequired,

    // from mapStateToProps
    currentTab: PropTypes.string.isRequired,
    shownEntity: CatalogShapes.Entity, // entity shown or null
    //auth info
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,

    // from mapDispatchToProps
    onClose: PropTypes.func.isRequired,
    changeTab: PropTypes.func.isRequired,
  }

  /**
   * Local on search tag implementation: closes the description dialog when user searches a tag
   * @note: this method must be called with onSearchTag method only
   * @param tag searched tag
   */
  onSearchTag = (tag) => {
    const { onSearchTag, onClose } = this.props
    onSearchTag(tag)
    onClose()
  }

  render() {
    const {
      shownEntity, onClose, downloadDescriptionClient, onSearchTag, changeTab, currentTab,
      fetchModelAttributesActions, fetchModelAttributesSelectors, levelActions, levelSelectors,
      accessToken, projectName,
    } = this.props
    return (
      <EntityDescriptionComponent
        entity={shownEntity}
        open={!!shownEntity}
        currentTab={currentTab}
        accessToken={accessToken}
        projectName={projectName}

        downloadDescriptionClient={downloadDescriptionClient}
        fetchModelAttributesActions={fetchModelAttributesActions}
        fetchModelAttributesSelectors={fetchModelAttributesSelectors}
        levelActions={levelActions}
        levelSelectors={levelSelectors}

        onSearchTag={onSearchTag ? this.onSearchTag : null}
        onClose={onClose}
        changeTab={changeTab}
      />
    )
  }
}

export default flow(
  withModuleStyle(MODULE_STYLES),
  withI18n(messages),
  connect(
    EntityDescriptionContainer.mapStateToProps,
    EntityDescriptionContainer.mapDispatchToProps,
  ),
)(EntityDescriptionContainer)
