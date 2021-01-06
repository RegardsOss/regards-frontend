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
import { reduxForm } from 'redux-form'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Redefine the {@link reduxForm} decorator by wrapping it in context redrawer.
 * The previous implementation was using impure forms but it had a major drawback: every time the redux store changed, the form was
 * fully rendering, reseting every volatile UI state like scrolling positions in pop up list.
 * So far this workaround implementation has no know drawback, even if it make the react tree more complicated (adds one level by form)
 *
 * @author Raphaël Mechali
 */

/**
 * Mimics reduxForm(config) method but, building a method like Component class => Wrapped component class.
 * @param {*} config redux form configuration
 * @return {Function} (Component class) => (Wrapped Component class)
 */
function formWithContext(config) {
  // Wrap redux connector in a function that renders the context redrawer around form
  /**
   * This function corresponds to the one returned by reduxForm(config). It takes as parameter the
   * form component to wrap
   * @param {Function} FormComponent form component
   * @return
   */
  return function wrapFormInContextRedrawer(FormComponent) {
    // Build the resulting redux form component
    const InnerReduxForm = reduxForm(config)(FormComponent)
    /**
     * Inner wrapping class that will force pure form component to redraw
     * when context changes by providing context as property
     * @author Raphaël Mechali
     */
    return class FormWithContextRedraw extends React.Component {
      static contextTypes = {
        ...themeContextType,
        ...i18nContextType,
      }

      render() {
        return (
          <InnerReduxForm
            context={this.context} // this ensures the form properties change when context changes
            {...this.props}
          />)
      }
    }
  }
}

export default formWithContext
