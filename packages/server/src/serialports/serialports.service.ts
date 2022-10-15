import { SerialPort } from 'serialport';

export const port = new SerialPort({
  path: '/dev/tty.usbserial-0001',
  baudRate: 9600,
  autoOpen: true,
});
export const SerialHandlerService = () => {
  //   const start = () => {
  //     if (port.isOpen) return;
  //     port.open((err) => {
  //       if (err) console.log('is open', port.isOpen);
  //     });
  //   };

  port.on('open', () => {
    console.info('port opened');
  });

  const white = '255,255,255';
  const off = '000,000,000';
  const command = `:L00(${off})\r\n)`;
  port.write(command, (err) => {
    // if (error) console.log(error?.message);
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written', command);
  });
};

//   setInterval(() => {
//     start();
//     if (port.isOpen) {
//       console.log('to write');
//       const red = '255,000,000';
//       const green = '000,255,000';
//       const blue = '000,000,255';
//       const colorArr = [red, green, blue];
//       const command = `:L00(${colorArr[Math.floor(Math.random() * 3)]})\r\n)`;

//       port.write(command, (err) => {
//         // if (error) console.log(error?.message);
//         if (err) {
//           return console.log('Error on write: ', err.message);
//         }
//         console.log('message written', command);
//       });
//     }
//   }, 1000);
// };

// @Injectable()
// export class SerialportsService {}
