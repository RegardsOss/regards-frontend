/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleComponent from '../../../src/components/user/ModuleComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing ModuleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleComponent)
  })
  it('should render properly', () => {
    const props = {
      appName: 'hello.app',
      project: 'say-hello',
      searchQuery: 'kikikisonlessnorki?',
      enableFacettes: true,
      facettesQuery: '',
      initialDatasetIpId: 'xxxxxx-8',
      attributesConf: [],
      attributesRegroupementsConf: [],
      attributeModels: {},

    }
    shallow(<ModuleComponent {...props} />, { context })
  })
})
