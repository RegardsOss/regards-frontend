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
import metadatav1 from '../definitions/metadatav1'

/**
 * Metadata shape definitions
 */

export const Editor = PropTypes.oneOfType([
  // text editor
  PropTypes.shape({
    type: PropTypes.oneOf([metadatav1.editorTypes.text]).isRequired,
  }),
  // multiline text editor
  PropTypes.shape({
    type: PropTypes.oneOf([metadatav1.editorTypes.multilineText]).isRequired,
  }),
  // choice editor
  PropTypes.shape({
    type: PropTypes.oneOf([metadatav1.editorTypes.choice]).isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      labelKey: PropTypes.string.isRequired,
    })).isRequired,
  }),
])

export const Metadata = PropTypes.shape({
  key: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  mandatory: PropTypes.bool.isRequired,
  onlyAtRegistration: PropTypes.bool.isRequired,
  currentValue: PropTypes.string, // current value if any
  editor: Editor,
})

export const MetadataList = PropTypes.arrayOf(Metadata)
