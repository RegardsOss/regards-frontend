/**
* LICENSE_PLACEHOLDER
**/
import { BasicSignalActions } from '@regardsoss/store-utils'
import DownloadDescriptionDefinitions from './DownloadDescriptionDefinitions'


/**
 * Actions used to download an entity file description (parent, to be considered abstract).
 * Currently handles only markdown content
 */
export default class DownloadEntityDescriptionActions extends BasicSignalActions {

  constructor(objectType, namespacePrefix) {
    super({
      namespace: `${namespacePrefix}/${objectType}`,
      entityEndpoint: DownloadDescriptionDefinitions.getActionDownloadURL(objectType),
      headers: {
        Accept: DownloadDescriptionDefinitions.MARKDOWN_MIMETYPE, // application/octet-stream
      },
    })
  }

  downloadEntityDescription(id) {
    this.currentDownloadEntityId = id
    return this.sendSignal('GET', null, { id })
  }
  /**
   * Overriden to not parse as JSON content but as pure text
   * @param {*} res raw result
   */
  // eslint-disable-next-line class-methods-use-this
  buildResults(stream) {
    // asserted: char stream here, and not bytes!
    return stream.text().then(content => ({
      entityId: this.currentDownloadEntityId,
      contentType: DownloadDescriptionDefinitions.MARKDOWN_MIMETYPE,
      content,
    }))
  }

}
