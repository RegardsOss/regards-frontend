/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import SelectedLevelFormRender from '../../../src/components/admin/SelectedLevelFormRender'

import styles from '../../../src/styles/styles'

describe('[Search Graph] Testing SelectedLevelFormRender', () => {
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
  it('should exists', () => {
    assert.isDefined(SelectedLevelFormRender)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
    moduleTheme: styles({ textField: {} }),
  }


  it('should render properly', () => {
    // mimic the redux form fields methods
    const fields = {
      getAll: () => undefined,
    }
    const props = {
      collectionModels: {},
      meta: {
        touched: false,
        error: null,
      },
      intl: {
        formatMessage: ({ id }) => id,
      },
      fields,
    }
    // simple render test
    shallow(<SelectedLevelFormRender {...props} />, { context })
  })
})
