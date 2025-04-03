const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'gif'],
  },
  assets: ['../Bible/assets/images/'],
};

// 설정을 적절하게 병합합니다
const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);

// Reanimated 설정으로 감싸서 내보냅니다
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
