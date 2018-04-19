/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonShapes } from '@regardsoss/shape'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../domain/NavigationItemTypes'
import { HOME_ICON_TYPES } from '../domain/HomeIconType'


/** A module as edited in module form */
const EditionModule = PropTypes.shape({
  id: PropTypes.number.isRequired, // external module id
  type: PropTypes.oneOf([NAVIGATION_ITEM_TYPES_ENUM.MODULE]).isRequired,
})

/*
 * Note: recursive structure will work here (lazy loading hack is failing validation) therefore,
 * we assert section items have children!
 */
const basicEditionSectionFields = {
  id: PropTypes.number.isRequired, // local section id
  type: PropTypes.oneOf([NAVIGATION_ITEM_TYPES_ENUM.SECTION]).isRequired,
  icon: PropTypes.shape({
    type: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES).isRequired,
    url: PropTypes.string,
  }).isRequired,
  title: PropTypes.objectOf(PropTypes.string).isRequired, // title, where key are locales
}

export const EditionSection = PropTypes.shape({
  ...basicEditionSectionFields,
  // only first level will be correctly validated
  children: PropTypes.arrayOf(PropTypes.oneOfType([
    EditionModule, PropTypes.shape({
      ...basicEditionSectionFields,
    })])).isRequired,
})

/** A navigation item */
export const NavigationEditionItem = PropTypes.oneOfType([EditionModule, EditionSection])

export const HomeConfigurationShape = PropTypes.shape({
  icon: PropTypes.shape({
    type: PropTypes.oneOf(HOME_ICON_TYPES).isRequired,
    url: PropTypes.string,
  }),
  // title as a map of locale to label
  title: PropTypes.objectOf(PropTypes.string),
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
})