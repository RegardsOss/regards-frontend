/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Redefine the {@link reduxForm} decorator by forcing the configuration option {@code pure} to {@code false}.
 *
 * Why?
 *
 * By default, it is set to true.
 * When the option {@code pure} is {@code true}, the generated component (called {@link Form}) ONLY re-renders when some
 * props (or its state) change, but not all props; certainly for otpimization purposes.
 *
 * Because of this, the {@link Form} and its children refuse to update on theme or language change when using HOCs like
 * {@link MuiThemeProvider} or {@link IntlProvider}.
 * Using {@code pure : false} solves this issue.
 *
 * @author Xavier-Alexandre Brochard
 */
const impureReduxForm = config => reduxForm(Object.assign({}, config, { pure: false }))
export default impureReduxForm
