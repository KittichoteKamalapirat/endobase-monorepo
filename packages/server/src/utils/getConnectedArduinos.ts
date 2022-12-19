import { SerialPort } from 'serialport';

export const getConnectedArduinos = async () => {
  const allPorts = await SerialPort.list();
  console.log('allports', allPorts)
  const connectedArduinos = allPorts.filter((port) => {
    const vendorIdIsMatched = port.vendorId === process.env.ARDUINO_VENDOR_ID;

  
    const pathIsMatched = port.path.match(new RegExp(process.env.ARDUINO_PATH_REGEXP));

    return vendorIdIsMatched && pathIsMatched;
  });

  console.log('list all connected arduinos', connectedArduinos);
  return connectedArduinos;
};
