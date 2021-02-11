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
import IconButton from 'material-ui/IconButton'
import PauseIcon from 'mdi-material-ui/Pause'
import ResumeIcon from 'mdi-material-ui/Play'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Pause / resume order table option
 * @author Raphaël Mechali
 */
class PauseResumeOrderComponent extends React.Component {
  static propTypes = {
    canUpdate: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    onPause: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const {
      canUpdate, isPaused, onPause, onResume,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        disabled={!canUpdate}
        onClick={isPaused ? onResume : onPause}
        title={
          isPaused
            ? formatMessage({ id: 'order.list.option.cell.resume.order.tooltip' })
            : formatMessage({ id: 'order.list.option.cell.pause.order.tooltip' })
        }
      >
        {
          isPaused ? <ResumeIcon /> : <PauseIcon />
        }
      </IconButton>
    )
  }
}
export default PauseResumeOrderComponent
