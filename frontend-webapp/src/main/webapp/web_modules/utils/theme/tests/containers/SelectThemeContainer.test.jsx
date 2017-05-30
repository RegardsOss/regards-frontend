import { shallow } from 'enzyme'
import { expect } from 'chai'
import MenuItem from 'material-ui/MenuItem'
import { IconMenu } from 'material-ui/IconMenu'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SelectThemeContainer } from '../../src/containers/SelectThemeContainer'

function setup() {
  const props = {
    themeList: {
      0: {
        content: {
          id: 0,
          name: 'Light',
          active: false,
          configuration: {},
        },
        links: [],
      },
      1: {
        content: {
          id: 1,
          name: 'cdpp',
          active: true,
          configuration: {
            palette: {
              primary1Color: '#673ab7',
              accent1Color: '#ff8f00',
              canvasColor: '#eeeeee',
            },
          },
        },
        links: [],
      },
      2: {
        content: {
          id: 2,
          name: 'somethemename',
          active: false,
          configuration: {
            palette: {
              primary1Color: '#8bc34a',
            },
          },
        },
        links: [],
      },
    },
  }

  const enzymeWrapper = shallow(<SelectThemeContainer {...props} />)
  return {
    props,
    enzymeWrapper,
  }
}

// Test a components rendering
describe('[COMMON THEME] Testing select theme container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  /**
   * Not tested
   * Behaviour is expected to be extracted from mapStateToProps
   * to be moved to selectors
   *
   * @see http://randycoulman.com/blog/2016/03/15/testing-redux-applications/
   */
  // it('should get state mapped to props', () => {
  // })

  /**
   * Not tested
   * Trivial and not worth testing
   *
   * @see http://randycoulman.com/blog/2016/03/15/testing-redux-applications/
   */
  // it('should get dispatch mapped to props', () => {
  //
  // });

  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()
    const iconMenu = enzymeWrapper.find(IconMenu)
    expect(iconMenu).to.have.length(1)
    const selectFieldProps = iconMenu.props()
    expect(selectFieldProps.value).to.equal(0)
    const menuItems = iconMenu.find(MenuItem)
    expect(menuItems).to.have.length(3)
  })
})
