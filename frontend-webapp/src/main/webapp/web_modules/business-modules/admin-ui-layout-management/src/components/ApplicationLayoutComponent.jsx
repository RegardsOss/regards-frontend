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
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { reduxForm } from '@regardsoss/form-utils'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { LayoutConfigurationComponent, DefaultLayout } from '@regardsoss/layout'
import LayoutActions from '../model/LayoutActions'

/**
 * React component to display and configure a given layout
 * @author Sébastien binda
 */
class ApplicationLayoutComponent extends React.Component {
  static propTypes = {
    layout: AccessShapes.Layout,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    // from reduxForm
    change: PropTypes.func,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static UPDATE_DEPENDENCIES = [LayoutActions.getDependency(RequestVerbEnum.PUT)]

  constructor(props) {
    super(props)
    this.state = {
      currentLayout: null,
    }
  }

  componentWillMount() {
    const initialLayout = this.getInitialLayout(this.props.layout)
    this.setState({
      currentLayout: initialLayout,
    })
    this.props.initialize({
      layout: initialLayout,
    })
  }

  getInitialLayout = (layout) => {
    const initialLayout = layout || DefaultLayout
    return initialLayout.id && initialLayout.type ? initialLayout : DefaultLayout
  }

  changeLayout = (layout) => {
    this.props.change('layout', layout)
    this.setState({
      currentLayout: layout,
    })
  }

  render() {
    const { pristine, submitting } = this.props
    const style = { width: '100%' }
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'layout.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'layout.subtitle' })}
          />
          <CardText style={style} >
            <LayoutConfigurationComponent
              layout={this.state.currentLayout}
              onChange={this.changeLayout}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'layout.submit' })}
              mainButtonType="submit"
              mainHateoasDependencies={ApplicationLayoutComponent.UPDATE_DEPENDENCIES}
              isMainButtonDisabled={pristine || submitting}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'layout.cancel' })}
              secondaryButtonTouchTap={this.props.onCancel}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'app-layout-form',
})(ApplicationLayoutComponent)
