/**
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TEMPORAL_STEP_ENUM, TEMPORAL_STEP_ENUM_TO_SECONDS } from './TemporalStepEnum'
import { TEMPORAL_TYPE_ENUM } from './TemporalTypeEnum'

const PeriodUtils = {
  /**
   * Return a new date increased by the step
   * @param {Date} date
   * @param {TEMPORAL_STEP_ENUM} step
   */
  addStepToDate(date, step) {
    switch (step) {
      case TEMPORAL_STEP_ENUM.SIX_HOURS:
        return new Date(date.getTime() + (TEMPORAL_STEP_ENUM_TO_SECONDS.SIX_HOURS * 1000))
      case TEMPORAL_STEP_ENUM.DAY:
        return new Date(date.getTime() + (TEMPORAL_STEP_ENUM_TO_SECONDS.DAY * 1000))
      case TEMPORAL_STEP_ENUM.MONTH:
        return new Date(new Date(date.getTime()).setUTCMonth(date.getUTCMonth() + 1))
      case TEMPORAL_STEP_ENUM.YEAR:
        return new Date(new Date(date.getTime()).setUTCFullYear(date.getUTCFullYear() + 1))
      default:
        throw new Error(`Missing one TEMPORAL_STEP for the value (${step}) ?`)
    }
  },

  /**
   * Return a new date decreased by the step
   * @param {Date} date
   * @param {TEMPORAL_STEP_ENUM} step
   */
  takeOffStepToDate(date, step) {
    switch (step) {
      case TEMPORAL_STEP_ENUM.SIX_HOURS:
        return new Date(date.getTime() - (TEMPORAL_STEP_ENUM_TO_SECONDS.SIX_HOURS * 1000))
      case TEMPORAL_STEP_ENUM.DAY:
        return new Date(date.getTime() - (TEMPORAL_STEP_ENUM_TO_SECONDS.DAY * 1000))
      case TEMPORAL_STEP_ENUM.MONTH:
        return new Date(new Date(date.getTime()).setUTCMonth(date.getUTCMonth() - 1))
      case TEMPORAL_STEP_ENUM.YEAR:
        return new Date(new Date(date.getTime()).setUTCFullYear(date.getUTCFullYear() - 1))
      default:
        throw new Error(`Missing one TEMPORAL_STEP for the value (${step}) ?`)
    }
  },
  /**
   * Use the array of date to get the next one
   */
  pickNextDate(dateList, currentStep) {
    return dateList[currentStep + 1]
  },
  /**
   * Use the array of date to get the previous one
   */
  pickPreviousDate(dateList, currentStep) {
    return dateList[currentStep - 1]
  },
  /**
   * Return the number of step there is between beginDate and endDate
   * @param {Date} beginDate
   * @param {Date} endDate
   * @param {TEMPORAL_STEP_ENUM} step
   */
  extractNumberOfStep(beginDate, endDate, step) {
    let date = new Date(beginDate.getTime())
    let result = 0
    while (date.getTime() < endDate.getTime()) {
      result += 1
      date = PeriodUtils.addStepToDate(date, step)
    }
    return result
  },
  getNextDate(temporalInfos) {
    switch (temporalInfos.type) {
      case TEMPORAL_TYPE_ENUM.PERIOD:
        return PeriodUtils.addStepToDate(temporalInfos.currentDate, temporalInfos.step)
      case TEMPORAL_TYPE_ENUM.MULTIPLE_VALUES:
        return PeriodUtils.pickNextDate(temporalInfos.dateList, temporalInfos.currentStep)
      default:
        throw new Error(`Cannot compute nextDate for type ${temporalInfos.type}`)
    }
  },
  getPreviousDate(temporalInfos) {
    switch (temporalInfos.type) {
      case TEMPORAL_TYPE_ENUM.PERIOD:
        return PeriodUtils.takeOffStepToDate(temporalInfos.currentDate, temporalInfos.step)
      case TEMPORAL_TYPE_ENUM.MULTIPLE_VALUES:
        return PeriodUtils.pickPreviousDate(temporalInfos.dateList, temporalInfos.currentStep)
      default:
        throw new Error(`Cannot compute previousDate for type ${temporalInfos.type}`)
    }
  },
  /**
   * @param {*} startDate the scenario start date
   * @param {*} startDate the scenario end date
   * @param {*} currentDate the date used in the temporal slider monitor
   * @param {*} nextStepTime the stepTime the user will want
   * @returns the future currentDate and step
   */
  extrapolatesNextDateAndStep(startDate, endDate, currentDate, nextStepTime) {
    let date = new Date(startDate.getTime())
    let reachedCurrentDate = false
    let nextStep = 0
    // do not extrapolates if currentDate is above endDate
    if (currentDate.getTime() <= endDate.getTime()) {
      while (!reachedCurrentDate) {
        const nextDate = PeriodUtils.addStepToDate(date, nextStepTime)
        if (nextDate.getTime() > currentDate.getTime()) {
          reachedCurrentDate = true
        } else {
          nextStep += 1
          date = nextDate
        }
      }
    }
    return {
      currentDate: date,
      step: nextStep,
    }
  },
  /**
   *
   * @param {*} beginDate begin date
   * @param {*} stepTime the type of step time
   * @param {*} step step id
   */
  getDate(beginDate, stepTime, step) {
    let resultingDate = new Date(beginDate.getTime())
    for (let i = 0; i < step; i += 1) {
      resultingDate = PeriodUtils.addStepToDate(resultingDate, stepTime)
    }
    return resultingDate
  },
}

export default PeriodUtils
