module.exports = {
  apps : [{
    name: 'API',
    script: 'src/index.ts',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'deploy',
      host : 'cindertron7.com',
      key : "~/ssh/digital_ocean_private.pem",
      ref  : 'origin/master',
      repo : 'https://github.com/stats/space_shooter_server.git',
      path : '/var/www/cindertron7.com/production',
      'post-deploy' : "echo 'Post Deploy Phase'; npm install",
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};
