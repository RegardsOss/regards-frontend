/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DataManagementClient } from '@regardsoss/client'
import EntityDescriptionComponent from '../../../src/components/description/EntityDescriptionComponent'
import DescriptionLevelActions from '../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../src/model/description/DescriptionLevelSelectors'
import DownloadDescriptionClient from '../../../src/clients/DownloadDescriptionClient'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

const testEntity = {
  content: {
    ipId: 'test',
    label: 'test',
    entityType: 'COLLECTION',
  },
}

describe('[Entities Common] Testing EntityDescriptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(EntityDescriptionComponent)
  })
  it('should render correctly no data', () => {
    const props = {
      // component API
      entity: null,
      open: PropTypes.bool.isRequired,

      // clients and selectors for sub components
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('test'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors(['test']),
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors(['test']),

      // control callback
      onSearchTag: null,
      onClose: () => { },
    }
    shallow(<EntityDescriptionComponent {...props} />, { context })
  })
  it('should render correctly with data', () => {
    const props = {
      // component API
      entity: testEntity,
      open: PropTypes.bool.isRequired,

      // clients and selectors for sub components
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('test'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors(['test']),
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors(['test']),

      // control callback
      onSearchTag: null,
      onClose: () => { },
    }
    shallow(<EntityDescriptionComponent {...props} />, { context })
  })
})
