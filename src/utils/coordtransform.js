/* @preserve
 * gcoord 0.1.2, geographic coordinate library
 * Copyright (c) 2018 Jiulong Hu <me@hujiulong.com>
 */

var WGS84 = 'WGS84';
var WGS1984 = WGS84;
var GCJ02 = 'GCJ02';
var BD09 = 'BD09';
var EPSG4326 = WGS84;
var EPSG3857 = 'EPSG3857';
var EPSG900913 = EPSG3857;

var Baidu = BD09;
var BMap = BD09;
var AMap = GCJ02;

var WebMercator = EPSG3857;

function assert(condition, msg) {
  if (condition) throw new Error(msg);
}

/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * gcoord.isNumber(123)
 * //=true
 * gcoord.isNumber('foo')
 * //=false
 */
function isNumber(num) {
  return !isNaN(num) && num !== null && !isArray(num);
}

/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * gcoord.isObject({elevation: 10})
 * //=true
 * gcoord.isObject('foo')
 * //=false
 */


/**
 * isNumber
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 */
function isArray(input) {
  return !!input && Object.prototype.toString.call(input) === '[object Array]';
}

/**
 * compose
 *
 * @param {function} function
 * @returns {function}
 */
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) {
      result = args[i].call(this, result);
    } return result;
  };
}

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 * https://github.com/Turfjs/turf/blob/master/packages/turf-meta/index.mjs
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * let features = gcoord.featureCollection([
 *   gcoord.point([26, 37], {"foo": "bar"}),
 *   gcoord.point([36, 53], {"hello": "world"})
 * ]);
 *
 * gcoord.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  /* eslint-disable-next-line */
  var j = void 0,
    k = void 0,
    l = void 0,
    geometry = void 0,
    stopG = void 0,
    coords = void 0,
    geometryMaybeCollection = void 0,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection = void 0;

  var type = geojson.type;
  var isFeatureCollection = type === 'FeatureCollection';
  var isFeature = type === 'Feature';
  var stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === 'GeometryCollection' : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;

      wrapShrink = excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon') ? 1 : 0;
      switch (geomType) {
        case null:
          break;
        case 'Point':
          if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case 'LineString':
        case 'MultiPoint':
          for (j = 0; j < coords.length; j++) {
            if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
            coordIndex++;
            if (geomType === 'MultiPoint') multiFeatureIndex++;
          }
          if (geomType === 'LineString') multiFeatureIndex++;
          break;
        case 'Polygon':
        case 'MultiLineString':
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
              coordIndex++;
            }
            if (geomType === 'MultiLineString') multiFeatureIndex++;
            if (geomType === 'Polygon') geometryIndex++;
          }
          if (geomType === 'Polygon') multiFeatureIndex++;
          break;
        case 'MultiPolygon':
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case 'GeometryCollection':
          for (j = 0; j < geometry.geometries.length; j++) {
            if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
          }
          break;
        default:
          throw new Error('Unknown Geometry Type');
      }
    }
  }
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var abs = Math.abs;
var PI = Math.PI;


var a = 6378245;
var ee = 0.006693421622965823;

function GCJ02ToWGS84(coord) {
  var _coord = slicedToArray(coord, 2),
    lon = _coord[0],
    lat = _coord[1];

  if (!isInChina(lon, lat)) return [lon, lat];

  var wgsLon = lon,
    wgsLat = lat;


  var tempPoint = WGS84ToGCJ02([wgsLon, wgsLat]);

  var dx = tempPoint[0] - lon;
  var dy = tempPoint[1] - lat;

  while (abs(dx) > 1e-6 || abs(dy) > 1e-6) {
    wgsLon -= dx;
    wgsLat -= dy;

    tempPoint = WGS84ToGCJ02([wgsLon, wgsLat]);
    dx = tempPoint[0] - lon;
    dy = tempPoint[1] - lat;
  }

  return [wgsLon, wgsLat];
}

function WGS84ToGCJ02(coord) {
  var _coord2 = slicedToArray(coord, 2),
    lon = _coord2[0],
    lat = _coord2[1];

  if (!isInChina(lon, lat)) return [lon, lat];

  var d = delta(lon, lat);

  return [lon + d[0], lat + d[1]];
}

