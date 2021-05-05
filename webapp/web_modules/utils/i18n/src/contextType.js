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
// Last react-intl does not provide any proptypes anymore
const contextType = {
  intl: PropTypes.shape({
    locale: PropTypes.string,
    formatMessage: PropTypes.function,
    formatDate: PropTypes.function,
    formatTime: PropTypes.function,
    formatRelativeTime: PropTypes.function,
    formatNumber: PropTypes.function,
    formatPlural: PropTypes.function,
    now: PropTypes.function,
  }).isRequired,

}

export default contextType
