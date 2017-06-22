/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleThemeProvider } from '@regardsoss/modules'
import { CatalogShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import DownloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import DescriptionLevelActions from '../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../model/description/DescriptionLevelSelectors'
import EntityDescriptionComponent from '../../components/description/EntityDescriptionComponent'
import styles from '../../styles/styles'

/** Render constant: module syles  */
const MODULE_STYLES = { styles }

/**
* Entity description container: Resolves the current entity in navigation context
*/
export class EntityDescriptionContainer extends React.Component {

  static mapStateToProps = (state, { levelSelectors }) => ({
    // currently shown entity resolution
    shownEntity: levelSelectors.getShownEntity(state),
  })

  static mapDispatchToProps = (dispatch, { fetchModelAttributesActions, downloadDescriptionClient, levelActions }) => ({
    onClose: () => dispatch(levelActions.hide()),
  })

  static propTypes = {
    // Callback to run a new search with given tag
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
    shownEntity: CatalogShapes.Entity, // entity shown or null

    // from mapDispatchToProps
    onClose: PropTypes.func.isRequired,
  }

  render() {
    const { shownEntity, onClose,
      downloadDescriptionClient, fetchModelAttributesActions, fetchModelAttributesSelectors,
      levelActions, levelSelectors } = this.props
    return (
      <I18nProvider messageDir="business-common/entities-common/src/i18n">
        <ModuleThemeProvider module={MODULE_STYLES}>
          <EntityDescriptionComponent
            entity={shownEntity}
            open={!!shownEntity}

            downloadDescriptionClient={downloadDescriptionClient}
            fetchModelAttributesActions={fetchModelAttributesActions}
            fetchModelAttributesSelectors={fetchModelAttributesSelectors}
            levelActions={levelActions}
            levelSelectors={levelSelectors}

            onSearchTag={this.props.onSearchTag}
            onClose={onClose}
          />
        </ModuleThemeProvider>
      </I18nProvider>
    )
  }
}
export default connect(
  EntityDescriptionContainer.mapStateToProps,
  EntityDescriptionContainer.mapDispatchToProps)(EntityDescriptionContainer)
