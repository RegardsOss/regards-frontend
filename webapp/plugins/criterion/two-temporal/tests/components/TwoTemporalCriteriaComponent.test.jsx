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
import { DamDomain, UIDomain } from '@regardsoss/domain'
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

  const attr1 = {
    ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
    jsonPath: 'x.attr1',
  }
  const attr2 = {
    ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
    jsonPath: 'y.attr2',
  }

  it('should render correctly with all locales', () => {
    const props = {
      pluginInstanceId: 'any',
      label: criterionTestSuiteHelpers.getLabelStub(),
      attribute1: attr1,
      attribute2: attr2,
      error: false,
      value1: new Date('2017-10-10T10:00:00.726Z'),
      value2: new Date('2017-10-10T20:00:0.726Z'),
      onDate1Changed: () => {},
      onDate2Changed: () => {},
    }
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      assert.include(enzymeWrapper.debug(), props.label[locale])
    })
  })

  const testCases = [{
    label: 'in single attribute mode, no error', // default case
    props: { },
  }, {
    label: 'in dual attributes mode, no error',
    props: { attribute2: attr2 },
  }, {
    label: 'in single attribute mode, with error',
    props: { error: true },
  }, {
    label: 'in dual attributes mode, with error',
    props: { attribute2: attr2, error: true },
  }]

  testCases.forEach(({ label, props: testProps }) => it(`should render correctly ${label}`, () => {
    const props = {
      pluginInstanceId: 'any',
      label: criterionTestSuiteHelpers.getLabelStub(),
      attribute1: attr1,
      attribute2: attr1,
      error: false,
      value1: new Date('2017-10-10T10:00:00.726Z'),
      value2: new Date('2017-10-10T20:00:0.726Z'),
      onDate1Changed: () => {},
      onDate2Changed: () => {},
      ...testProps, // test case specifics
    }

    const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />, { context })
    const temporalCriterionWrappers = enzymeWrapper.find(TemporalCriterionComponent)
    assert.lengthOf(temporalCriterionWrappers, 2, 'There should be criterion fields for each range value')
    testSuiteHelpers.assertWrapperProperties(temporalCriterionWrappers.at(0), {
      error: props.error,
      searchAttribute: props.attribute1,
      value: props.value1,
      hintDate: props.attribute1.boundsInformation.lowerBound,
      onDateChanged: props.onDate1Changed,
      lowerBound: true,
      isStopDate: false,
    }, 'First temporal criterion should be correctly configured')
    testSuiteHelpers.assertWrapperProperties(temporalCriterionWrappers.at(1), {
      error: props.error,
      searchAttribute: props.attribute2,
      value: props.value2,
      hintDate: props.attribute2.boundsInformation.upperBound,
      onDateChanged: props.onDate2Changed,
      lowerBound: false,
      isStopDate: true,
    }, 'Second temporal criterion should be correctly configured')
  }))
})
