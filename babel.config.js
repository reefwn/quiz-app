module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: ['REACT_APP_MOCK_API'],
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
