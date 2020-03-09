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
import { I18nProvider } from '@regardsoss/i18n'
import ContainerShape from '../model/ContainerShape'
import ContainerConfigurationComponent from './ContainerConfigurationComponent'
import messages from '../i18n'

class ContainerConfigurationProvider extends React.Component {
  static propTypes = {
    container: ContainerShape,
    hideDynamicContentOption: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    open: PropTypes.bool,
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <ContainerConfigurationComponent
          container={this.props.container}
          hideDynamicContentOption={this.props.hideDynamicContentOption}
          open={this.props.open}
          onCancel={this.props.onCancel}
          onSubmit={this.props.onSubmit}
        />
      </I18nProvider>
    )
  }
}

export default ContainerConfigurationProvider
