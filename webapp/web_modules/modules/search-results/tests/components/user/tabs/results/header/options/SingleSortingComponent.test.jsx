/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import MenuItem from 'material-ui/MenuItem'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import SingleSortingComponent, { SingleSortingModelEnum } from '../../../../../../../src/components/user/tabs/results/header/options/SingleSortingComponent'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

const commonProps = {
  defaultSortingModel: {
    type: SingleSortingModelEnum.DEFAULT,
    selected: true,
    sortingCriteria: [],
  },
  attributeSortingModels: [{
    type: SingleSortingModelEnum.ATTRIBUTE,
    selected: false,
    sortingCriteria: [],
    presentationModel: {
      key: 'any',
      label: {
        en: 'any.en',
        fr: 'any.fr',
      },
      visible: true,
      attributes: [],
      enableSorting: true,
    },
  }, {
    type: SingleSortingModelEnum.ATTRIBUTE,
    selected: false,
    sortingCriteria: [],
    presentationModel: {
      key: 'any2',
      label: {
        en: 'any2.en',
        fr: 'any2.fr',
      },
      visible: false,
      attributes: [],
      enableSorting: true,
    },
  }],
  onSortBy: () => {},
}

/**
 * Test SingleSortingComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SingleSortingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SingleSortingComponent)
  })
  it('should render correctly with default option selected (english locale)', () => {
    const props = {
      ...commonProps,
    }
    const enzymeWrapper = shallow(<SingleSortingComponent {...props} />, { context })
    // check drop down button is drawn
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 1, 'There should be the drop down button')
    testSuiteHelpers.assertWrapperProperties(dropDownButton, {
      onChange: props.onSortBy,
      getLabel: enzymeWrapper.instance().getLabel,
      value: props.defaultSortingModel,
    }, 'Drop down button properties should be correctly set')
    // retrieve all menu items
    const options = dropDownButton.find(MenuItem)
    assert.lengthOf(options, 3, 'There should be default option and 2 options for selectable attributes')
    // 1- Default option
    const defaultOption = options.findWhere((n) => n.props().value === props.defaultSortingModel)
    assert.lengthOf(defaultOption, 1, 'There should be the default options')
    testSuiteHelpers.assertWrapperProperties(defaultOption, {
      checked: true,
      primaryText: 'search.results.list.sort.default.label',
    }, 'Default option properties should be correctly set')
    // 2- first attribute options
    const firstAttributeOption = options.findWhere((n) => n.props().value === props.attributeSortingModels[0])
    assert.lengthOf(firstAttributeOption, 1, 'There should be the default options')
    testSuiteHelpers.assertWrapperProperties(firstAttributeOption, {
      checked: false,
      primaryText: 'any.en',
    }, 'First attribute option properties should be correctly set (en locale)')
    // 3 - second attribute options
    const secondAttributeOption = options.findWhere((n) => n.props().value === props.attributeSortingModels[1])
    assert.lengthOf(secondAttributeOption, 1, 'There should be the default options')
    testSuiteHelpers.assertWrapperProperties(secondAttributeOption, {
      checked: false,
      primaryText: 'any2.en',
    }, 'Second attribute option properties should be correctly set (en locale)')
  })
  it('should render correctly with custom sorting option (fr locale)', () => {
    const props = {
      ...commonProps,
      defaultSortingModel: {
        ...commonProps.defaultSortingModel,
        selected: false,
      },
      customSortingModel: {
        type: SingleSortingModelEnum.CUSTOM,
        selected: true,
        sortingCriteria: [],
      },
    }
    const frContext = {
      ...context,
      intl: {
        ...context.intl,
        locale: UIDomain.LOCALES_ENUM.fr,
      },
    }
    const enzymeWrapper = shallow(<SingleSortingComponent {...props} />, { context: frContext })
    // check drop down button is drawn
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 1, 'There should be the drop down button')
    testSuiteHelpers.assertWrapperProperties(dropDownButton, {
      onChange: props.onSortBy,
      getLabel: enzymeWrapper.instance().getLabel,
      value: props.customSortingModel,
    }, 'Drop down button properties should be correctly set')
    // retrieve all menu items
    const options = dropDownButton.find(MenuItem)
    assert.lengthOf(options, 4, 'There should be default option, custom options and 2 options for selectable attributes')
    // 2- Default option
    const customOption = options.findWhere((n) => n.props().value === props.customSortingModel)
    assert.lengthOf(customOption, 1, 'There should be the default options')
    testSuiteHelpers.assertWrapperProperties(customOption, {
      checked: true,
      primaryText: 'search.results.list.sort.custom.label',
    }, 'Custom option properties should be correctly set')
    // 2- Default option
    const defaultOption = options.findWhere((n) => n.props().value === props.defaultSortingModel)
    assert.lengthOf(defaultOption, 1, 'There should be the default options')
    testSuiteHelpers.assertWrapperProperties(defaultOption, {
      checked: false,
      primaryText: 'search.results.list.sort.default.label',
    }, 'Default option properties should be correctly set')
    // 3- first attribute options
    const firstAttributeOption = options.findWhere((n) => n.props().value === props.attributeSortingModels[0])
    assert.lengthOf(firstAttributeOption, 1, 'There should be the default options')
    testSuiteHelpers.assertWrapperProperties(firstAttributeOption, {
      checked: false,
      primaryText: 'any.fr',
    }, 'First attribute option properties should be correctly set (fr locale)')
    // 4 - second attribute options
    const secondAttributeOption = options.findWhere((n) => n.props().value === props.attributeSortingModels[1])
    assert.lengthOf(secondAttributeOption, 1, 'There should be the default options')
    testSuiteHelpers.assertWrapperProperties(secondAttributeOption, {
      checked: false,
      primaryText: 'any2.fr',
    }, 'Second attribute option properties should be correctly set (fr locale)')
  })
})
