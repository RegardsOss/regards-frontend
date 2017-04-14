/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import { ScrollAreaAdapter } from '@regardsoss/adapters'
import GraphLevelDisplayer from '../../../src/components/user/GraphLevelDisplayer'
import styles from '../../../src/styles/styles'
import GraphLevelLoadingDisplayer from '../../../src/components/user/GraphLevelLoadingDisplayer'
import GraphLevelMessageDisplayer from '../../../src/components/user/GraphLevelMessageDisplayer'

const context = buildTestContext(styles)

// define retrieval methods in component
const isRootShowable = node => node.type() === ShowableAtRender &&
  node.children().length === 1 && node.children().at(0).type() === 'div'

const isLoadingShowable = node => node.type() === ShowableAtRender &&
  node.children().length === 1 && node.children().at(0).type() === GraphLevelLoadingDisplayer

const isMessageShowable = (node, key) => {
  if (node.type() === ShowableAtRender && node.children().length === 1) {
    const singleChild = node.children().at(0)
    return singleChild.type() === GraphLevelMessageDisplayer && singleChild.props().messageKey === key
  }
  return false
}

const isErrorShowable = node => isMessageShowable(node, 'search.graph.level.fetch.model.failed')
const isEmptyShowable = node => isMessageShowable(node, 'search.graph.level.no.model')

const isContentShowable = node => node.type() === ShowableAtRender &&
  node.children().length === 1 && node.children().at(0).type() === ScrollAreaAdapter

const getAllShowable = enzymeWrapper => ({
  rootShowable: enzymeWrapper.findWhere(isRootShowable).at(0),
  loadingShowable: enzymeWrapper.findWhere(isLoadingShowable).at(0),
  errorShowable: enzymeWrapper.findWhere(isErrorShowable).at(0),
  emptyShowable: enzymeWrapper.findWhere(isEmptyShowable).at(0),
  contentShowable: enzymeWrapper.findWhere(isContentShowable).at(0),

})

describe('[Search Graph] Testing GraphLevelDisplayer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GraphLevelDisplayer)
  })
  it('should show / hide with isShowable property changes', () => {
    const props = {
      graphDatasetAttributes: [],
      isShowable: false,
      isLoading: false,
      hasError: false,
      collections: {},
      datasets: {},
      levelIndex: 999,
    }

    // check all showable are found
    const enzymeWrapper = shallow(<GraphLevelDisplayer {...props} />, { context })
    let rootShowable = getAllShowable(enzymeWrapper).rootShowable
    assert.isFalse(rootShowable.props().show, 'Root showable should be hidden')

    // switch to isShowable true
    enzymeWrapper.setProps({
      ...props,
      isShowable: true,
    })
    rootShowable = getAllShowable(enzymeWrapper).rootShowable
    assert.isTrue(rootShowable.props().show, 'Root showable should be visible')
  })
  it('Should render loading state', () => {
    const props = {
      graphDatasetAttributes: [],
      isShowable: true,
      isLoading: false,
      hasError: false,
      collections: {},
      datasets: {},
      levelIndex: 999,
    }
    const enzymeWrapper = shallow(<GraphLevelDisplayer {...props} />, { context })
    let showables = getAllShowable(enzymeWrapper)
    assert.isFalse(showables.loadingShowable.props().show, 'Loading should not be visible')

    // switch loading to true
    enzymeWrapper.setProps({
      ...props,
      isLoading: true,
    })
    showables = getAllShowable(enzymeWrapper)
    assert.isTrue(showables.loadingShowable.props().show, 'Loading should be visible')
  })
  it('Should render error state', () => {
    const props = {
      graphDatasetAttributes: [],
      isShowable: true,
      isLoading: false,
      hasError: false,
      collections: {},
      datasets: {},
      levelIndex: 999,
    }
    const enzymeWrapper = shallow(<GraphLevelDisplayer {...props} />, { context })
    let showables = getAllShowable(enzymeWrapper)
    assert.isFalse(showables.errorShowable.props().show, 'Error message  should not be visible')

    // switch loading to true
    enzymeWrapper.setProps({
      ...props,
      hasError: true,
    })
    showables = getAllShowable(enzymeWrapper)
    assert.isTrue(showables.errorShowable.props().show, 'Error message should be visible')
  })
  it('Should render empty state or content', () => {
    const props = {
      graphDatasetAttributes: [],
      isShowable: true,
      isLoading: false,
      hasError: false,
      collections: {},
      datasets: {},
      levelIndex: 999,
    }
    const enzymeWrapper = shallow(<GraphLevelDisplayer {...props} />, { context })
    let showables = getAllShowable(enzymeWrapper)
    assert.isTrue(showables.emptyShowable.props().show, 'Empty message should be visible when there is no content')
    assert.isFalse(showables.contentShowable.props().show, 'Content should be hidden when there is no content')

    // switch loading to true
    enzymeWrapper.setProps({
      ...props,
      collections: {
        1: {
          content: {
            ipId: 'ip-1',
            label: 'any,',
            type: 'COLLECTION',
            properties: {},
          },
        },
      },
    })
    showables = getAllShowable(enzymeWrapper)
    assert.isFalse(showables.emptyShowable.props().show, 'Empty message should be hidden')
    assert.isTrue(showables.contentShowable.props().show, 'Content should be visible when there is content')
  })
  it('Should render exlusively on element at same time, between loading / error / empty and content', () => {
    // test here all states combination and check that they are exclusive
    const possibleValues = [
      { key: 'isLoading', values: [false, true] },
      { key: 'hasError', values: [false, true] },
      {
        key: 'collections',
        values: [{}, {
          1: {
            content: {
              ipId: 'ip-1',
              label: 'any,',
              type: 'COLLECTION',
              properties: {},
            },
          },
        }],
      },
      {
        key: 'datasets',
        values: [{}, {
          1: {
            content: {
              ipId: 'ip-2',
              label: 'any,',
              type: 'DATASET',
              properties: {},
            },
          },
        }],
      },
    ]

    const generateCombination = (fields) => {
      if (fields.length === 1) {
        const { key, values } = fields[0]
        return values.map(v => ({
          // basic props
          graphDatasetAttributes: [],
          isShowable: true,
          levelIndex: 999,
          // combination
          [key]: v,
        }))
      }
      const { key, values } = fields[0]
      // resolve lower levels
      const nextFieldsResult = generateCombination(fields.slice(1))
      // combinate with this levels
      return nextFieldsResult.reduce((acc, combination) => {
        const currentCombinations = values.map(v => ({
          [key]: v,
          ...combination,
        }))
        // flat combination map
        return acc.concat(currentCombinations)
      }, [])
    }

    const allCombinations = generateCombination(possibleValues)
    allCombinations.forEach((combinedProperties) => {
      const stateWrapper = shallow(<GraphLevelDisplayer {...combinedProperties} />, { context })
      // Check that, in children showables (ignoring root showable), only one can be seen at same time
      const { loadingShowable, emptyShowable, errorShowable, contentShowable } = getAllShowable(stateWrapper)
      const allChildrenShowables = [loadingShowable, emptyShowable, errorShowable, contentShowable]
      const visibleElement = allChildrenShowables.filter(wrapper => wrapper.props().show)
      assert.lengthOf(visibleElement, 1, `Invalid visible count (${visibleElement.length}) - there should be one and only one. 
      Elements: ${JSON.stringify(visibleElement.map(n => n.text()))}
      State: ${JSON.stringify(combinedProperties)}`)
    })
  })
})
