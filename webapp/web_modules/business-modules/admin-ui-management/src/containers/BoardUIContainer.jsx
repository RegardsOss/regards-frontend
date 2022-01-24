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
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import BoardUIComponent from '../components/BoardUIComponent'
import messages from '../i18n'

/**
 * Module container to display the list of applications.
 * @author Sébastien binda
 */
export class BoardUIContainer extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <BoardUIComponent project={this.props.params.project} />
      </I18nProvider>
    )
  }
}

export default BoardUIContainer
