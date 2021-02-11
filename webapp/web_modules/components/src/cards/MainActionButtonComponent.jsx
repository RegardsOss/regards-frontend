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
import RaisedButton from 'material-ui/RaisedButton'
import ActionButtonComponent from './ActionButtonComponent'

/**
 * Generic back button
 */
function MainActionButtonComponent(props) {
  return (<ActionButtonComponent
    button={RaisedButton}
    primary
    {...props}
  />)
}
MainActionButtonComponent.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  url: PropTypes.string,
  type: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  onClick: PropTypes.func,
  isVisible: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
}
export default MainActionButtonComponent
