/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DataManagementClient } from '@regardsoss/client'
import DescriptionLevelActions from '../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../src/model/description/DescriptionLevelSelectors'
import { EntityDescriptionContainer } from '../../../src/containers/description/EntityDescriptionContainer'
import DownloadDescriptionClient from '../../../src/clients/DownloadDescriptionClient'
import styles from '../../../src/styles/styles'


const context = buildTestContext(styles)


describe('[Entities Common] Testing EntityDescriptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntityDescriptionContainer)
  })
  it('should render correctly no data', () => {
    const props = {
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('common'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors([]),
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
      downloadDescriptionClient: new DownloadDescriptionClient('test', []),
      shownEntity: null, // NO DATA
      onClose: () => { },
    }

    shallow(<EntityDescriptionContainer {...props} />, { context })
  })

  it('should render correctly', () => {
    const props = {
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('common'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors([]),
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
      downloadDescriptionClient: new DownloadDescriptionClient('test', []),
      shownEntity: {
        content: {
          ipId: 'URN:helloooooooooooooo Nanny!',
          model: {
            id: 1,
          },
          label: 'Hello, dear nanny',
          tags: [],
          entityType: 'COLLECTION',
        },
      },
      onClose: () => { },
    }
    shallow(<EntityDescriptionContainer {...props} />, { context })
  })
})
