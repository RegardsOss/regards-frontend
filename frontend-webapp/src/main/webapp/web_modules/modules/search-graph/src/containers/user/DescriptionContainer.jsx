/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { CatalogEntity } from '@regardsoss/model'
import graphContextActions from '../../model/graph/GraphContextActions'
import graphContextSelectors from '../../model/graph/GraphContextSelectors'
import downloadDescriptionClient from '../../model/client/DownloadDescriptionClient'
import { modelAttributesAction, modelAttributesSelector } from '../../model/client/ModelAttributeClient'
import Description from '../../components/user/Description'

/**
* Entity description container
*/
export class DescriptionContainer extends React.Component {

  static mapStateToProps = state => ({
    isDescriptionVisible: graphContextSelectors.isDescriptionVisible(state),
    entity: graphContextSelectors.getDescriptionEntity(state),
  })

  static mapDispatchToProps = dispatch => ({
    hideDescription: () => dispatch(graphContextActions.hideDescription()),
  })

  static propTypes = {
    // from mapStateToProps
    isDescriptionVisible: React.PropTypes.bool.isRequired,
    entity: CatalogEntity,
    // from mapDispatchToProps
    hideDescription: React.PropTypes.func.isRequired,
  }

  onCloseDescription = () => this.props.hideDescription()

  render() {
    const { isDescriptionVisible, entity } = this.props
    return (
      <Description
        isDescriptionVisible={isDescriptionVisible}
        entity={entity}
        onCloseDescription={this.onCloseDescription}
        downloadDescriptionClient={downloadDescriptionClient}
        fetchModelAttributesActions={modelAttributesAction}
        fetchModelAttributesSelectors={modelAttributesSelector}
      />
    )
  }
}


export default connect(
  DescriptionContainer.mapStateToProps,
  DescriptionContainer.mapDispatchToProps)(DescriptionContainer)
