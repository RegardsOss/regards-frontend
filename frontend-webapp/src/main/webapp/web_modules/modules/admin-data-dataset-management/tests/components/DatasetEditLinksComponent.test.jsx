/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import CollectionDump from '../model/dump/CollectionDump'
import { DatasetEditLinksComponent } from '../../src/components/DatasetEditLinksComponent'

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditLinksComponent', () => {
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
    assert.isDefined(DatasetEditLinksComponent)
    assert.isDefined(ListItem)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      linkedCollections: [CollectionDump[2], CollectionDump[3]],
      remainingCollections: [CollectionDump[1]],
      datasetStringTags: ['some tag', 'another tag', '42'],
      handleAdd: () => {},
      handleDelete: () => {},
      handleSearch: () => {},
      backUrl: '#',
      doneUrl: '#',
    }

    const enzymeWrapper = shallow(<DatasetEditLinksComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(9)
  })
})
