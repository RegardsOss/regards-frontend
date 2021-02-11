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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import GroupTitleComponent from '../../../../../../src/components/user/tabs/results/search/GroupTitleComponent'
import styles from '../../../../../../src/styles'
import { attributes } from '../../../../../dumps/attributes.dump'

/**
 * Test GroupTitleComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing GroupTitleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GroupTitleComponent)
  })
  it('should render correctly when showing title, by locale', () => {
    const props = {
      group: {
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 1',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
        },
        criteria: [{
          pluginId: 8,
          pluginInstanceId: 'anythingIWant',
          conf: {
            attributes: { attr1: attributes[1].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
          state: { OK: true, kos: 36 },
          requestParameters: { ok: true, q: 'afterKos: [* TO 36]' },
        }, {
          pluginId: 10,
          pluginInstanceId: 'anythingIWant2',
          conf: {
            attributes: { },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'X2', [UIDomain.LOCALES_ENUM.fr]: 'X2(FR)' },
        }],
      },
    }
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<GroupTitleComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      const row = enzymeWrapper.find('tr')
      assert.lengthOf(row, 1, 'It should render as a table row for criterion layout')
      assert.include(enzymeWrapper.debug(), props.group.title[locale], `it should display ${locale} group title`)
    })
  })
  it('should render correctly when not showing title', () => {
    const props = {
      group: {
        showTitle: false,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 1',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
        },
        criteria: [{
          pluginId: 8,
          pluginInstanceId: 'anythingIWant',
          conf: {
            attributes: { attr1: attributes[1].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
          state: { OK: true, kos: 36 },
          requestParameters: { ok: true, q: 'afterKos: [* TO 36]' },
        }, {
          pluginId: 10,
          pluginInstanceId: 'anythingIWant2',
          conf: {
            attributes: { },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'X2', [UIDomain.LOCALES_ENUM.fr]: 'X2(FR)' },
        }],
      },
    }
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<GroupTitleComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      const row = enzymeWrapper.find('tr')
      assert.lengthOf(row, 0, 'It should not render when title is hidden')
      assert.notInclude(enzymeWrapper.debug(), props.group.title[locale], `it should not display ${locale} group title`)
    })
  })
})
