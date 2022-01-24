/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { AdminShapes, CommonShapes, UIShapes } from '@regardsoss/shape'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../domain/NavigationItemTypes'
import { VISIBILITY_MODES } from '../domain/VisibilityModes'
import { HOME_ICON_TYPES } from '../domain/HomeIconType'

/**
* Shape for module configuration created/saved by admin part of the module an read by the user part of the module
* @author Raphaël Mechali
* @author Théo Lasserre
 */
/** Fields that are common to module and section items */
const commonItemsFields = {
  id: PropTypes.number.isRequired, // external module id
  visibilityMode: PropTypes.oneOf(VISIBILITY_MODES).isRequired,
  visibleForRole: PropTypes.string, // provided only when mode is FOR_ROLE
}

/** A module as edited in module form */
const EditionModule = PropTypes.shape({
  ...commonItemsFields,
  type: PropTypes.oneOf([NAVIGATION_ITEM_TYPES_ENUM.MODULE]).isRequired,
})

/*
 * Note: recursive structure will work here (lazy loading hack is failing validation) therefore,
 * we assert section items have children!
 */
const basicEditionFields = {
  ...commonItemsFields,
  type: PropTypes.oneOf([NAVIGATION_ITEM_TYPES_ENUM.SECTION, NAVIGATION_ITEM_TYPES_ENUM.LINK]).isRequired,
  icon: PropTypes.shape({
    type: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES).isRequired,
    url: PropTypes.string,
  }).isRequired,
  title: UIShapes.IntlMessage.isRequired,
}

/** A link as edited in link form */
export const EditionLink = PropTypes.shape({
  ...basicEditionFields,
  url: PropTypes.string.isRequired,
})

export const EditionSection = PropTypes.shape({
  ...basicEditionFields,
  // only first level will be correctly validated
  children: PropTypes.arrayOf(PropTypes.oneOfType([
    EditionModule, PropTypes.shape({
      ...basicEditionFields,
    })])).isRequired,
})

/** A navigation item */
export const NavigationEditionItem = PropTypes.oneOfType([EditionModule, EditionSection, EditionLink])

export const HomeConfigurationShape = PropTypes.shape({
  icon: PropTypes.shape({
    type: PropTypes.oneOf(HOME_ICON_TYPES).isRequired,
    url: PropTypes.string,
  }),
  // title as a map of locale to label
  title: UIShapes.IntlMessage,
})

export const ModuleConfiguration = PropTypes.shape({
  displayMode: PropTypes.oneOf(UIDomain.MENU_DISPLAY_MODES),
  title: PropTypes.string,
  contacts: PropTypes.string,
  displayAuthentication: PropTypes.bool,
  displayCartSelector: PropTypes.bool,
  displayNotificationsSelector: PropTypes.bool,
  displayLocaleSelector: PropTypes.bool,
  displayThemeSelector: PropTypes.bool,
  projectAboutPage: CommonShapes.URL,
  home: HomeConfigurationShape,
  navigation: PropTypes.arrayOf(NavigationEditionItem),
  previewRole: PropTypes.string,
  roleList: AdminShapes.RoleList, // pre-fetched available role list for preview mode
})