function transformLat(x, y) {
  var ret = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * sqrt(abs(x));
  ret += (20 * sin(6 * x * PI) + 20 * sin(2 * x * PI)) * 2 / 3;
  ret += (20 * sin(y * PI) + 40 * sin(y / 3 * PI)) * 2 / 3;
  ret += (160 * sin(y / 12 * PI) + 320 * sin(y * PI / 30)) * 2 / 3;
  return ret;
}

function transformLon(x, y) {
  var ret = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * sqrt(abs(x));
  ret += (20 * sin(6 * x * PI) + 20 * sin(2 * x * PI)) * 2 / 3;
  ret += (20 * sin(x * PI) + 40 * sin(x / 3 * PI)) * 2 / 3;
  ret += (150 * sin(x / 12 * PI) + 300 * sin(x / 30 * PI)) * 2 / 3;
  return ret;
}

function delta(lon, lat) {

  var dLon = transformLon(lon - 105, lat - 35);
  var dLat = transformLat(lon - 105, lat - 35);

  var radLat = lat / 180 * PI;
  var magic = sin(radLat);

  magic = 1 - ee * magic * magic;

  var sqrtMagic = sqrt(magic);
  dLon = dLon * 180 / (a / sqrtMagic * cos(radLat) * PI);
  dLat = dLat * 180 / (a * (1 - ee) / (magic * sqrtMagic) * PI);

  return [dLon, dLat];
}

function isInChina(lon, lat) {
  assert(lon === undefined || lat === undefined, 'lon and lat are required');
  assert(!isNumber(lon) || !isNumber(lat), 'lon and lat must be numbers');

  return lon >= 72.004 && lon <= 137.8347 && lat >= 0.8293 && lat <= 55.8271;
}

var sin$1 = Math.sin;
var cos$1 = Math.cos;
var atan2 = Math.atan2;
var sqrt$1 = Math.sqrt;
var PI$1 = Math.PI;


var baiduFactor = PI$1 * 3000.0 / 180.0;

function BD09ToGCJ02(coord) {
  var _coord = slicedToArray(coord, 2),
    lon = _coord[0],
    lat = _coord[1];

  var x = lon - 0.0065;
  var y = lat - 0.006;
  var z = sqrt$1(x * x + y * y) - 0.00002 * sin$1(y * baiduFactor);
  var theta = atan2(y, x) - 0.000003 * cos$1(x * baiduFactor);
  var newLon = z * cos$1(theta);
  var newLat = z * sin$1(theta);

  return [newLon, newLat];
}

function GCJ02ToBD09(coord) {
  var _coord2 = slicedToArray(coord, 2),
    lon = _coord2[0],
    lat = _coord2[1];

  var x = lon;
  var y = lat;
  var z = sqrt$1(x * x + y * y) + 0.00002 * sin$1(y * baiduFactor);
  var theta = atan2(y, x) + 0.000003 * cos$1(x * baiduFactor);

  var newLon = z * cos$1(theta) + 0.0065;
  var newLat = z * sin$1(theta) + 0.006;

  return [newLon, newLat];
}

// https://github.com/Turfjs/turf/blob/master/packages/turf-projection/index.ts

var R2D = 180 / Math.PI;
var D2R = Math.PI / 180;
var A = 6378137.0;
var MAXEXTENT = 20037508.342789244;

function ESPG3857ToWGS84(xy) {
  return [xy[0] * R2D / A, (Math.PI * 0.5 - 2.0 * Math.atan(Math.exp(-xy[1] / A))) * R2D];
}

