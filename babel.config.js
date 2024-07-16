module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './',
          '@features': './features',
          '@screens': './screens',
          '@store': './store',
          '@hooks': './hooks',
        },
      },
    ],
  ],
};
