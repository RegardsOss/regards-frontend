/*
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
 */
import CubicBezier from './CubicBezier'

/**
 * Implement the motion easing functions as defined by the Google's Material Design specification.
 *
 * @see https://material.io/guidelines/motion/duration-easing.html#duration-easing-natural-easing-curves
 * @author Xavier-Alexandre Brochard
 */

/**
 * The standard curve (also referred to as “ease in out”) is the most common easing curve.
 * Elements quickly accelerate and slowly decelerate between on-screen locations.
 * It applies to growing and shrinking material, among other property changes.
 */
export const standardCurve = CubicBezier.config(0.4, 0.0, 0.2, 1)

/**
 * Using the deceleration curve (also referred to as “ease out”) elements enter the screen at full velocity and slowly decelerate to a resting point.
 * During deceleration, elements may scale up either in size (to 100%) or opacity (to 100%).
 * In some cases, when elements enter the screen at 0% opacity, they may slightly shrink from a larger size upon entry.
 */
export const decelerationCurve = CubicBezier.config(0.0, 0.0, 0.2, 1)

/**
 * Using the acceleration curve (also referred to as “ease in”) elements leave the screen at full velocity.
 * They do not decelerate when off-screen.
 * They accelerate at the beginning of the animation and may scale down in either size (to 0%) or opacity (to 0%).
 * In some cases, when elements leave the screen at 0% opacity, they may also slightly scale up or down in size.
 */
export const accelerationCurve = CubicBezier.config(0.4, 0.0, 1, 1)

/**
 * Using the sharp curve (also referred to as “ease in out”) elements quickly accelerate and decelerate.
 * It is used by exiting elements that may return to the screen at any time.
 * Elements may quickly accelerate from a starting point on-screen, then quickly decelerate in a symmetrical curve to a resting point immediately off-screen.
 * The deceleration is faster than the standard curve since it doesn't follow an exact path to the off-screen point.
 * Elements may return from that point at any time.
 */
export const sharpCurve = CubicBezier.config(0.0, 0.0, 0.2, 1)
