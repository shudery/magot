export default {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        debug: process.env.NODE_ENV === 'development',
      },
    ],
    ['@babel/preset-react'],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
      },
    ],
    ['@babel/plugin-syntax-dynamic-import'],
  ],
  env: {
    production: {
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
          },
        ],
      ],
    },
  },
};
