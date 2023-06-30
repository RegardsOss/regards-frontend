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
import { MIME_TYPES } from '@regardsoss/mime-types'

/**
 * Supported mime types used by displayers
 * @author Théo Lasserre
 */

export const CODE_FILE_SUPPORTED_MIME_TYPES = [
  MIME_TYPES.CSS_MIME_TYPE,
  MIME_TYPES.JAVASCRIPT_MIME_TYPE,
  MIME_TYPES.JSON_MIME_TYPE,
  MIME_TYPES.XML_MIME_TYPE,
  MIME_TYPES.XML_TEXT_MIME_TYPE,
]

export const IMAGE_FILE_SUPPORTED_MIME_TYPES = [
  MIME_TYPES.JPEG_MIME_TYPE,
  MIME_TYPES.GIF_MIME_TYPE,
  MIME_TYPES.PNG_MIME_TYPE,
  MIME_TYPES.TIF_MIME_TYPE,
]

export const IFRAME_CONTENT_SUPPORTED_MIME_TYPES = [
  MIME_TYPES.TEXT,
  MIME_TYPES.HTML_MIME_TYPE,
  MIME_TYPES.PDF_MIME_TYPE,
  MIME_TYPES.XHTML_MIME_TYPE,
]

export const MARKDOWN_FILE_SUPPORTED_MIME_TYPES = [
  MIME_TYPES.MARKDOWN_MIME_TYPE,
  'text/x-markdown', // XXX This is a workaround for the wrong description MIME types provided at collections / dataset level
]

export const ALL_SUPPORTED_MIME_TYPES = [
  ...CODE_FILE_SUPPORTED_MIME_TYPES,
  ...IMAGE_FILE_SUPPORTED_MIME_TYPES,
  ...IFRAME_CONTENT_SUPPORTED_MIME_TYPES,
  ...MARKDOWN_FILE_SUPPORTED_MIME_TYPES,
]
