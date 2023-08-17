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
import values from 'lodash/values'
import convert from 'convert-units'

export const UNITS_ENUM = {
  // Length
  MM: 'mm',
  CM: 'cm',
  M: 'm',
  IN: 'in',
  FT_US: 'ft-us',
  FT: 'ft',
  MI: 'mi',
  // Area
  MM2: 'mm2',
  CM2: 'cm2',
  M2: 'm2',
  HA: 'ha',
  KM2: 'km2',
  IN2: 'in2',
  FT2: 'ft2',
  AC: 'ac',
  MI2: 'mi2',
  // Mass
  MCG: 'mcg',
  MG: 'mg',
  G: 'g',
  KG: 'kg',
  OZ: 'oz',
  LB: 'lb',
  MT: 'mt',
  T: 't',
  // Volume
  MM3: 'mm3',
  CM3: 'cm3',
  ML: 'ml',
  L: 'l',
  KL: 'kl',
  M3: 'm3',
  KM3: 'km3',
  TSP: 'tsp',
  TBS: 'Tbs',
  IN3: 'in3',
  FL_OZ: 'fl-oz',
  CUP: 'cup',
  PNT: 'pnt',
  QT: 'qt',
  GAL: 'gal',
  FT3: 'ft3',
  YD3: 'yd3',
  // Volume Flow Rate
  MM3_S: 'mm3/s',
  CM3_S: 'cm3/s',
  ML_S: 'ml/s',
  CL_S: 'cl/s',
  DL_S: 'dl/s',
  L_S: 'l/s',
  L_MIN: 'l/min',
  L_H: 'l/h',
  KL_S: 'kl/s',
  KL_MIN: 'kl/min',
  KL_H: 'kl/h',
  M3_S: 'm3/s',
  M3_MIN: 'm3/min',
  M3_H: 'm3/h',
  KM3_S: 'km3/s',
  TSP_S: 'tsp/s',
  TBS_S: 'Tbs/s',
  IN3_S: 'in3/s',
  IN3_MIN: 'in3/min',
  IN3_H: 'in3/h',
  FL_OZ_S: 'fl-oz/s',
  FL_OZ_MIN: 'fl-oz/min',
  FL_OZ_H: 'fl-oz/h',
  CUP_S: 'cup/s',
  PNT_S: 'pnt/s',
  PNT_MIN: 'pnt/min',
  PNT_H: 'pnt/h',
  QT_S: 'qt/s',
  GAL_S: 'gal/s',
  GAL_MIN: 'gal/min',
  GAL_H: 'gal/h',
  FT3_S: 'ft3/s',
  FT3_MIN: 'ft3/min',
  FT3_H: 'ft3/h',
  YD3_S: 'yd3/s',
  YD3_MIN: 'yd3/min',
  YD3_H: 'yd3/h',
  // Temperature
  C: 'C',
  F: 'F',
  K: 'K',
  R: 'R',
  // Time
  NS: 'ns',
  MU: 'mu',
  MS: 'ms',
  S: 's',
  MIN: 'min',
  H: 'h',
  D: 'd',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  // Frequency
  HZ: 'Hz',
  mHZ: 'mHz',
  KHZ: 'kHz',
  MHZ: 'MHz',
  GHZ: 'GHz',
  THZ: 'THz',
  RPM: 'rpm',
  DEG_S: 'deg/s',
  RAD_S: 'rad/s',
  // Speed
  M_S: 'm/s',
  KM_H: 'km/h',
  M_H: 'm/h',
  KNOT: 'knot',
  FT_S: 'ft/s',
  // Pace
  S_M: 's/m',
  MIN_KM: 'min/km',
  S_FT: 's/ft',
  // Pressure
  PA: 'Pa',
  HPA: 'hPa',
  KPA: 'kPa',
  MPA: 'MPa',
  BAR: 'bar',
  TOOR: 'torr',
  PSI: 'psi',
  KSI: 'ksi',
  // Digital
  b: 'b',
  Kb: 'Kb',
  Mb: 'Mb',
  Gb: 'Gb',
  Tb: 'Tb',
  B: 'B',
  KB: 'KB',
  MB: 'MB',
  GB: 'GB',
  TB: 'TB',
  // Illuminance
  LX: 'lx',
  FT_CD: 'ft-cd',
  // Parts-Per
  PPM: 'ppm',
  PPB: 'ppb',
  PPT: 'ppt',
  PPQ: 'ppq',
  // Voltage
  V: 'V',
  MV: 'mV',
  KV: 'kV',
  // Current
  A: 'A',
  MA: 'mA',
  KA: 'kA',
  // Power
  W: 'W',
  mW: 'mW',
  KW: 'kW',
  MW: 'MW',
  GW: 'GW',
  // Apparent Power
  VA: 'VA',
  mVA: 'mVA',
  KVA: 'kVA',
  MVA: 'MVA',
  GVA: 'GVA',
  // Reactive Power
  VAR: 'VAR',
  mVAR: 'mVAR',
  kvar: 'kVAR',
  mvar: 'MVAR',
  gvar: 'GVAR',
  // Energy
  wh: 'Wh',
  mWH: 'mWh',
  KWH: 'kWh',
  MWH: 'MWh',
  GWH: 'GWh',
  J: 'J',
  KJ: 'kJ',
  // Reactive Energy
  VARH: 'VARh',
  mVARH: 'mVARh',
  KVARH: 'kVARh',
  MVARH: 'MVARh',
  GVARH: 'GVARh',
  // Angle
  DEG: 'deg',
  RAD: 'rad',
  GRAD: 'grad',
  ARCMIN: 'arcmin',
  ARCSEC: 'arcsec',
}

export const UNITS = values(UNITS_ENUM)

export function convertValue(value, fromUnit, toUnit) {
  return convert(value).from(fromUnit).to(toUnit)
}
