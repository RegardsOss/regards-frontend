/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/
import ReportIcon from 'material-ui/svg-icons/content/report'
import { CardText, CardTitle } from 'material-ui/Card'

export class MizarError extends React.Component {
  static wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  static iconStyle = {
    margin: 'auto',
    display: 'block',
    height: 96,
    width: 96,
  }

  renderIcon = () => (
    <ReportIcon
      style={MizarError.iconStyle}
      color="#E9483F"
    />
  )

  render() {
    return (
      <div>
        <div className="visible-xs-block">
          {this.renderIcon()}
        </div>
        <div className="row" style={MizarError.wrapperStyle}>
          <div className="col-sm-25 hidden-xs">
            {this.renderIcon()}
          </div>
          <div className="col-xs-100 col-sm-75">
            <CardTitle
              title="Something went wrong !"
              subtitle="WebGL is not activated."
            />
            <CardText>
              This application cannot be displayed on your browser - try to install an updated version of Chromes or Firefox.
              <br />
              If you&apos;re already running one of these browsers, your operating system is too old.
            </CardText>
          </div>
        </div>
      </div>
    )
  }
}

export default MizarError
