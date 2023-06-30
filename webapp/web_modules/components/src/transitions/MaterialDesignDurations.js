/*
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
 */
import map from 'lodash/map'

/**
 * Implement the motion durations as defined by the Google's Material Design specification.
 * All numeric values are in milliseconds.
 *
 * @see https://material.io/guidelines/motion/duration-easing.html#duration-easing-natural-easing-curves
 * @author Xavier-Alexandre Brochard
 */

/**
 * Transitions on mobile typically occur over 300ms, within this margin of variance:
 * - Large, complex, full-screen transitions may have longer durations, occurring over 375ms
 * - Elements entering the screen occur over 225ms
 * - Elements leaving the screen occur over 195ms
 *
 * Transitions that exceed 400ms may feel too slow.
 */
export const mobileDurations = {
  enter: 0.225,
  leave: 0.195,
  extra: 0.375,
}

/**
 * Durations on tablet should be about 30% longer than on mobile.
 * For example, a 300ms mobile duration would increase to 390ms on tablet.
 */
export const tabletDurations = map(mobileDurations, (value) => 1.3 * value)

/**
 * Durations on wearables should be about 30% shorter than those on mobile.
 * For example, a 300ms mobile duration would be 210ms on wearables.
 */
export const weareableDurations = map(mobileDurations, (value) => 0.7 * value)

/**
 * Desktop animations should be faster and simpler than their mobile counterparts.
 * These animations should last 150ms to 200ms.
 * Because desktop transitions may be less noticeable, they should be immediately responsive and faster than their mobile counterparts.
 * Complex web transitions often result in dropped frames (unless they are built for GPU acceleration).
 * Shorter durations will make these less noticeable because the animation completes faster.
 */
export const desktopDurations = {
  enter: 0.175,
  leave: 0.175,
  extra: 0.200,
}
