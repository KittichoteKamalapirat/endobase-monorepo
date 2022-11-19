import { Factory, Seeder } from 'typeorm-seeding';
import { Setting } from '../../setting/entities/setting.entity';

export default class CreateSettings implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Setting)().create({
      name: 'humidityThreshold',
      value: '20',
      label: 'Humidity Threshold Alert',
      description:
        'เปิดการแจ้งเตือนหากความชื้นในตู้เก็บเกินค่าที่ตั้งไว้ (เช่น เกิน 35) ',
    });
    await factory(Setting)().create({
      name: 'temperatureThreshold',
      value: '35',
      label: 'Temperature Threshold Alert',
      description:
        'เปิดการแจ้งเตือนหากอุณหภูมิในตู้เก็บเกินค่าที่ตั้งไว้ (เช่น เกิน 35) ',
    });
    await factory(Setting)().create({
      name: 'containerSnapshotIntervalMins',
      value: '20',
      label: 'Container Snapshot Interval',
      description:
        'ระยะเวลาในการบันทึกช้อมูล หน่วยเป็นนาที (เช่น ทุกๆ 10 นาที) ',
    });
  }
}
