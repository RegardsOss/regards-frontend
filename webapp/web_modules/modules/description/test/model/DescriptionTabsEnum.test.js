/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import { CommonDomain } from '@regardsoss/domain'
import { DESCRIPTION_TABS, DESCRIPTION_TABS_ENUM, getAvailableTabs } from '../../src/model/DescriptionTabsEnum'


describe('[Description] Test DescriptionTabsEnum', () => {
  it('should define enumeration, enumeration values and available tabs helper', () => {
    assert.isDefined(DESCRIPTION_TABS_ENUM, 'enum should be defined')
    assert.isDefined(DESCRIPTION_TABS, 'values should be defined')
    assert.isDefined(getAvailableTabs, 'available tabs helper should be defined')
  })
  it('should compute correctly available tabs list for a given entity files, taking in account online state and specific properties', () => {
    // 1 - entity has no quicklook, no description and no file (as it is not a document)
    const baseEntity = {
      content: {
        entityType: 'SOMETHING',
        descriptionFile: null,
        files: {},
      },
    }
    let allTabs = getAvailableTabs(baseEntity)
    assert.include(allTabs, DESCRIPTION_TABS_ENUM.PROPERTIES, '1] Properties tab should always be available')
    assert.notInclude(allTabs, DESCRIPTION_TABS_ENUM.DESCRIPTION, '1] Description tab should not be available')
    assert.notInclude(allTabs, DESCRIPTION_TABS_ENUM.FILES, '1] Files tab should not be available')
    assert.notInclude(allTabs, DESCRIPTION_TABS_ENUM.QUICKLOOK, '1] Quicklook tab should not be available')
    // 2 - test with description only (quicklooks are offline)
    baseEntity.content.files = {
      [CommonDomain.DataTypesEnum.DESCRIPTION]: [{ online: true }],
      [CommonDomain.DataTypesEnum.QUICKLOOK_MD]: [{ online: false }],
    }
    allTabs = getAvailableTabs(baseEntity)
    assert.include(allTabs, DESCRIPTION_TABS_ENUM.PROPERTIES, '2] Properties tab should always be available')
    assert.include(allTabs, DESCRIPTION_TABS_ENUM.DESCRIPTION, '2] Description tab should be available')
    assert.notInclude(allTabs, DESCRIPTION_TABS_ENUM.FILES, '2] Files tab should not be available')
    assert.notInclude(allTabs, DESCRIPTION_TABS_ENUM.QUICKLOOK, '2] Quicklook tab should not be available')
    // 3 - test with documents (description should be filted as it is offline, quicklook should be filtered as it has no width/height)
    baseEntity.content.files = {
      [CommonDomain.DataTypesEnum.DESCRIPTION]: [{ online: false }],
      [CommonDomain.DataTypesEnum.DOCUMENT]: [{ online: true }],
      [CommonDomain.DataTypesEnum.QUICKLOOK_SD]: [{ online: true }],
      [CommonDomain.DataTypesEnum.QUICKLOOK_MD]: [{ online: true }],
      [CommonDomain.DataTypesEnum.QUICKLOOK_HD]: [{ online: true }],
    }
    allTabs = getAvailableTabs(baseEntity)
    assert.include(allTabs, DESCRIPTION_TABS_ENUM.PROPERTIES, '3] Properties tab should always be available')
    assert.notInclude(allTabs, DESCRIPTION_TABS_ENUM.DESCRIPTION, '3] Description tab should not be available')
    assert.include(allTabs, DESCRIPTION_TABS_ENUM.FILES, '3] Files tab should be available')
    assert.notInclude(allTabs, DESCRIPTION_TABS_ENUM.QUICKLOOK, '3] Quicklook tab should not be available')
    // 4 - test with quicklooks
    baseEntity.content.files = {
      [CommonDomain.DataTypesEnum.QUICKLOOK_SD]: [{ online: true, imageWidth: 5, imageHeight: 5 }],
    }
    allTabs = getAvailableTabs(baseEntity)
    assert.include(allTabs, DESCRIPTION_TABS_ENUM.PROPERTIES, '4] Properties tab should always be available')
    assert.notInclude(allTabs, DESCRIPTION_TABS_ENUM.DESCRIPTION, '4] Description tab should not be available')
    assert.notInclude(allTabs, DESCRIPTION_TABS_ENUM.FILES, '4] Files tab should not be available')
    assert.include(allTabs, DESCRIPTION_TABS_ENUM.QUICKLOOK, '4] Quicklook tab should be available')
  })
})
