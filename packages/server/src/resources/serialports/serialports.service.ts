import { Injectable } from '@nestjs/common';
import { numTo3Digits } from '../../utils/numTo3Digits';

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

// export const allPorts = [port1, port2, port3];

@Injectable()
export class SerialportsService {
  writeRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    const threeDigitR = numTo3Digits(r, 3);
    const threeDigitG = numTo3Digits(g, 3);
    const threeDigitB = numTo3Digits(b, 3);
    const randomColor = `${threeDigitR},${threeDigitG},${threeDigitB}`;

    const command = `:L00(${randomColor})\r\n)`;

    // this.port1.write(command, (err) => {
    //   // if (error) console.log(error?.message);
    //   if (err) {
    //     return console.log('Error on write: ', err.message);
    //   }
    //   console.log('message written', command);
    // });
  }
}

// export const SerialHandlerService = () => {
//   //   const start = () => {
//   //     if (port.isOpen) return;
//   //     port.open((err) => {
//   //       if (err) console.log('is open', port.isOpen);
//   //     });
//   //   };

//   port1.on('open', () => {
//     console.info('port opened');
//   });

//   const white = '255,255,255';
//   const off = '000,000,000';
//   const command = `:L00(${off})\r\n)`;
//   port1.write(command, (err) => {
//     // if (error) console.log(error?.message);
//     if (err) {
//       return console.log('Error on write: ', err.message);
//     }
//     console.log('message written', command);
//   });
// };
