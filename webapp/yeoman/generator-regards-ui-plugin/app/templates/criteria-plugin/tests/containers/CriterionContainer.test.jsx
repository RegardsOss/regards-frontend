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
import { CatalogDomain, UIDomain, DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionContainer } from '../../src/containers/CriterionContainer'
import CriterionComponent from '../../src/components/CriterionComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link SampleCriteria}
 *
 * @author <%= author %>
 */
describe('[<%= name %>] Testing CriterionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(CriterionContainer)
  })
  it('should render self and sub components', () => {
    const props = {
      pluginInstanceId: 'any',
      searchContext: {
        engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
        searchParameters: {},
      },
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'My label',
        [UIDomain.LOCALES_ENUM.fr]: 'Mon libellé',
      },
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      },
      state: {
        searchText: 'some research',
      },
      publishState: () => {},
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    const component = enzymeWrapper.find(CriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      label: props.label,
      searchAttribute: props.attributes.searchField,
      searchText: props.state.searchText,
      onTextInput: enzymeWrapper.instance().onTextInput,
    }, 'Component properties should be correctly set')
    // TODO: any other test...
  })
})
