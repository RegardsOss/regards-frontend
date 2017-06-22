/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
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
  })

  static propTypes = {
    dispatchOnSearchTag: PropTypes.func.isRequired,
  }


  render() {
    const { dispatchOnSearchTag } = this.props
    return (
      <EntityDescriptionContainer
        levelActions={descriptionLevelActions}
        levelSelectors={descriptionLevelSelectors}
        onSearchTag={dispatchOnSearchTag}
        fetchModelAttributesActions={ModelAttributesActions}
        fetchModelAttributesSelectors={ModelAttributesSelectors}
        downloadDescriptionClient={downloadDescriptionClient}
      />
    )
  }
}
export default connect(null, DescriptionContainer.mapDispatchToProps)(DescriptionContainer)
