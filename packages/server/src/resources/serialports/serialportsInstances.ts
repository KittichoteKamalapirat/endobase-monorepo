// import { Injectable } from '@nestjs/common';
// import { ReadlineParser, SerialPort } from 'serialport';
// import {
//   serialportPath1,
//   serialportPath2,
//   serialportPath3,
// } from '../../constants';
// import { numTo3Digits } from '../../utils/numTo3Digits';
// import { Snapshot } from '../snapshots/entities/snapshot.entity';

// export const port1 = new SerialPort({
//   path: serialportPath1,
//   baudRate: 9600,
//   autoOpen: true,
// });

// export const port2 = new SerialPort({
//   path: serialportPath2,
//   baudRate: 9600,
//   autoOpen: true,
// });

// export const port3 = new SerialPort({
//   path: serialportPath3,
//   baudRate: 9600,
//   autoOpen: true,
// });

// const parser1 = port1.pipe(new ReadlineParser({ delimiter: '\r\n' }));
// const parser2 = port2.pipe(new ReadlineParser({ delimiter: '\r\n' }));
// const parser3 = port3.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// parser1.on('data', function (data) {
//   console.log('Data from port 1:', data.toString());
//   const input = { temp: 10 };
// });
// parser2.on('data', function (data) {
//   console.log('Data from port 2:', data.toString());
// });
// parser3.on('data', function (data) {
//   console.log('Data from port 3:', data.toString());
// });

// export const allPorts = [port1, port2, port3];
// console.log('all ports', allPorts);

// export const writeRandomColor = (port) => {
//   const r = Math.floor(Math.random() * 255);
//   const g = Math.floor(Math.random() * 255);
//   const b = Math.floor(Math.random() * 255);

//   const threeDigitR = numTo3Digits(r, 3);
//   const threeDigitG = numTo3Digits(g, 3);
//   const threeDigitB = numTo3Digits(b, 3);
//   const randomColor = `${threeDigitR},${threeDigitG},${threeDigitB}`;

//   const command = `:L00(${randomColor})\r\n)`;

//   port.write(command, (err) => {
//     // if (error) console.log(error?.message);
//     if (err) {
//       return console.log('Error on write: ', err.message);
//     }
//     console.log('message written', command);
//   });
// };

// export const getSystemStatus = (port) => {
//   const command = ':STS';

//   port.write(command, (err) => {
//     // if (error) console.log(error?.message);
//     if (err) {
//       return console.log('Error on write: ', err.message);
//     }
//     console.log('x', err);
//     console.log('message written', command);
//   });
// };
