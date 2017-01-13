/*
 * LICENSE_PLACEHOLDER
 */
import { map } from 'lodash'

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
const mobileDurations = {
  enter: 0.225,
  leave: 0.195,
  extra: 0.375,
}

/**
 * Durations on tablet should be about 30% longer than on mobile.
 * For example, a 300ms mobile duration would increase to 390ms on tablet.
 */
const tabletDurations = map(mobileDurations, value => 1.3 * value)

/**
 * Durations on wearables should be about 30% shorter than those on mobile.
 * For example, a 300ms mobile duration would be 210ms on wearables.
 */
const weareableDurations = map(mobileDurations, value => 0.7 * value)

/**
 * Desktop animations should be faster and simpler than their mobile counterparts.
 * These animations should last 150ms to 200ms.
 * Because desktop transitions may be less noticeable, they should be immediately responsive and faster than their mobile counterparts.
 * Complex web transitions often result in dropped frames (unless they are built for GPU acceleration).
 * Shorter durations will make these less noticeable because the animation completes faster.
 */
const desktopDurations = {
  enter: 0.175,
  leave: 0.175,
  extra: 0.200,
}

export default { mobileDurations, tabletDurations, weareableDurations, desktopDurations }
export { mobileDurations }
export { tabletDurations }
export { weareableDurations }
export { desktopDurations }
