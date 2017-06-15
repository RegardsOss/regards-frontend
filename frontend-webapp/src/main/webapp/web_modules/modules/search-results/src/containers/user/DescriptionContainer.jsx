/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { EntityDescriptionContainer } from '@regardsoss/entities-common'
import downloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import { ModelAttributesActions, ModelAttributesSelectors } from '../../clients/ModelAttributeClient'
import { descriptionLevelActions, descriptionLevelSelectors } from '../../models/description/DescriptionLevelModel'

/**
* Description adapter container (provides both styles and actions to common component)
*/
class DescriptionContainer extends React.Component {

  render() {
    return (
      <EntityDescriptionContainer
        levelActions={descriptionLevelActions}
        levelSelectors={descriptionLevelSelectors}
        onSearchTag={() => { console.error('BIG TODO') }}
        fetchModelAttributesActions={ModelAttributesActions}
        fetchModelAttributesSelectors={ModelAttributesSelectors}
        downloadDescriptionClient={downloadDescriptionClient}
      />
    )
  }
}
export default connect(null, null)(DescriptionContainer)
