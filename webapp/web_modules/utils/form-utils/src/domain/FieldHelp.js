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

/**
 * Holds field help content definitions
 * @author Raphaël Mechali
 */
export class FieldHelp {
  /** Possible content types */
  static CONTENT_TYPES = {
    /** A simple help box message  */
    MESSAGE: 'MESSAGE',
  }

  /**
   * Builds a dialog message help content
   * @param {string} messageKey as listed in intl file (current context, mandatory)
   * @param {string} messageKey as listed in intl file (current context, optional)
   * @return {*} matching HelpContent.DialogMessageHelpContent
   */
  static buildDialogMessageHelp(messageKey, titleKey) {
    return {
      contentType: FieldHelp.CONTENT_TYPES.MESSAGE,
      titleKey,
      messageKey,
    }
  }
}
