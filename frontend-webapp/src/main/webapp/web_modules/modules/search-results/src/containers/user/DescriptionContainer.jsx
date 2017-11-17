/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { EntityDescriptionContainer } from '@regardsoss/entities-common'
import { Tag } from '../../models/navigation/Tag'
import downloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import { ModelAttributesActions, ModelAttributesSelectors } from '../../clients/ModelAttributeClient'
import { descriptionLevelActions, descriptionLevelSelectors } from '../../clients/DescriptionLevelClient'
import navigationContextActions from '../../models/navigation/NavigationContextActions'

/**
* Description adapter container (provides both styles and actions to common component)
*/
export class DescriptionContainer extends React.Component {

  static mapDispatchToProps = dispatch => ({
    dispatchAddSearchTag: tag => dispatch(navigationContextActions.addSearchTag(tag)),
  })

  static propTypes = {
    dispatchAddSearchTag: PropTypes.func.isRequired,
  }

  /**
   * On user search tag callback - packs the new tag into a Tag model and then dispatches action
   * @param descriptionTag description tag, as callback from tag selection in description component
   */
  onSearchTag = (descriptionTag) => {
    const { dispatchAddSearchTag } = this.props
    dispatchAddSearchTag(Tag.fromDescriptionTag(descriptionTag))
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
