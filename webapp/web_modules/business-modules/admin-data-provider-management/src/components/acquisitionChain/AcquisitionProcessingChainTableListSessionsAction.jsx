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
import { Link } from 'react-router'
import RunIcon from 'mdi-material-ui/FormatListBulleted'
import IconButton from 'material-ui/IconButton'
import { UIDomain, AdminDomain } from '@regardsoss/domain'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* User Callback, onclick will show list
* @author Sébastien Binda
*/
class AcquisitionProcessingChainTableListSessionsAction extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { project } = this.props
    const { intl: { formatMessage } } = this.context
    const { chain } = this.props.entity.content
    const locationDescriptorObject = UIDomain.FiltersPaneHelper.buildLocationDescriptorObject(AdminDomain.DashboardFilters.builder(chain.label).withSelectedSource(chain.label).build(), [],
      `/admin/${project}/data/acquisition/dashboard/monitor`)
    return (
      <Link to={locationDescriptorObject}>
        <IconButton
          title={formatMessage({ id: 'acquisition-chain.list.list.tooltip' })}
          iconStyle={AcquisitionProcessingChainTableListSessionsAction.iconStyle}
          style={AcquisitionProcessingChainTableListSessionsAction.buttonStyle}
        >
          <RunIcon />
        </IconButton>
      </Link>
    )
  }
}
export default AcquisitionProcessingChainTableListSessionsAction
