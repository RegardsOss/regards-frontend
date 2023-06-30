/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import some from 'lodash/some'
import includes from 'lodash/includes'
import {
  ALL_SUPPORTED_MIME_TYPES, CODE_FILE_SUPPORTED_MIME_TYPES, IFRAME_CONTENT_SUPPORTED_MIME_TYPES,
  IMAGE_FILE_SUPPORTED_MIME_TYPES, MARKDOWN_FILE_SUPPORTED_MIME_TYPES,
} from './DisplaySupportedMimeTypes'

/**
 * Helper for displayers
 * (CodeFileDisplayer, ImageFileDisplayer, IFrameURLContantDisplayer, MarkdownFileContentDisplayer)
 *
 * @author Théo Lasserre
 */
export class DisplayHelpers {
  static isSupportedContentType(contentType, mimeTypeList) {
    if (contentType && mimeTypeList) {
      const lowerContentType = contentType.toLowerCase()
      return some(mimeTypeList, (mimeType) => includes(lowerContentType, mimeType))
    }
    return false
  }

  static isCodeMimeType(contentType) {
    return DisplayHelpers.isSupportedContentType(contentType, CODE_FILE_SUPPORTED_MIME_TYPES)
  }

  static isIFrameMimeType(contentType) {
    return DisplayHelpers.isSupportedContentType(contentType, IFRAME_CONTENT_SUPPORTED_MIME_TYPES)
  }

  static isImageMimeType(contentType) {
    return DisplayHelpers.isSupportedContentType(contentType, IMAGE_FILE_SUPPORTED_MIME_TYPES)
  }

  static isMarkdownMimeType(contentType) {
    return DisplayHelpers.isSupportedContentType(contentType, MARKDOWN_FILE_SUPPORTED_MIME_TYPES)
  }

  static isFileMimeType(contentType) {
    return DisplayHelpers.isSupportedContentType(contentType, ALL_SUPPORTED_MIME_TYPES)
  }
}
