module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          API: './src/API',
          Assets: './src/Assets',
          Components: './src/Components',
          Context: './src/Context',
          Navigation: './src/Navigation',
          Services: './src/Services',
          Views: './src/Views',
        },
      },
    ],
  ],
};
