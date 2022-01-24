/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import I18nProvider from './containers/I18nProvider'

/**
 * Decorator adding the I18nProvider around a React Component
 *
 * @author Xavier-Alexandre Brochard
 */
const withI18n = (messages, stackCallingContext = false) => (Component) => class WithI18n extends React.Component {
  render() {
    return (
      <I18nProvider messages={messages} stackCallingContext={stackCallingContext}>
        <Component {...this.props} />
      </I18nProvider>
    )
  }
}

export default withI18n
