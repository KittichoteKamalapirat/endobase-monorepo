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
If counter = 60, then create snapshot (counter = 10 if want to update every 10 mins)

However, there are **8** serialports, the counter will increase by 8 every minute

Therefore we only create snapshot when counter = 60 \* 8 (container_num)

counterCeil = CONTAINER_NUM \* 60; => 60 can be from setting too, check in serialpots.service.ts

1. Basically, the first time it run, it is 60 by default (on constants.ts DEFAULT_SNAPSHOT_INTERVAL_MINS)
2. However, we update it async to whatever is in the database this.settingService.findSnapshotIntervalMins
3. อัปเดทหลังแค่เสี้ยววินาที เลยทันตราบที่ไม่ได้แบบอัปเดททุปวินาที
4. first min => counter = จำนวน container ถ้าไม่เกินก้อโอเค สรุปคือถ้า setting ไท่เท่ากับ 1 ไม่น่ามีปัญหาปะน้อ

### How the snapshot interval setting works?

1. The setting is stored in setting table in the db
2. When instantiate the serialports, use this value in the db (for counter ceiling)
3. Later on, when this got updated by a user, have to update the counter ceilling value by getting it from the setting service

### how refetch counter works in the frontend

1. just refetch every xxx seconds
2. it does not directly query the serialport though, it queries the db. Therefore, if the db does not update yet, the frontend won't update either. I think currently

- container db updates every 1 minute
- endoscope db updates everytime there is action (so it's 100 up-to-date)
- snapshot db taken every 1 hour (can be changed in the setting)

### Seeding data

1. Firstly drop all the existing tables by running comment out the 01_drop.seed and run yarn seed:run
2. start the service to recreate the database
3. comment out the seed and run yarn seed:run again to create the data

### How washing when expired work?

1. When current status =

- ready or expire_soon, you can use it (session created => status turns to being_used) and wash it
- expired => you can take out (session created => status turns to expired_and_out) and wash
- It is designed this way so in the session page, if expired_and_out => no need to fill-in the patient form

2. in session, there is type endoWasExpired

- This is so we know that when endo is drying
- show NoPatientForm if endoWasExpired
- show PatientDetail if !endoWasExpired

### How sorting works

- Endos table and EndosSetting table => by type, brand, and modal (in backend)
- Container: Sort by container col in the frontend
- Snapshots, Activities => autosort by pagination createdAt

### set LED color

1. Start from L00
2. Because in the container, the LED cord line is "U" shape. Row 1-8 => LED00-07, but Row 9 -16 => LED 15-08

### How endoscope schedule works for storage time

The Idea is

1. After 29 days, "ready" becomes "expire_soon"
2. AFter 30 days (1 day after expired_soon), "expire_soon" becaomse "expired"

So in the code

1. When drying is finished and is set from "drying" to "ready" =>
1. 1 ADD A SCHEDULE (callback) to make it expire_soon in MAX_STORAGE_DAYS - 1.
1. 2 Add a new row in endo_cron table
1. When it reaches MAX_STORAGE_DAYS - 1 days and we set to "expire_soon", ADD A SCHEDULE to make it "expired" in 1 day
   But don't forget to remoe the schedule if someone use it before it expired
1. 1 ADD A SCHEDULE to make it "expired" in 1 day
1. 2 Add a new row in endo_cron table
   If someone uses it before 30 days, in pickendo => Delete a schedule base on its name (from endoId and status), `Schedule: Endo xxx is to be expired`

Whenever adding a new schedule => add a new row in database too
Whenever a scheduled callback is called or a schedule is deleted => remove an existing row in th db

When creating a cron job, in code,

- when create a schedule, I need an endo id, to be status, and millisec
- when delete a schedule, I just need the name (could be get from endo id, and status)

So in the database, I just need to store the endoId, toBeStatus, and timeStamp

In the end

- addTimeout does not work because 30 days in millisec exceeds 32 bit
- use addCronJob instead to specify a specific date (see details in endoCron)

If the server is down, all the "unrun" crons are saved.
when server comes back =>

- if in the future, re init all the crons
- if in past, run them!

### how serialport works

- when init serialports

````{
   a: SP,
   b: null,
   c: SP,
}```

- when init parsers
```{
   a: Parser,
   b: null,
   c: Parser,
}```
````

When deploy server
1. yarn build
2. yarn prod (node-service)

When deploy react
1. build docker image
2. remove running container (same name)
3. run docker container (change image)


When installa at a hospital
1. fix the COM port
2. change the ip address in both server and clientdocker
3. change chrome default page and new tab page to match ip address


when run yarn gen
1. server => yarn dev (will listen to http localhost 4001)
2. client => 