function WGS84ToEPSG3857(lonLat) {
  // compensate longitudes passing the 180th meridian
  // from https://github.com/proj4js/proj4js/blob/master/lib/common/adjust_lon.js
  var adjusted = Math.abs(lonLat[0]) <= 180 ? lonLat[0] : lonLat[0] - (lonLat[0] < 0 ? -1 : 1) * 360;
  var xy = [A * adjusted * D2R, A * Math.log(Math.tan(Math.PI * 0.25 + 0.5 * lonLat[1] * D2R))];

  // if xy value is beyond maxextent (e.g. poles), return maxextent
  if (xy[0] > MAXEXTENT) xy[0] = MAXEXTENT;
  if (xy[0] < -MAXEXTENT) xy[0] = -MAXEXTENT;
  if (xy[1] > MAXEXTENT) xy[1] = MAXEXTENT;
  if (xy[1] < -MAXEXTENT) xy[1] = -MAXEXTENT;

  return xy;
}

var WGS84$1 = {
  to: {
    GCJ02: WGS84ToGCJ02,
    BD09: compose(GCJ02ToBD09, WGS84ToGCJ02),
    EPSG3857: WGS84ToEPSG3857
  }
};

var GCJ02$1 = {
  to: {
    WGS84: GCJ02ToWGS84,
    BD09: GCJ02ToBD09,
    EPSG3857: compose(WGS84ToEPSG3857, GCJ02ToWGS84)
  }
};

var BD09$1 = {
  to: {
    WGS84: compose(GCJ02ToWGS84, BD09ToGCJ02),
    GCJ02: BD09ToGCJ02,
    EPSG3857: compose(WGS84ToEPSG3857, GCJ02ToWGS84, BD09ToGCJ02)
  }
};

var EPSG3857$1 = {
  to: {
    WGS84: ESPG3857ToWGS84,
    GCJ02: compose(WGS84ToGCJ02, ESPG3857ToWGS84),
    BD09: compose(GCJ02ToBD09, WGS84ToGCJ02, ESPG3857ToWGS84)
  }
};



var CRS = (Object.freeze || Object)({
  WGS84: WGS84$1,
  GCJ02: GCJ02$1,
  BD09: BD09$1,
  EPSG3857: EPSG3857$1
});

/**
 * transform
 *
 * @param {geojson|position} input
 * @returns {geojson|position} output
 */
function transform(input, fromCRS, toCRS) {

  assert(!input, 'coordinate is required');
  assert(!fromCRS, 'original coordinate system is required');
  assert(!toCRS, 'target coordinate system is required');

  var from = CRS[fromCRS];
  assert(!from, 'original coordinate system is invalid');

  if (fromCRS === toCRS) return input;

  var to = from.to[toCRS];
  assert(!to, 'target coordinate system is invalid');

  var type = typeof input === 'undefined' ? 'undefined' : _typeof(input);
  assert(type !== 'string' && type !== 'object', 'coordinate must be an geojson or an array of position');

  if (type === 'string') input = JSON.parse(input);

  var isPosition = false;
  if (isArray(input)) {
    assert(input.length < 2, 'position must be at 2 numbers long');
    assert(!isNumber(input[0]) || !isNumber(input[1]), 'position must contain numbers');
    isPosition = true;
  }

  var output = null;
  var convert = to;

  if (isPosition) {
    output = convert(input);
  } else {
    coordEach(input, function (coord) {
      var newCoord = convert(coord);
      coord[0] = newCoord[0];
      coord[1] = newCoord[1];
    });

    output = input;
  }

  return output;
}

var index = {
  WGS84: WGS84,
  WGS1984: WGS1984,
  GCJ02: GCJ02,
  BD09: BD09,
  EPSG4326: EPSG4326,
  EPSG3857: EPSG3857,
  EPSG900913: EPSG900913,
  Baidu: Baidu,
  BMap: BMap,
  AMap: AMap,
  WebMercator: WebMercator,

  transform: transform
};

module.exports = {
  WGS84: WGS84,
  WGS1984: WGS1984,
  GCJ02: GCJ02,
  BD09: BD09,
  EPSG4326: EPSG4326,
  EPSG3857: EPSG3857,
  EPSG900913: EPSG900913,
  Baidu: Baidu,
  BMap: BMap,
  AMap: AMap,
  WebMercator: WebMercator,
  transform: transform
}

//export { WGS84, WGS1984, GCJ02, BD09, EPSG4326, EPSG3857, EPSG900913, Baidu, BMap, AMap, WebMercator, transform };
//# sourceMappingURL=gcoord.esm.js.map
