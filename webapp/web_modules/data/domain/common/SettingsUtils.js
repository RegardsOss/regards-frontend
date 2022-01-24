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

import find from 'lodash/find'
import some from 'lodash/some'
import isEqual from 'lodash/isEqual'

function getSetting(settings, settingName) {
  return find(settings, (setting) => setting.content.name === settingName)
}

function getValue(settings, settingName) {
  const settingFound = getSetting(settings, settingName)
  return settingFound ? settingFound.content.value : null
}

function isLinkAvailable(settings, settingName, linkName) {
  const settingFound = getSetting(settings, settingName)
  return settingFound && some(settingFound.links, (link) => link.rel === linkName)
}

function isDisabled(settings, settingName) {
  return !isLinkAvailable(settings, settingName, 'update')
}

function getUpdatedSettingValue(settings, settingName, newSettingValue) {
  return {
    ...getSetting(settings, settingName).content,
    value: newSettingValue,
  }
}

function isDefaultValue(settings, settingName, formValue) {
  const settingFound = getSetting(settings, settingName)
  return !(settingFound && isEqual(settingFound.content.defaultValue, formValue))
}

export default {
  getSetting,
  getValue,
  isDisabled,
  getUpdatedSettingValue,
  isDefaultValue,
}
