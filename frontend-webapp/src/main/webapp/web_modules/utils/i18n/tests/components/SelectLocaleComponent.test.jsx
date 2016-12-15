import { shallow } from 'enzyme'
import { expect } from 'chai'
import * as sinon from 'sinon'
import MenuItem from 'material-ui/MenuItem'
import SelectLocaleComponent from '../../src/components/SelectLocaleComponent'

// Test a components rendering

describe('[COMMON] Testing i18n Select Locale components', () => {
  it('Should render correctly the SelectLocaleComponent', () => {
    const onLocaleChange = (locale) => {
      expect(locale).to.equals('es')
    }
    const spy = sinon.spy(onLocaleChange)
    const props = {
      setLocale: spy,
      currentLocale: 'ru',
      locales: ['fr', 'en', 'ru', 'es'],
    }

    const context = {
      intl: {
        formatMessage: message => message.id,
      },
      muiTheme: {
        menu: {
          localeDropdown: {
          },
        },
      },
    }

    const wrapper = shallow(<SelectLocaleComponent {...props} />, { context })
    expect(wrapper.find(MenuItem)).to.have.length(4)
  })
})
