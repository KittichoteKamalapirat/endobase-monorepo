const Service = require('node-windows').Service;
const path = require('path')


const scriptPath = path.resolve(__dirname, 'main.js');
// Create a new service object
const svc = new Service({
  name: 'endo_supply_server_38',
  description: 'An endoscope data management system iOT',
  script: scriptPath,
  nodeOptions: ['--harmony', '--max_old_space_size=4096'],
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start();
});
svc.install();
