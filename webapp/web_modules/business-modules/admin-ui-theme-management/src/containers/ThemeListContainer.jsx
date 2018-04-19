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
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessShapes } from '@regardsoss/shape'
import ThemeListComponent from '../components/ThemeListComponent'
import messages from '../i18n'

/**
 * Handle theme list network operations
 * @author Léo Mieulet
 */
export class ThemeListContainer extends React.Component {
  static propTypes = {
    themeList: AccessShapes.ThemeList,
    backUrl: PropTypes.string,
    createUrl: PropTypes.string,
    handleEdit: PropTypes.func,
    fetchThemeList: PropTypes.func,
    deleteTheme: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentWillMount() {
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

  render() {
    const { themeList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <ThemeListComponent
            themeList={themeList}
            handleDelete={this.handleDelete}
            handleEdit={this.props.handleEdit}
            backUrl={this.props.backUrl}
            createUrl={this.props.createUrl}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default ThemeListContainer