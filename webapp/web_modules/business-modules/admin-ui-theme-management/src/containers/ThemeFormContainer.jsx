/**
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
 **/
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessShapes } from '@regardsoss/shape'
import { browserHistory } from 'react-router'
import ThemeFormComponent from '../components/ThemeFormComponent'
import messages from '../i18n'

/**
 * Handle theme list network operations
 * @author Léo Mieulet
 */
export class ThemeFormContainer extends React.Component {
  static propTypes = {
    currentTheme: AccessShapes.Theme,
    themeList: AccessShapes.ThemeList,
    backUrl: PropTypes.string,
    isCreating: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isDuplicating: PropTypes.bool.isRequired,

    fetchTheme: PropTypes.func.isRequired,
    updateTheme: PropTypes.func.isRequired,
    createTheme: PropTypes.func.isRequired,
  }

  state = {
    isLoading: !this.props.isCreating,
  }

  componentDidMount() {
    const { isEditing, isDuplicating } = this.props
    if (isEditing || isDuplicating) {
      // retrieve original theme model
      Promise.resolve(this.props.fetchTheme())
        .then((actionResult) => {
          if (!actionResult.error) {
            this.setState({
              isLoading: false,
            })
          }
        })
    }
  }

  getForm = () => (
    <ThemeFormComponent
      currentTheme={this.props.currentTheme}
      themeList={this.props.themeList}
      isCreating={this.props.isCreating}
      isEditing={this.props.isEditing}
      isDuplicating={this.props.isDuplicating}
      backUrl={this.props.backUrl}
      onSubmit={this.handleSubmit}
    />
  )

  handleSubmit = (values) => {
    const themeToSave = { ...values }
    themeToSave.configuration = JSON.stringify(themeToSave.configuration)
    let task
    if (this.props.isCreating || this.props.isDuplicating) {
      task = this.props.createTheme(themeToSave)
    } else {
      task = this.props.updateTheme(themeToSave)
    }
    task.then((actionResult) => {
      if (!actionResult.error) {
        browserHistory.push(this.props.backUrl)
      }
    })
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getForm}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default ThemeFormContainer
