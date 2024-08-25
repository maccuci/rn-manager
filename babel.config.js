module.exports = function (api) {
  api.cache(true);
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@": "./src",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ];

  return {
    presets: ["babel-preset-expo"],
  };
};
