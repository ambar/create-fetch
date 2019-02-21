const createEnv = targets => [['@babel/preset-env', {targets}]]

module.exports = {
  presets: createEnv({node: '8.3'}),
  env: {
    test: {
      presets: createEnv({node: 'current'}),
      plugins: [
        ['@babel/plugin-proposal-pipeline-operator', {proposal: 'minimal'}],
      ],
    },
  },
}
