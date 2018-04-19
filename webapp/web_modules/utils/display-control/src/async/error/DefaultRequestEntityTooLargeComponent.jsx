/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import { FormattedMessage } from 'react-intl'
import messages from '../../i18n'

const style = {
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

/**
 * In case of an http status 413: Request Entity Too Large
 *
 * @author Xavier-Alexandre Brochard
 */
class DefaultRequestEntityTooLargeComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <div style={style.wrapper}>
          <FormattedMessage id="request.entity.too.large" />
        </div>
      </I18nProvider>
    )
  }
}

export default DefaultRequestEntityTooLargeComponent