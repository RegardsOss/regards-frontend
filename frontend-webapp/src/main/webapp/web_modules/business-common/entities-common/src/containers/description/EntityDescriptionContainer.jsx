/**
* LICENSE_PLACEHOLDER
**/
import flow from 'lodash/flow'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { CatalogShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
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
  })

  static mapDispatchToProps = (dispatch, { fetchModelAttributesActions, downloadDescriptionClient, levelActions }) => ({
    onClose: () => dispatch(levelActions.hide()),
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
    shownEntity: CatalogShapes.Entity, // entity shown or null

    // from mapDispatchToProps
    onClose: PropTypes.func.isRequired,
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
      shownEntity, onClose, downloadDescriptionClient, onSearchTag,
      fetchModelAttributesActions, fetchModelAttributesSelectors, levelActions, levelSelectors,
    } = this.props
    return (
      <EntityDescriptionComponent
        entity={shownEntity}
        open={!!shownEntity}

        downloadDescriptionClient={downloadDescriptionClient}
        fetchModelAttributesActions={fetchModelAttributesActions}
        fetchModelAttributesSelectors={fetchModelAttributesSelectors}
        levelActions={levelActions}
        levelSelectors={levelSelectors}

        onSearchTag={onSearchTag ? this.onSearchTag : null}
        onClose={onClose}
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
