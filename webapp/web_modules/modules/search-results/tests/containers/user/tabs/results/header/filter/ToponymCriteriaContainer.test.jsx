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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ToponymCriteriaComponent from '../../../../../../../src/components/user/tabs/results/header/filter/ToponymCriteriaComponent'
import { ToponymCriteriaContainer } from '../../../../../../../src/containers/user/tabs/results/header/filter/ToponymCriteriaContainer'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ToponymCriteriaContainer
 * @author Théo Lasserre
 */
describe('[SEARCH RESULTS] Testing ToponymCriteriaContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ToponymCriteriaContainer)
  })
  it('should render correctly with found toponym', () => {
    const props = {
      // eslint-disable-next-line react/no-unused-prop-types
      toponymCriteria: [{
        requestParameters: {
          toponym: 'id',
        },
      }],
      onUnselectToponymCriteria: () => { },
      // from mapStateToProps
      // eslint-disable-next-line react/no-unused-prop-types
      toponymList: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
            geometry: {},
            description: '',
            copyright: '',
          },
        },
      },
      currentLocale: UIDomain.LOCALES_ENUM.en,
    }
    const enzymeWrapper = shallow(<ToponymCriteriaContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ToponymCriteriaComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: 'search.filter.search.toponym.label',
      onUnselectToponymCriteria: props.onUnselectToponymCriteria,
    }, 'Component should define the expected properties')
  })
  it('should render correctly without found toponym', () => {
    const props = {
      // eslint-disable-next-line react/no-unused-prop-types
      toponymCriteria: [{
        requestParameters: {
          toponym: 'idx',
        },
      }],
      onUnselectToponymCriteria: () => { },
      // from mapStateToProps
      // eslint-disable-next-line react/no-unused-prop-types
      toponymList: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
            geometry: {},
            description: '',
            copyright: '',
          },
        },
      },
      currentLocale: UIDomain.LOCALES_ENUM.fr,
    }
    const enzymeWrapper = shallow(<ToponymCriteriaContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ToponymCriteriaComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: 'search.filter.search.toponym.label.not.found',
      onUnselectToponymCriteria: props.onUnselectToponymCriteria,
    }, 'Component should define the expected properties')
  })
})
