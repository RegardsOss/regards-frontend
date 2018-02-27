/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export class ThemeListContainer extends React.Component {
  static propTypes = {
    currentTheme: AccessShapes.Theme,
    backUrl: PropTypes.string,
    isCreating: PropTypes.bool,

    fetchTheme: PropTypes.func,
    updateTheme: PropTypes.func,
    createTheme: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      isLoading: !props.isCreating,
    }
  }

  componentDidMount() {
    if (!this.props.isCreating) {
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
      isCreating={this.props.isCreating}
      backUrl={this.props.backUrl}
      onSubmit={this.handleSubmit}
    />
  )

  handleSubmit = (values) => {
    const themeToSave = Object.assign({}, values)
    themeToSave.configuration = JSON.stringify(themeToSave.configuration)
    let task
    if (this.props.isCreating) {
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

export default ThemeListContainer
