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
import { Field as ReduxField } from 'redux-form'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import Field from '../../src/components/Field'
import styles from '../../src/styles'
import DialogMessageHelpComponent from '../../src/components/help/DialogMessageHelpComponent'
import { FieldHelp } from '../../src/domain/FieldHelp'

const context = buildTestContext(styles)
// Test a components rendering
describe('[FORM UTILS] Testing FieldWithIntl', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(Field)
  })
  const TestRender = () => <div>Test field render</div>
  it('shoud render correctly without help', () => {
    const props = {
      name: 'test',
      component: TestRender,
      meta: {
        error: false,
      },
      anyOtherProp1: 18,
      anyOtherProp2: 'abc',
    }
    const enzymeWrapper = shallow(<Field {...props} />, { context })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ReduxField, {
      intl: context.intl,
      meta: {
        error: false,
      },
      anyOtherProp1: 18,
      anyOtherProp2: 'abc',
    }, 'Redux field should be rendered with inl and properties not consumed by REGARDS field')
    testSuiteHelpers.assertNotComp(enzymeWrapper, DialogMessageHelpComponent, 'Help should not be rendered')
  })
  it('shoud render correctly with a simple message help', () => {
    const props = {
      name: 'test',
      component: TestRender,
      help: FieldHelp.buildDialogMessageHelp('any.help.message', 'any.help.title'),
      meta: {
        error: false,
      },
      anyOtherProp1: 18,
      anyOtherProp2: 'abc',
    }
    const enzymeWrapper = shallow(<Field {...props} />, { context })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ReduxField, {
      intl: context.intl,
      meta: {
        error: false,
      },
      anyOtherProp1: 18,
      anyOtherProp2: 'abc',
    }, 'Redux field should be rendered with inl and properties not consumed by REGARDS field')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, DialogMessageHelpComponent, { help: props.help }, 'Help should not rendered')
  })
})
