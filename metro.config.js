const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    sourceExts: ['js', 'json', 'ts', 'tsx'],
    extraNodeModules: {
      '@': __dirname,
      '@features': __dirname + '/features',
      '@screens': __dirname + '/screens',
      '@store': __dirname + '/store',
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
