/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'
import { CatalogEntity } from '@regardsoss/model'
import { DataManagement } from '@regardsoss/client'
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
    fetchModelAttributesActions: React.PropTypes.instanceOf(DataManagement.ModelAttributesAction).isRequired,
    fetchModelAttributesSelectors: React.PropTypes.instanceOf(BasicListSelectors).isRequired,
    downloadDescriptionClient: React.PropTypes.instanceOf(DownloadDescriptionClient).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      isDescriptionVisible, entity, onCloseDescription, downloadDescriptionClient,
      fetchModelAttributesActions, fetchModelAttributesSelectors,
    } = this.props
    const { moduleTheme: { user: { descriptionDialog } } } = this.context
    return (
      <DetailViewContainer
        open={isDescriptionVisible}
        entity={entity}
        dialogHeightPercent={descriptionDialog.heightPercent}
        dialogWidthPercent={descriptionDialog.widthPercent}
        onClose={onCloseDescription}
        fetchModelAttributesActions={fetchModelAttributesActions}
        fetchModelAttributesSelectors={fetchModelAttributesSelectors}
        downloadDescriptionClient={downloadDescriptionClient}
      />
    )
  }
}
export default Description
