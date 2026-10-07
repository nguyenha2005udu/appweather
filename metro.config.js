const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    blockList: exclusionList([
      /.*\/ios\/Pods\/.*/,
      /.*\/ios\/build\/.*/,
      /.*\/android\/build\/.*/,
      /.*\/android\/app\/build\/.*/
    ])
  }
});
