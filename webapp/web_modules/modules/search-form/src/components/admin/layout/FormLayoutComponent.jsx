/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import merge from 'lodash/merge'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActions } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { AccessShapes } from '@regardsoss/shape'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import { LayoutConfigurationComponent, DefaultLayout } from '@regardsoss/layout'
import { FormPresentation, FieldsGroup } from '@regardsoss/form-utils'

const searchFormDefaultLayout = merge({}, DefaultLayout('FormMainContainer'), {
  containers: [
    {
      id: 'defaultCriterionLine',
      type: 'RowContainer',
      classes: [],
      styles: {},
      containers: [],
    },
  ],
})

/**
 * Component to display the search form layout configuration panel
 * @author Sébastien binda
 */
class FormLayoutComponent extends React.Component {
  static propTypes = {
    currentNamespace: PropTypes.string,
    defaultLayout: AccessShapes.ContainerContent,
    changeField: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }


  constructor(props) {
    super(props)
    this.CONF_LAYOUT = `${props.currentNamespace}.layout`
  }

  componentWillMount() {
    const initialLayout = this.getInitialLayout(this.props.defaultLayout)
    this.setState({
      currentLayout: initialLayout,
    })
    this.props.changeField(this.CONF_LAYOUT, initialLayout)
  }

  getInitialLayout = (layout) => {
    const initialLayout = layout || searchFormDefaultLayout
    return initialLayout.id && initialLayout.type ? initialLayout : searchFormDefaultLayout
  }

  changeLayout = (layout) => {
    this.props.changeField(this.CONF_LAYOUT, layout)
    this.setState({
      currentLayout: layout,
    })
  }

  resetLayout = () => {
    const initialLayout = this.getInitialLayout(this.props.defaultLayout)
    this.props.changeField(this.CONF_LAYOUT, initialLayout)
    this.setState({
      currentLayout: initialLayout,
    })
  }

  render() {
    const { currentNamespace } = this.props
    return (
      <div>
        <FormPresentation>
          <ModulePaneStateField currentNamespace={currentNamespace} />
          <FieldsGroup
            title={this.context.intl.formatMessage({ id: 'form.layout.tab.title' })}
            spanFullWidth
          >
            <LayoutConfigurationComponent
              layout={this.state.currentLayout}
              hideDynamicContentOption
              onChange={this.changeLayout}
            />
          </FieldsGroup>
        </FormPresentation>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'form.layout.tab.reset' })}
            mainButtonType="reset"
            mainButtonClick={this.resetLayout}
          />
        </CardActions>
      </div>
    )
  }
}

export default FormLayoutComponent
