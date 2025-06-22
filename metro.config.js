// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const nativeWindConfig = withNativeWind(defaultConfig, {
  input: './style.css',
});

module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);