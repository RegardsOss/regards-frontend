/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import join from 'lodash/join'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SubSectionCard } from '@regardsoss/components'
/**
* Component to display a SIP submission result from server.
* @author Sébastien Binda
*/
export class SIPSubmissionInfos extends React.Component {
  static propTypes = {
    allocationStrategy: PropTypes.string,
    storages: PropTypes.arrayOf(PropTypes.string),
  }

  static contextTypes = {
    // enable i18n access trhough this.context
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {}

  render() {
    const { allocationStrategy, storages } = this.props
    const { muiTheme } = this.context
    if (allocationStrategy && storages) {
      const decoratedAS = (
        <span style={{ color: muiTheme.palette.accent1Color }}>
          {allocationStrategy}
        </span>
      )
      const decoratedStorages = (
        <span style={{ color: muiTheme.palette.accent1Color }}>
          {join(storages, ' || ')}
        </span>
      )

      const values = {
        allocationStrategy: decoratedAS,
        storages: decoratedStorages,
      }
      const content = <FormattedMessage
        id="sips.submission-summary.details"
        values={values}
      />
      return <SubSectionCard>{content}</SubSectionCard>
    }
    return null
  }
}
export default SIPSubmissionInfos
