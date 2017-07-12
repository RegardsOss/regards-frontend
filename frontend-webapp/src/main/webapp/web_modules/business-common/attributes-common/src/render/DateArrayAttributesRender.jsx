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
import map from 'lodash/map'
import { FormattedDate, FormattedTime } from 'react-intl'

/**
 * Component to display Date Array attributes group value
 *
 * @author Sébastien binda
 */
class DateArrayAttributeRender extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: PropTypes.object,
  }

  render() {
    return (<span>
      {map(this.props.attributes, (attribute, key) => {
        if (attribute && Array.isArray(attribute)) {
          return (<div key={key}>
            {map(attribute, (date, key2) => {
              const dateWrapper = new Date(date)
              if (!isNaN(dateWrapper.getDate())) {
                return (
                  <div key={key2}>
                    <FormattedDate value={date} />
                    {' '}
                    <FormattedTime value={date} />
                  </div>
                )
              }
              return null
            },
            )}
          </div>
          )
        }
        return null
      })}
    </span>
    )
  }

}

export default DateArrayAttributeRender
