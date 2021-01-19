/*
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { I18nProvider } from '@regardsoss/i18n'
import ProjectConnectionsContainer from './ProjectConnectionsContainer'
import messages from '../../i18n'

/**
 * I18n Provider for ProjectConnectionsContainer
 */
export class ProjectConnectionsProvider extends React.Component {
  render() {
    return (
      <I18nProvider messages={messages}>
        <ProjectConnectionsContainer
          {...this.props}
        />
      </I18nProvider>
    )
  }
}

export default ProjectConnectionsProvider
