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

export default (theme) => ({
  inErrorCell: {
    color: theme.formsExtensions.validation.errorColor,
    fontWeight: 'bolder',
  },
  validCell: {
    color: theme.palette.textColor,
    fontWeight: 'normal',
  },
  downloadWithCount: {
    iconButton: {
      style: { padding: 0 },
      iconStyle: { position: 'relative', width: theme.button.iconButtonSize, height: theme.button.iconButtonSize },
    },
    overlay: {
      style: {
        position: 'absolute',
        top: 5 * theme.button.iconButtonSize / 9,
        left: 5 * theme.button.iconButtonSize / 9,
        zIndex: '1',
      },
      chip: {
        style: {
          backgroundColor: theme.palette.accent1Color,
        },
        labelStyle: {
          padding: '1px 3px',
          lineHeight: undefined,
        },
      },
    },
    icon: {
      style: { position: 'absolute', left: theme.spacing.iconSize / 2, top: theme.spacing.iconSize / 2 },
    },
  },
})
