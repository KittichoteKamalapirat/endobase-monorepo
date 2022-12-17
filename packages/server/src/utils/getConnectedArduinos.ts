import { SerialPort } from 'serialport';
import { ARDUINO_PATH_REGEXP, ARDUINO_VENDOR_ID } from '../constants';

export const getConnectedArduinos = async () => {
  const allPorts = await SerialPort.list();
  const connectedArduinos = allPorts.filter((port) => {
    const vendorIdIsMatched = port.vendorId === ARDUINO_VENDOR_ID;

    const pathIsMatched = port.path.match(ARDUINO_PATH_REGEXP);

    return vendorIdIsMatched && pathIsMatched;
  });

  console.log('list all connected arduinos', connectedArduinos);
  return connectedArduinos;
};
