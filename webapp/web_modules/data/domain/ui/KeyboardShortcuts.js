/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Possible modifier states
 */
const MODIFIER_STATE = {
  PRESSED: 'PRESSED',
  NOT_PRESSED: 'NOT_PRESSED',
  ANY: 'ANY',
}

/**
 * Gathers all shortcuts and tools to handle them
 * @author Raphaël Mechali
 */
export class KeyboardShortcuts {
  /** All shortcuts. When omitting modifier, it is considered NOT_PRESSED */
  static ALL = {
  // user app
  // search pane related
    runSearch: {
      shortcuts: [{ key: 'Enter', ctrl: MODIFIER_STATE.ANY }],
    },
    closeSearch: {
      shortcuts: [{ key: 'Escape' }],
    },
    clearSearch: {
      shortcuts: [{ key: 'Backspace', ctrl: MODIFIER_STATE.PRESSED }, { key: 'Delete', ctrl: MODIFIER_STATE.PRESSED }],
    },
  }

  /**
   * Internal: computes if modifier in event matches expected modifier state
   * @param {boolean} eventModifier is modifier down in event
   * @param {String} modifier expected modifier state, one of MODIFIER_STATE value
   * @return {boolean} true when modifier state in event matches specified one
   */
  static matchModifier(eventModifier, modifier = MODIFIER_STATE.NOT_PRESSED) {
    switch (modifier) {
      case MODIFIER_STATE.PRESSED:
        return eventModifier
      case MODIFIER_STATE.NOT_PRESSED:
        return !eventModifier
      default:
      case MODIFIER_STATE.ANY:
        return true
    }
  }

  /**
   * Internal: computes if event matches a precise shortcut (key and modifiers)
   * @param {*} event event
   * @param {*} shortcut shortcut
   */
  static isShortcutEvent(event, {
    key, ctrl, alt, shift,
  }) {
    return key === event.key
    && KeyboardShortcuts.matchModifier(event.ctrlKey, ctrl)
    && KeyboardShortcuts.matchModifier(event.altKey, alt)
    && KeyboardShortcuts.matchModifier(event.shiftKey, shift)
  }

  /**
   * Computes if event matches a given shortcut definition
   * @param {*} event to test, as a standard JS event
   * @param {{shortcuts: [{key: String, ctrl: String, alt: String, shift: String}]}} shortcutDef (from KeyboardShortcuts.ALL)
   * @return {boolean} true if event is expected event shortcut as parameter
   */
  static matchEvent(event, shortcutDef) {
    return shortcutDef.shortcuts.some((shortcut) => KeyboardShortcuts.isShortcutEvent(event, shortcut))
  }
}
