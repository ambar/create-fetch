const create = env => [
  [
    '@babel/preset-env',
    {
      loose: true,
      // use native `Object.assign`
      useBuiltIns: 'entry',
      ...env,
    },
  ],
]

module.exports = {
  presets: create(),
  env: {
    test: {
      presets: create({targets: {node: 'current'}}),
      plugins: [
        ['@babel/plugin-proposal-pipeline-operator', {proposal: 'minimal'}],
      ],
    },
  },
}
