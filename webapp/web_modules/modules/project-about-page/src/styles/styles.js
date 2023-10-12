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
const projectAboutPageStyles = (theme) => ({
  dialog: {
    heightPercent: 80,
    widthPercent: 65,
    button: {
      position: 'fixed',
      bottom: 10,
      right: 15,
      zIndex: 5000,
    },
    titleStyle: {
      height: '20px',
      fontSize: '1em',
      display: 'flex',
      alignItems: 'center',
    },
  },
  iFrameWrapper: {
    margin: 'auto',
    width: '90%',
    height: 500,
    marginTop: 20,
  },
  iFrame: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  adminIframeLoading: {
    margin: 'auto',
  },
})

export default projectAboutPageStyles
