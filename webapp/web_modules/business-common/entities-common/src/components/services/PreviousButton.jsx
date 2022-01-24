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
import FlatButton from 'material-ui/FlatButton'
import PreviousIcon from 'mdi-material-ui/ChevronLeft'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Button to show previous step action
* @author Raphaël Mechali
*/
class PreviousButton extends React.Component {
  static propTypes = {
    onPrevious: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { onPrevious } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FlatButton
        icon={<PreviousIcon />}
        label={formatMessage({ id: 'entities.common.services.change.parameters' })}
        title={formatMessage({ id: 'entities.common.services.change.parameters' })}
        onClick={onPrevious}
      />
    )
  }
}

export default PreviousButton
