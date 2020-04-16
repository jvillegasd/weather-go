class Moon {

  /* ---- Start of Atronomical constants ---- */

  epoch = 2444238.5; // 1980 January 0.0

  /* Constants defining the Sun's apparent orbit */
  elonge = 278.833540; // Ecliptic longitude of the Sun at epoch 1980.0
  elongp = 282.596403; // Ecliptic longitude of the Sun at perigee
  eccent = 0.016718; // Eccentricity of Earth's orbit
  sunsmax = 1.495985e8; // Semi-major axis of Earth's orbit, km
  sunangsiz = 0.533128; // Sun's angular size, degrees, at semi-major axis distance

  /* Elements of the Moon's orbit, epoch 1980.0 */
  mmlong = 64.975464; // Moon's mean longitude at the epoch
  mmlongp = 349.383063; // Mean longitude of the perigee at the epoch
  mlnode = 151.950429; // Mean longitude of the node at the epoch
  minc = 5.145396; // Inclination of the Moon's orbit */
  mecc = 0.054900; // Eccentricity of the Moon's orbit */
  mangsiz = 0.5181; // Moon's angular size at distance a from Earth
  msmax = 384401.0; // Semi-major axis of Moon's orbit in km
  mparallax = 0.9507; // Parallax at distance a from Earth
  synmonth = 29.53058868; // Synodic month (new Moon to new Moon)
  lunatbase = 2423436.0; // Base date for E. W. Brown's numbered series of lunations (1923 January 16)

  /*  Properties of the Earth  */
  earthrad = 6378.16; // Radius of Earth in kilometres
  PI = 3.14159265358979323846;  // Assume not near black hole nor in Tennessee

  /* ---- End of Atronomical constants ---- */

  constructor(dateNow) {
    this.dateNow = dateNow;
  }
}

module.exports = Moon;