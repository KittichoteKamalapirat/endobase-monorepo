var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: 'endo_supply_server_7',
  description: 'An endoscope data management system iOT',
  script: 'C:\\Program Files\\endobase-monorepo\\packages\\server\\dist\\main.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start();
});

svc.install();


