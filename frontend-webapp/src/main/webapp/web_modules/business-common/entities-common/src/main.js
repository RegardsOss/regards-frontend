/**
 * LICENSE_PLACEHOLDER
 **/
import DownloadDescriptionClient from './clients/DownloadDescriptionClient'
import DescriptionLevelActions from './model/description/DescriptionLevelActions'
import getDescriptionLevelReducer from './model/description/DescriptionLevelReducer'
import getDescriptionLevelSelectors from './model/description/DescriptionLevelSelectors'
import EntityDescriptionContainer from './containers/description/EntityDescriptionContainer'

export default {
  DownloadDescriptionClient,
  EntityDescriptionContainer,
  descriptionLevelModel: {
    DescriptionLevelActions,
    getDescriptionLevelReducer,
    getDescriptionLevelSelectors,
  },
}
