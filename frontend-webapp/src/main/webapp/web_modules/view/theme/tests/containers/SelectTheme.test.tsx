import { shallow } from "enzyme"
import { expect } from "chai"
import { SelectTheme } from "../../src/containers/SelectTheme"
import ThemeHelper from "../../src/ThemeHelper"
import MenuItem from "material-ui/MenuItem"
import { IconMenu } from "material-ui/IconMenu"

function setup (): any {
  const props = {
    theme: 'titi'
  }
  const enzymeWrapper = shallow(<SelectTheme {...props}/>)
  return {
    props,
    enzymeWrapper
  }
}

// Test a component rendering
describe('[COMMON] Testing select theme container', () => {

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
    // Mock the themes list
    ThemeHelper.getThemes = () => ['titi', 'toto']

    const {enzymeWrapper} = setup()
    const iconMenu = enzymeWrapper.find(IconMenu)
    expect(iconMenu).to.have.length(1)
    const selectFieldProps = iconMenu.props()
    expect(selectFieldProps.value).to.equal('titi')
    // expect(selectFieldProps.onChange).to.equal(SelectTheme.prototype.handleChange)
    const menuItems = iconMenu.find(MenuItem)
    expect(menuItems).to.have.length(2)
    // expect(menuItem0Props.value).to.equal('titi')
    // expect(menuItem0Props.key).to.equal('titi')
    // expect(menuItem0Props.primaryText).to.equal('titi')
    // const menuItem1Props: MenuItemPropTypes = menuItems[1].props()
    // expect(menuItem1Props.value).to.equal('toto')
    // expect(menuItem1Props.key).to.equal('toto')
    // expect(menuItem1Props.primaryText).to.equal('toto')
  })

})
