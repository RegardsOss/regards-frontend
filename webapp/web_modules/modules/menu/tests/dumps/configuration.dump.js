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
import { AccessDomain } from '@regardsoss/domain'
import { HOME_ICON_TYPES_ENUM } from '../../src/domain/HomeIconType'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../src/domain/NavigationItemTypes'
import { VISIBILITY_MODES_ENUM } from '../../src/domain/VisibilityModes'

/**
 * Holds shared configuration data for tests
 * @author Raphaël Mechali
 */

export const aNavigationConfiguration = [
  { // Home module
    id: 5,
    type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
    visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
  },
  { // first section
    id: 0,
    type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
    visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
    icon: {
      type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    },
    title: {
      en: 'First section',
      fr: 'Première section',
    },
    children: [{
      id: 3,
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
    },
    { // embedded second section
      id: 1,
      type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
      visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
      icon: {
        type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM,
        url: './cocorico.svg',
      },
      title: {
        en: 'Second section',
        fr: 'Seconde section',
      },
      children: [{
        id: 2,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
      },
      {
        id: 4,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
      },
      {
        id: 51,
        type: NAVIGATION_ITEM_TYPES_ENUM.LINK,
        visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
        icon: {
          type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM,
          url: './cocorico.svg',
        },
        title: {
          en: 'Third link',
          fr: 'Troisième lien',
        },
        url: '',
      }],
    },
    {
      id: 52,
      type: NAVIGATION_ITEM_TYPES_ENUM.LINK,
      visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
      icon: {
        type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM,
        url: './cocorico.svg',
      },
      title: {
        en: 'Third link',
        fr: 'Troisième lien',
      },
      url: '',
    }],
  },
  { // some root level module
    id: 6,
    type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
    visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
  },
  { // some empty section
    id: 49,
    type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
    visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
    icon: {
      type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.NONE,
    },
    title: {
      en: 'Third section',
      fr: 'Troisième section',
    },
    children: [],
  },
  { // some link
    id: 50,
    type: NAVIGATION_ITEM_TYPES_ENUM.LINK,
    visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
    icon: {
      type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM,
      url: './cocorico.svg',
    },
    title: {
      en: 'Third link',
      fr: 'Troisième lien',
    },
    url: '',
  },
]

export const anHomeConfiguration = {
  icon: {
    type: HOME_ICON_TYPES_ENUM.CUSTOM_URL_ICON,
    url: 'http://www.my-project.com/home-pic.svg',
  },
  title: {
    en: 'My project',
    fr: 'Mon projet',
  },
}

export const aModuleCompleteConfiguration = {
  // displayMode : set up at runtime
  contacts: 'hello-buddy@we-are-great.com',
  displayAuthentication: true,
  displayCartSelector: true,
  displayNotificationsSelector: true,
  displayLocaleSelector: true,
  displayThemeSelector: true,
  projectAboutPage: 'http://www.my-project.com/about.html',
  home: anHomeConfiguration,
  navigation: aNavigationConfiguration,
}
