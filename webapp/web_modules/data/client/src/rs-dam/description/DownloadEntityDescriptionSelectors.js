/**
* LICENSE_PLACEHOLDER
**/
import { BasicSignalSelectors } from '@regardsoss/store-utils'

export default class DownloadEntityDescriptionSelectors extends BasicSignalSelectors {
  /**
   * Returns downloaded file content. Fails if there is not download result
   * @return file content
   */
  getFileContent = state => this.getResult(state).fileContent
}
