/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Tool to wait for a 'stability' time before performing an operation: Each time the delayer is called 'pushes away'
 * the callback. After delay ellapsed, without the delayer being invoked, the callback is invoked
 * Used for user inputs grouping (keyboad / mouse move...)
 *
 * @author Raphaël Mechali
 */
export class StabilityDelayer {
  /** Commonly waited time to assert user finished typing on keyboard */
  static COMMON_KEYBOARD_INPUT_LATENCY = 500


  /**
   * Constructor
   * @param {number} delay 'stability' delay
   */
  constructor(delay = StabilityDelayer.COMMON_KEYBOARD_INPUT_LATENCY) {
    this.delay = delay
    this.currentTimer = null
  }

  /**
   * On event: starts 'stabilization' period then invokes callback (last provided) when stabilized
   * @param {Function} callback to invoke when stabilized (only last one will be invoked)
   */
  onEvent(callback) {
    this.cancel()
    this.callback = callback
    this.currentTimer = setTimeout(this.onDelayWaited, this.delay)
  }

  /**
   * Timer callback: calls the user callback and clears state
   */
  onDelayWaited = () => {
    if (this.callback) {
      this.callback()
    }
    this.currentTimer = null
    this.callback = null
  }

  /**
   * Cancels any waiting operation
   */
  cancel = () => {
    if (this.currentTimer) {
      root.clearTimeout(this.currentTimer)
      this.currentTimer = null
      this.callback = null
    }
  }
}
