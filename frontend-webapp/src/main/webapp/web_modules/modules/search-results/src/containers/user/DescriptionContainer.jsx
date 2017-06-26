/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { TagTypes } from '@regardsoss/domain/catalog'
import { EntityDescriptionContainer } from '@regardsoss/entities-common'
import downloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import { ModelAttributesActions, ModelAttributesSelectors } from '../../clients/ModelAttributeClient'
import { descriptionLevelActions, descriptionLevelSelectors } from '../../models/description/DescriptionLevelModel'
import navigationContextActions from '../../models/navigation/NavigationContextActions'

/**
* Description adapter container (provides both styles and actions to common component)
*/
export class DescriptionContainer extends React.Component {

  static mapDispatchToProps = dispatch => ({
    dispatchOnSearchTag: tag => dispatch(navigationContextActions.changeSearchTag(tag)),
    dispatchOnSearchDataset: dataset => dispatch(navigationContextActions.changeDataset(dataset)),
  })

  static propTypes = {
    dispatchOnSearchTag: PropTypes.func.isRequired,
    dispatchOnSearchDataset: PropTypes.func.isRequired,
  }

  onSearchTag = (tag) => {
    const { dispatchOnSearchTag, dispatchOnSearchDataset } = this.props
    switch (tag.type) {
      case TagTypes.WORD:
        dispatchOnSearchTag(tag.data) // data is a simple word
        break
      case TagTypes.DATASET:
        dispatchOnSearchDataset(tag.data) // data is an entity
        break
      default:
        // data is an entity but unused here
        dispatchOnSearchTag(tag.data.content.ipId)
    }
  }

  render() {
    return (
      <EntityDescriptionContainer
        levelActions={descriptionLevelActions}
        levelSelectors={descriptionLevelSelectors}
        onSearchTag={this.onSearchTag}
        fetchModelAttributesActions={ModelAttributesActions}
        fetchModelAttributesSelectors={ModelAttributesSelectors}
        downloadDescriptionClient={downloadDescriptionClient}
      />
    )
  }
}
export default connect(null, DescriptionContainer.mapDispatchToProps)(DescriptionContainer)
