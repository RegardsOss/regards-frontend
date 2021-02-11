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

/**
 * Feedback components styles builder
 * @author Raphaël Mechali
 * @return {*} components style
 */
export default (theme) => ({
  feedbackDisplay: {
    paperProps: {
      style: {
        borderRadius: 175,
      },
    },
    contentStyle: {
      width: 350,
      opacity: 0.75,
    },
    bodyStyle: {
      overflowX: 'hidden',
      padding: 0,
      borderRadius: 175,
    },
    layoutStyle: {
      height: 350,
      position: 'relative',
    },
    icon: {
      style: {
        height: 220,
        width: 220,
        top: 65,
        left: 65,
        position: 'absolute',
      },
    },
    progress: {
      size: 330,
      thickness: 5,
      style: {
        position: 'absolute',
        top: 10,
        left: 10,
      },
    },
  },
})
