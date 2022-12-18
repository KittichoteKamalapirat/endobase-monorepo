import { SerialPort } from 'serialport';
import {
  containerTypeOptions,
  CONTAINER_TO_SERIALPORT_PATH_MAPPER,
  MySerialPort,
} from '../types/CONTAINER_TYPE';
import { PortInfo } from '@serialport/bindings-interface/dist';

interface Args {
  serialports: MySerialPort;
  connectedArduinos: PortInfo[];
}
// make null if unplugged
// make SP if just plug
// keep SP if still connected
export const initSerialports = ({ connectedArduinos, serialports }: Args) => {
  containerTypeOptions.forEach((option) => {
    const col = option.value;
    const toConnectPath = CONTAINER_TO_SERIALPORT_PATH_MAPPER[col];
    const isConnected = !!connectedArduinos.find(
      (portInfo) => portInfo.path === toConnectPath,
    );

    console.log('toConnectPath', toConnectPath);
    console.log('isConnected', isConnected);

    // if not connected
    // make it null (even if it was connected previously)
    // update every 1 min from the frontend's refetch
    if (!isConnected) {
      serialports[col] = null;
      return;
    }

    // if connected
    // only instantiate if it is previously not connected
    // if already connected => do nothing and return
    const isAlreadyConnected = !!serialports[col];
    if (isAlreadyConnected) return;

    const sp = new SerialPort({
      path: toConnectPath,
      baudRate: 9600,
      autoOpen: true,
    });
    serialports[col] = sp;
  });
};
