import { timeout } from "rxjs";

const Service = require('node-windows').Service;
const path = require('path')



const scriptPath = path.resolve(__dirname, 'main.js');
// Create a new service object
const svc = new Service({
  name: 'endo_supply_server_77',
  description: 'An endoscope data management system iOT',
  script: scriptPath,
  nodeOptions: ['--harmony', '--max_old_space_size=4096'],
  //, workingDirectory: '...'
  //, allowServiceLogon: true
  timeout: 60000,
  env: {
    name: "NODE_ENV",
    value: process.env.NODE_ENV // service is now able to access the user who created its' home directory
  }

});


// Listen for the "install" event, which indicates the
// process is available as a service.
// Handle service install events
svc.on('install', () => {
  console.log('Service installed. Starting...');
  console.log('NODE_ENV',process.env.NODE_ENV)
  svc.start();
});

svc.on('start', () => {
  console.log('Service started successfully.');
});

svc.on('error', (err) => {
  console.error('Service error:', err);
});

// Install the service
svc.install();
