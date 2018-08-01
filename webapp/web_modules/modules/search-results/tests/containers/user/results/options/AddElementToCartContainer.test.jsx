/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import AddElementToCartComponent from '../../../../../src/components/user/results/options/AddElementToCartComponent'
import { AddElementToCartContainer } from '../../../../../src/containers/user/results/options/AddElementToCartContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

const basicEntityFields = {
  id: 'coucou',
  providerId: '1',
  label: 'O.D.I.L',
  files: {},
  geometry: null,
  properties: {},
  tags: [],
  services: [],
}

/**
* Test AddElementToCartContainer
* @author Raphaël Mechali
*/
describe('[Search Results] Testing AddElementToCartContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AddElementToCartContainer)
  })
  it('should render correctly and disable action when DATA entity can not be added to basket', () => {
    const props = {
      entity: {
        content: {
          ...basicEntityFields,
          entityType: ENTITY_TYPES_ENUM.DATA,
          containsPhysicalData: false,
          canBeExternallyDownloaded: false,
          allowingDownload: false,
        },
      },
      onAddToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: false,
      onAddToCart: enzymeWrapper.instance().onAddToCart,
    }, 'Add to cart should be disabled for a DATA where containsPhysicalData is false')
  })
  it('should render correctly and enable action when DATA entity can be added to basket (local data)', () => {
    const props = {
      entity: {
        content: {
          ...basicEntityFields,
          entityType: ENTITY_TYPES_ENUM.DATA,
          containsPhysicalData: true,
          canBeExternallyDownloaded: false,
          allowingDownload: true,
        },
      },
      onAddToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: true,
      onAddToCart: enzymeWrapper.instance().onAddToCart,
    }, 'Add to cart should be enabled for a DATA where containsPhysicalData is true')
  })
  it('should render correctly and enable action when DATA entity can be added to basket (external data)', () => {
    const props = {
      entity: {
        content: {
          ...basicEntityFields,
          entityType: ENTITY_TYPES_ENUM.DATA,
          containsPhysicalData: false,
          canBeExternallyDownloaded: true,
          allowingDownload: true,
        },
      },
      onAddToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: true,
      onAddToCart: enzymeWrapper.instance().onAddToCart,
    }, 'Add to cart should be enabled for a DATA where containsPhysicalData is true')
  })
  it('should render correctly and enable action for dataset, no matter the containsPhysicalData value', () => {
    const props = {
      entity: {
        content: {
          ...basicEntityFields,
          entityType: ENTITY_TYPES_ENUM.DATASET,
          containsPhysicalData: null,
          allowingDownload: null,
        },
      },
      onAddToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: true,
      onAddToCart: enzymeWrapper.instance().onAddToCart,
    }, 'Add to cart should be enabled for a DATASET')
  })
  it('should render correctly and disable action for type that is not a DATASET nor a DATA', () => {
    const props = {
      entity: {
        content: {
          ...basicEntityFields,
          entityType: ENTITY_TYPES_ENUM.COLLECTION,
          containsPhysicalData: null,
          allowingDownload: null,
        },
      },
      onAddToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: false,
      onAddToCart: enzymeWrapper.instance().onAddToCart,
    }, 'Add to cart should be disabled for collections')

    const props2 = {
      entity: {
        content: {
          ...basicEntityFields,
          entityType: ENTITY_TYPES_ENUM.DOCUMENT,
          containsPhysicalData: true,
          allowingDownload: false,
        },
      },
      onAddToCart: () => { },
    }
    enzymeWrapper.setProps(props2)
    componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: false,
      onAddToCart: enzymeWrapper.instance().onAddToCart,
    }, 'Add to cart should be disabled for collections')
  })
})
