/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { IntlStub } from '@regardsoss/tests-helpers'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import { TableContainer } from '@regardsoss/components'
import Styles from '../../../src/styles/styles'
import SearchResultsComponent from '../../../src/components/user/SearchResultsComponent'
import NavigationComponent from '../../../src/components/user/NavigationComponent'

/**
 * Tests for SearchResultsComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing SearchResultsComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: IntlStub,
    },
  }

  it('Should render a AttributeConfigurationComponent', () => {
    const props = {
      appName: 'test',
      project: 'project',
      enableFacettes: true,
      searchQuery: '',
      facettesQuery: '',
      attributesConf: [],
      attributesRegroupementsConf: [],
      attributeModels: {},
      target: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
    }

    const wrapper = shallow(
      <SearchResultsComponent {...props} />, options,
    )

    const navigationCmpt = wrapper.find(NavigationComponent)
    assert.lengthOf(navigationCmpt, 1, 'There should be a NavigationComponent rendered')

    const tableComponent = wrapper.find(TableContainer)
    assert.lengthOf(tableComponent, 1, 'There should be a TableContainer rendered')
  })
})
