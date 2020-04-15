"use strict";

/* ---- Start of Atronomical constants ---- */

const epoch = 2444238.5; // 1980 January 0.0

/* Constants defining the Sun's apparent orbit */
const eLonge = 278.833540; // Ecliptic longitude of the Sun at epoch 1980.0
const elongp = 282.596403; // Ecliptic longitude of the Sun at perigee
const eccent = 0.016718; // Eccentricity of Earth's orbit
const sunsmax = 1.495985e8; // Semi-major axis of Earth's orbit, km
const sunangsiz = 0.533128; // Sun's angular size, degrees, at semi-major axis distance

/* Elements of the Moon's orbit, epoch 1980.0 */
const mmlong = 64.975464; // Moon's mean longitude at the epoch
const mmlongp = 349.383063; // Mean longitude of the perigee at the epoch
const mlnode = 151.950429; // Mean longitude of the node at the epoch
const minc = 5.145396; // Inclination of the Moon's orbit */
const mecc = 0.054900; // Eccentricity of the Moon's orbit */
const mangsiz = 0.5181; // Moon's angular size at distance a from Earth
const msmax = 384401.0; // Semi-major axis of Moon's orbit in km
const mparallax = 0.9507; // Parallax at distance a from Earth
const synmonth =  29.53058868; // Synodic month (new Moon to new Moon)
const lunatbase = 2423436.0; // Base date for E. W. Brown's numbered series of lunations (1923 January 16)

/*  Properties of the Earth  */
const earthrad = 6378.16; // Radius of Earth in kilometres
const PI = 3.14159265358979323846;  // Assume not near black hole nor in Tennessee

/* ---- End of Atronomical constants ---- */

class Moon {

  constructor(dateNow) {
    this.dateNow = dateNow;
  }
}

module.exports = Moon;