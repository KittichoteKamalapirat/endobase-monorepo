# EndoScope IoT Management System

**by Endo Supply @Chonburi hospital**

Overview

- No. of containers: 8 (A,B,C,...,H)
- No. of trays / container = 16 (1,2,3,...,16)
- Total: Can store up to 128 endoscopes

LED Lights

- Tray #A1 => command L00 to ports.A
- Tray #H6 => command: L15 to ports.H

## Demo

Insert gif or link to demo

## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

    ## Color Reference

| Color         | Hex                                                              |
| ------------- | ---------------------------------------------------------------- |
| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |
| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |

How realtime data fetching works when upadting temperate and humidity of each container.

- Backend

1. When instantiate serialports , add listener to listen to any returned data from serialports (in serialport service)
2. Cron job (in serialport) to write :sts to each serialport every minute
3. Inside listen,
   3.1 update the container stat every write
   3.2 only create snapshot every hour

In order to create snapshot only every hour (not every time)
A **counter** is used

If there is **one** serialport
If counter = 60, then create snapshot

However, there are **8** serialports, the counter will increase by 8 every minute

Therefore we only create snapshot when counter = 60 \* 8 (container_num)
