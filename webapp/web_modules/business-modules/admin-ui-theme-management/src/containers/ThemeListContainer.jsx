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
import { AccessShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ThemeListComponent from '../components/list/ThemeListComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * Handle theme list network operations
 * @author Léo Mieulet
 */
export class ThemeListContainer extends React.Component {
  static propTypes = {
    themeList: AccessShapes.ThemeList,
    backUrl: PropTypes.string.isRequired,
    createUrl: PropTypes.string.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    fetchThemeList: PropTypes.func.isRequired,
    deleteTheme: PropTypes.func.isRequired,
    updateTheme: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
  }

  UNSAFE_componentWillMount() {
    Promise.resolve(this.props.fetchThemeList())
      .then((actionResult) => {
        if (!actionResult.error) {
          this.setState({
            isLoading: false,
          })
        }
      })
  }

  handleDelete = (themeId) => {
    this.props.deleteTheme(themeId)
  }

  handleUpdate = (theme) => {
    this.props.updateTheme(theme)
  }

  render() {
    const {
      themeList, handleEdit, handleDuplicate, backUrl, createUrl,
    } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isLoading}
          >
            <ThemeListComponent
              themeList={themeList}
              handleDelete={this.handleDelete}
              handleEdit={handleEdit}
              handleDuplicate={handleDuplicate}
              backUrl={backUrl}
              createUrl={createUrl}
              handleUpdate={this.handleUpdate}
            />
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default ThemeListContainer
