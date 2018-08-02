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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import AddElementToCartComponent from '../../../../../src/components/user/results/options/AddElementToCartComponent'
import { AddElementToCartContainer } from '../../../../../src/containers/user/results/options/AddElementToCartContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

const basicEntityFields = {
  id: 'coucou',
  providerId: '1',
  label: 'O.D.I.L',
  model: '1',
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
          entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
          files: {}, // No file
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
    }, 'Add to cart should be disabled for a DATA that has no orderable file')
  })
  it('should render correctly and enable action when DATA entity can be added to basket (RAW data)', () => {
    const props = {
      entity: {
        content: {
          ...basicEntityFields,
          entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
          files: {
            [CommonDomain.DataTypesEnum.RAWDATA]: [{
              dataType: CommonDomain.DataTypesEnum.RAWDATA,
              reference: true,
              uri: 'http://somewhere.com/somefile.csv',
              mimeType: 'text/csv',
              online: false,
              filename: 'somefile.csv',
            }],
          },
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
    }, 'Add to cart should be enabled for a DATA that has orderable RAW data file')
  })
  it('should render correctly and enable action when DATA entity can be added to basket (QUICKLOOK data)', () => {
    const props = {
      entity: {
        content: {
          ...basicEntityFields,
          entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
          files: {
            [CommonDomain.DataTypesEnum.QUICKLOOK_MD]: [{
              dataType: CommonDomain.DataTypesEnum.QUICKLOOK_MD,
              reference: true,
              uri: 'http://somewhere.com/somefile.csv',
              mimeType: 'text/csv',
              online: false,
              filename: 'somefile.csv',
            }],
          },
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
    }, 'Add to cart should be enabled for a DATA that has orderable QUICKLOOK data')
  })
  it('should render correctly and enable action for dataset, no matter the files', () => {
    const props = {
      entity: {
        content: {
          ...basicEntityFields,
          entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
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
          entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
          files: {
            [CommonDomain.DataTypesEnum.QUICKLOOK_MD]: [{
              dataType: CommonDomain.DataTypesEnum.QUICKLOOK_MD,
              reference: true,
              uri: 'http://somewhere.com/somefile.csv',
              mimeType: 'text/csv',
              online: false,
              filename: 'somefile.csv',
            }],
          },
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
          entityType: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
          files: {
            [CommonDomain.DataTypesEnum.QUICKLOOK_MD]: [{
              dataType: CommonDomain.DataTypesEnum.QUICKLOOK_MD,
              reference: true,
              uri: 'http://somewhere.com/somefile.csv',
              mimeType: 'text/csv',
              online: false,
              filename: 'somefile.csv',
            }],
          },
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
    }, 'Add to cart should be disabled for documents')
  })
})
