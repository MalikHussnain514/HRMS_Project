module.exports = {
  apps: [
    {
      name: 'FreshaBackend',
      script: './server.js',
      watch: true,
      time: true,
      instances: 'max',
      exec_mode: 'cluster',
      ignore_watch: ['node_modules'],
    },
  ],
};

