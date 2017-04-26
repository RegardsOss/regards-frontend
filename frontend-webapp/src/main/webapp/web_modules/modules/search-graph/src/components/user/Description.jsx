/**
* LICENSE_PLACEHOLDER
**/
import { CatalogEntity } from '@regardsoss/model'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import { DownloadDescriptionClient, DetailViewContainer } from '@regardsoss/entities-common'

/**
* Shows entity description
*/
class Description extends React.Component {

  static propTypes = {
    // description state
    isDescriptionVisible: React.PropTypes.bool.isRequired,
    entity: CatalogEntity,
    // sub containers actions / selectors
    onCloseDescription: React.PropTypes.func.isRequired,
    fetchModelAttributesActions: React.PropTypes.instanceOf(DataManagementClient.ModelAttributesActions).isRequired,
    fetchModelAttributesSelectors: React.PropTypes.instanceOf(BasicListSelectors).isRequired,
    downloadDescriptionClient: React.PropTypes.instanceOf(DownloadDescriptionClient).isRequired,
  }

  render() {
    const {
      isDescriptionVisible, entity, onCloseDescription, downloadDescriptionClient,
      fetchModelAttributesActions, fetchModelAttributesSelectors,
    } = this.props
    return (
      <DetailViewContainer
        open={isDescriptionVisible}
        entity={entity}
        onClose={onCloseDescription}
        fetchModelAttributesActions={fetchModelAttributesActions}
        fetchModelAttributesSelectors={fetchModelAttributesSelectors}
        downloadDescriptionClient={downloadDescriptionClient}
      />
    )
  }
}
export default Description
