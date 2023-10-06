/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import root from 'window-or-global'
import isNumber from 'lodash/isNumber'

/**
   * Scroll the browser to the destination
   */
function scrollTo(destination, duration = 200, callback) {
  const easeInOutQuint = function (t) {
    // eslint-disable-next-line
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + (16 * (--t) * t * t * t * t)
  }

  const start = root.pageYOffset
  const startTime = 'now' in root.performance ? performance.now() : new Date().getTime()

  const documentHeight = Math.max(root.document.body.scrollHeight, root.document.body.offsetHeight, root.document.documentElement.clientHeight, root.document.documentElement.scrollHeight, root.document.documentElement.offsetHeight)
  const windowHeight = root.innerHeight || root.document.documentElement.clientHeight || root.document.getElementsByTagName('body')[0].clientHeight
  const destinationOffset = isNumber(destination) ? destination : destination.offsetTop
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

  if ('requestAnimationFrame' in root === false) {
    window.scroll(0, destinationOffsetToScroll)
    if (callback) {
      callback()
    }
  }

  function scroll() {
    const now = 'now' in root.performance ? performance.now() : new Date().getTime()
    const time = Math.min(1, ((now - startTime) / duration))
    const timeFunction = easeInOutQuint(time)
    root.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start))

    if (root.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback()
      }
      return
    }

    requestAnimationFrame(scroll)
  }
  scroll()
}

export default {
  scrollTo,
}
