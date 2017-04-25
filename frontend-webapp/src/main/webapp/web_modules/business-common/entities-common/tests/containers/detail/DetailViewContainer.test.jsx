/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DataManagement } from '@regardsoss/client'
import DetailViewComponent from '../../../src/components/detail/DetailViewComponent'
import { DetailViewContainer } from '../../../src/containers/detail/DetailViewContainer'
import DownloadDescriptionClient from '../../../src/model/DownloadDescriptionClient'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

const mockDescClient = new DownloadDescriptionClient('common', [])
const mockAttrActions = new DataManagement.ModelAttributesAction('common')
const mockAttrSelectors = DataManagement.ModelAttributesSelector([])

console.info('----------------------------------->', mockAttrSelectors)

const defaultProps = {
  open: true,

  dialogHeightPercent: 15,
  dialogWidthPercent: 15,
  onClose: () => { },
  fetchModelAttributesActions: mockAttrActions,
  fetchModelAttributesSelectors: mockAttrSelectors,
  downloadDescriptionClient: mockDescClient,
  loading: false,
  fetchedModelAttributes: null,
  fetchedDatasetDescriptionResult: null,
  fetchedCollectionDescriptionResult: null,
  dispatchFetchDescription: () => { },
  dispatchFetchModelAttributes: () => { },

}

describe('[Entities Common] Testing DetailViewContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DetailViewContainer)
  })
  it('should render properly and fetch data when required', () => {
    const fetchCount = {
      attributes: 0,
      description: 0,
    }
    const props = {
      ...defaultProps,
      dispatchFetchDescription: () => { fetchCount.description += 1 },
      dispatchFetchModelAttributes: () => { fetchCount.attributes += 1 },
    }


    // entity: {
    //     content: {
    //       id: 0,
    //       type: 'COLLECTION',
    //       ipId: 'Bonjourlespetitsenfants',
    //       label: 'ça',
    //     },
    //   },

    const enzymeWrapper = shallow(<DetailViewContainer {...props} />, { context })
    // TODO something like that
    assert.equal(enzymeWrapper.find(DetailViewComponent).length, 1, 'The corresponding component should be rendered')
  })
})
