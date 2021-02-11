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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import AddElementToCartComponent from '../../../../../../../src/components/user/tabs/results/common/options/AddElementToCartComponent'
import { AddElementToCartContainer } from '../../../../../../../src/containers/user/tabs/results/common/options/AddElementToCartContainer'
import styles from '../../../../../../../src/styles/styles'
import { dataEntity, datasetEntity } from '../../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
* Test AddElementToCartContainer
* @author Raphaël Mechali
*/
describe('[SEARCH RESULTS] Testing AddElementToCartContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AddElementToCartContainer)
  })
  it('should render correctly and disable action when DATA entity can not be added to basket', () => {
    const props = {
      entity: {
        content: {
          ...dataEntity.content,
          files: {}, // No file
        },
      },
      onAddElementToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: false,
      onAddElementToCart: enzymeWrapper.instance().onAddElementToCart,
    }, 'Add to cart should be disabled for a DATA that has no orderable file')
  })
  it('should render correctly and enable action when DATA entity can be added to basket (RAW data)', () => {
    const props = {
      entity: {
        content: {
          ...dataEntity.content,
          files: {
            [CommonDomain.DATA_TYPES_ENUM.RAWDATA]: [{
              dataType: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
              reference: true,
              uri: 'http://somewhere.com/somefile.csv',
              mimeType: 'text/csv',
              online: false,
              filename: 'somefile.csv',
            }],
          },
        },
      },
      onAddElementToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: true,
      onAddElementToCart: enzymeWrapper.instance().onAddElementToCart,
    }, 'Add to cart should be enabled for a DATA that has orderable RAW data file')
  })
  it('should render correctly and enable action when DATA entity can be added to basket (QUICKLOOK data)', () => {
    const props = {
      entity: {
        content: {
          ...dataEntity.content,
          files: {
            [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD]: [{
              dataType: CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD,
              reference: true,
              uri: 'http://somewhere.com/somefile.csv',
              mimeType: 'text/csv',
              online: false,
              filename: 'somefile.csv',
            }],
          },
        },
      },
      onAddElementToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: true,
      onAddElementToCart: enzymeWrapper.instance().onAddElementToCart,
    }, 'Add to cart should be enabled for a DATA that has orderable QUICKLOOK data')
  })
  it('should render correctly and enable action for dataset, no matter the files', () => {
    const props = {
      entity: datasetEntity,
      onAddElementToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: true,
      onAddElementToCart: enzymeWrapper.instance().onAddElementToCart,
    }, 'Add to cart should be enabled for a DATASET')
  })
  it('should render correctly and disable action for type that is not a DATASET nor a DATA', () => {
    const props = {
      entity: {
        content: {
          ...dataEntity.content,
          entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
          files: {
            [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD]: [{
              dataType: CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD,
              reference: true,
              uri: 'http://somewhere.com/somefile.csv',
              mimeType: 'text/csv',
              online: false,
              filename: 'somefile.csv',
            }],
          },
        },
      },
      onAddElementToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AddElementToCartComponent)
    assert.lengthOf(componentWrapper, 1, 'Sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canAddToCart: false,
      onAddElementToCart: enzymeWrapper.instance().onAddElementToCart,
    }, 'Add to cart should be disabled for collections')
  })
})
