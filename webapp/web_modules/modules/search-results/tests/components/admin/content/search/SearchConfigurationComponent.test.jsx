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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { FieldsGroup, FieldArray } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchConfigurationComponent from '../../../../../src/components/admin/content/search/SearchConfigurationComponent'
import CriteriaGroupsFieldArrayComponent from '../../../../../src/components/admin/content/search/CriteriaGroupsFieldArrayComponent'
import styles from '../../../../../src/styles'
import { attributes } from '../../../../dumps/attributes.dump'
import { allPluginMeta } from '../../../../dumps/search.plugins.meta.runtime'
import { exampleConfiguration } from '../../../../dumps/search.criteria.runtime'

const context = buildTestContext(styles)

/**
 * Test SearchConfigurationComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SearchConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchConfigurationComponent)
  })
  it('should render correctly', () => {
    const props = {
      fetchingMetadata: false,
      availableAttributes: attributes,
      pluginsMetadata: allPluginMeta,
      currentNamespace: 'xyz',
    }
    const enzymeWrapper = shallow(<SearchConfigurationComponent {...props} />, { context })
    // 1 - Check fields group
    const groupWrapper = enzymeWrapper.find(FieldsGroup)
    assert.lengthOf(groupWrapper, 1)
    assert.equal(groupWrapper.props().title, 'search.results.form.configuration.search.pane.title')
    // 2 - Check feld array for criteria groups
    const fieldWrapper = groupWrapper.find(FieldArray)
    assert.lengthOf(fieldWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(fieldWrapper, {
      name: 'xyz.criteriaGroups',
      component: CriteriaGroupsFieldArrayComponent,
      fetchingMetadata: props.fetchingMetadata,
      pluginsMetadata: props.pluginsMetadata,
      availableAttributes: props.availableAttributes,
      validate: enzymeWrapper.instance().validateGroups,
    })
  })
  it('should validate groups correctly', () => {
    const props = {
      fetchingMetadata: false,
      availableAttributes: attributes,
      pluginsMetadata: allPluginMeta,
      currentNamespace: 'xyz',
    }
    const enzymeWrapper = shallow(<SearchConfigurationComponent {...props} />, { context })

    const { validateGroups } = enzymeWrapper.instance()
    // 1 - Validate groups
    assert.isUndefined(validateGroups([]), 'Empty groups array should be valid')
    assert.isUndefined(validateGroups([{
      showTitle: true,
      title: {
        [UIDomain.LOCALES_ENUM.en]: 'Group 1',
        [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
      },
      criteria: [],
    }]), 'Title is shown and defined for each locale, should be valid')
    assert.isUndefined(validateGroups([{
      showTitle: false,
      title: {
        [UIDomain.LOCALES_ENUM.en]: '',
        [UIDomain.LOCALES_ENUM.fr]: 'n',
      },
      criteria: [],
    }]), 'Title is undefined but hidden: should be OK')
    assert.isOk(validateGroups([{
      showTitle: true,
      title: {
        [UIDomain.LOCALES_ENUM.en]: 'a',
        [UIDomain.LOCALES_ENUM.fr]: '',
      },
      criteria: [],
    }]), 'Title is undefined in a locale but shown: should be KO')
    assert.isOk(validateGroups([{
      showTitle: true,
      title: {
        [UIDomain.LOCALES_ENUM.en]: '',
        [UIDomain.LOCALES_ENUM.fr]: 'b',
      },
      criteria: [],
    }]), 'Title is undefined in other locale but shown: should be KO')
    // 2 - Validate criteria (use example configuration)
    function inValidGroups(criterion) {
      return [{
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'a',
          [UIDomain.LOCALES_ENUM.fr]: 'b',
        },
        criteria: [criterion],
      }]
    }
    // crit 1.1 valid
    assert.isUndefined(validateGroups(inValidGroups(exampleConfiguration[0].criteria[0])),
      'Crit 1.1 should be fully valid')
    // crit 1.2 in error: no label
    assert.isOk(validateGroups(inValidGroups(exampleConfiguration[0].criteria[1])),
      'Crit 1.2 should be in error (no label)')
    // crit 1.3 in error: no plugin
    assert.isOk(validateGroups(inValidGroups(exampleConfiguration[0].criteria[2])),
      'Crit 1.3 should be in error (no plugin)')
    // crit 2.1 in error: missing attributes
    assert.isOk(validateGroups(inValidGroups(exampleConfiguration[1].criteria[0])),
      'Crit 2.1 should be in error (missing attributes)')
    // custom: in error: mismatching attribute type
    assert.isOk(validateGroups(inValidGroups({
      ...exampleConfiguration[0].criteria[2],
      conf: {
        attributes: {
          f1: attributes[2], // STRING, but boolean expected
        },
      },
    })),
    'Custom criterion should be in in error (mismatching attribute type)')
  })
})
