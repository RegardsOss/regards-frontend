/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { EntityDescriptionContainer } from '@regardsoss/entities-common'
import downloadDescriptionClient from '../../model/clients/DownloadDescriptionClient'
import { ModelAttributesActions, ModelAttributesSelectors } from '../../model/clients/ModelAttributeClient'
import { descriptionLevelActions, descriptionLevelSelectors } from '../../model/description/DescriptionLevelModel'

/**
* Entity description container
*/
export class DescriptionContainer extends React.Component {

  render() {
    return (
      <EntityDescriptionContainer
        levelActions={descriptionLevelActions}
        levelSelectors={descriptionLevelSelectors}
        fetchModelAttributesActions={ModelAttributesActions}
        fetchModelAttributesSelectors={ModelAttributesSelectors}
        downloadDescriptionClient={downloadDescriptionClient}
      />
    )
  }
}


export default connect(null, null)(DescriptionContainer)
