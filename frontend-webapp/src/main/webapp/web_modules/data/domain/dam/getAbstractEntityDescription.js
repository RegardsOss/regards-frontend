/**
 * LICENSE_PLACEHOLDER
 **/
import includes from 'lodash/includes'


function getAbstractEntityDescription(descriptionFileContent, descriptionUrl) {
  if (descriptionFileContent) {
    if (descriptionFileContent.type === 'application/pdf') {
      return { type: descriptionFileContent.type }
    }
    if (includes(descriptionFileContent.name.toLowerCase(), 'md')) {
      return { type: 'text/markdown' }
    }
    return { type: descriptionFileContent.type }
  }
  if (descriptionUrl) {
    return {
      url: descriptionUrl,
    }
  }
  return null
}

export default getAbstractEntityDescription
