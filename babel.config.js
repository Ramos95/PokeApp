module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          api: './src/API',
          assets: './src/Assets',
          components: './src/Components',
          context: './src/Context',
          navigation: './src/Navigation',
          services: './src/Services',
          views: './src/Views',
        },
      },
    ],
  ],
};
