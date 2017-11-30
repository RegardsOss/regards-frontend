/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { EntityDescriptionContainer } from '@regardsoss/entities-common'
import downloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import { ModelAttributesActions, ModelAttributesSelectors } from '../../clients/ModelAttributeClient'
import { descriptionLevelActions, descriptionLevelSelectors } from '../../model/description/DescriptionLevelModel'
import graphContextActions from '../../model/graph/GraphContextActions'

/**
* Entity description container
*/
export class DescriptionContainer extends React.Component {
  static mapDispatchToProps(dispatch) {
    return {
      dispatchSearchTag: tag => dispatch(graphContextActions.setSearchTag(tag)),
    }
  }

  static propTypes = {
    dispatchSearchTag: PropTypes.func.isRequired,
  }

  render() {
    const { dispatchSearchTag } = this.props
    return (
      <EntityDescriptionContainer
        levelActions={descriptionLevelActions}
        levelSelectors={descriptionLevelSelectors}
        fetchModelAttributesActions={ModelAttributesActions}
        fetchModelAttributesSelectors={ModelAttributesSelectors}
        downloadDescriptionClient={downloadDescriptionClient}
        onSearchTag={dispatchSearchTag}
      />
    )
  }
}


export default connect(null, DescriptionContainer.mapDispatchToProps)(DescriptionContainer)
