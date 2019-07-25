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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import TwoTemporalCriteriaComponent from '../../src/components/TwoTemporalCriteriaComponent'
import TemporalCriterionComponent from '../../src/components/TemporalCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TwoTemporalCriteriaComponent
 * @author Raphaël Mechali
 */
describe('[Two temporal criteria] Testing TwoTemporalCriteriaComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TwoTemporalCriteriaComponent)
  })
  it('should render correctly for a single attribute (same attribute jsonPath)', () => {
    const attribute = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
      criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-29T13:15:42.726Z'))
    const props = {
      attribute1: attribute,
      attribute2: attribute,
      value1: new Date('2017-10-10T10:00:00.726Z'),
      value2: new Date('2017-10-10T20:00:0.726Z'),
      onDate1Changed: () => {},
      onDate2Changed: () => {},
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />, { context })
    const temporalCriterionWrappers = enzymeWrapper.find(TemporalCriterionComponent)
    assert.lengthOf(temporalCriterionWrappers, 2, 'There should be criterion fields for each range value')
    testSuiteHelpers.assertWrapperProperties(temporalCriterionWrappers.at(0), {
      searchAttribute: attribute,
      value: props.value1,
      hintDate: attribute.boundsInformation.lowerBound,
      onDateChanged: props.onDate1Changed,
      isStopDate: false,
    }, 'First temporal criterion should be correctly configured')
    testSuiteHelpers.assertWrapperProperties(temporalCriterionWrappers.at(1), {
      searchAttribute: attribute,
      value: props.value2,
      hintDate: attribute.boundsInformation.upperBound,
      onDateChanged: props.onDate2Changed,
      isStopDate: true,
    }, 'Second temporal criterion should be correctly configured')
    // The label rendered should be a range on single attribute
    assert.include(enzymeWrapper.debug(), 'single.attributes.label', 'should render single range label')
  })
  it('should render correctly for two different attributes', () => {
    const props = {
      attribute1: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-29T13:15:42.726Z')),
        jsonPath: 'attr1',
      },
      attribute2: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-29T13:15:42.726Z')),
        jsonPath: 'attr2',
      },
      value1: new Date('2017-10-10T10:00:00.726Z'),
      value2: new Date('2017-10-10T20:00:0.726Z'),
      onDate1Changed: () => {},
      onDate2Changed: () => {},
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />, { context })
    const temporalCriterionWrappers = enzymeWrapper.find(TemporalCriterionComponent)
    assert.lengthOf(temporalCriterionWrappers, 2, 'There should be criterion fields for each range value')
    testSuiteHelpers.assertWrapperProperties(temporalCriterionWrappers.at(0), {
      searchAttribute: props.attribute1,
      value: props.value1,
      hintDate: props.attribute1.boundsInformation.lowerBound,
      onDateChanged: props.onDate1Changed,
      isStopDate: false,
    }, 'First temporal criterion should be correctly configured')
    testSuiteHelpers.assertWrapperProperties(temporalCriterionWrappers.at(1), {
      searchAttribute: props.attribute2,
      value: props.value2,
      hintDate: props.attribute2.boundsInformation.upperBound,
      onDateChanged: props.onDate2Changed,
      isStopDate: true,
    }, 'Second temporal criterion should be correctly configured')
    // The label rendered should be a range on two attributes
    assert.include(enzymeWrapper.debug(), 'multiple.attributes.label', 'should render single range label')
  })
})
