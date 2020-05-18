const chai = require('chai');
const chaiHttp = require('chai-http');
const { availDays, availSlots } = require('../utils/availabilityHelper.js');
const moment = require('moment-timezone');

chai.should();
chai.use(chaiHttp);
const assert = chai.assert;

describe('test days', () => {
  it('returns expected days, omits busy days and unavailable days', () => {
    const mayBusy = [
      { start: '2020-04-01T04:00:00Z', end: '2020-05-03T04:00:00Z' },
      { start: '2020-05-13T00:00:00Z', end: '2020-05-13T01:00:00Z' },
      { start: '2020-05-20T13:00:00Z', end: '2020-05-20T13:30:00Z' },
      { start: '2020-05-20T14:00:00Z', end: '2020-05-20T18:00:00Z' },
      { start: '2020-05-20T18:30:00Z', end: '2020-05-20T22:00:00Z' },
    ];

    const days = availDays([2020, 4, 1], mayBusy, userAvail, userAvail.timeZone, clientTz, 60);

    assert.deepEqual(days, [4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 18, 19, 21, 22, 25, 26, 27, 28, 29]);
  });
});

describe('test days', () => {
  it('returns expected days for significant difference client timezone', () => {
    const mayBusy = [
      { start: '2020-04-01T04:00:00Z', end: '2020-05-03T04:00:00Z' },
      { start: '2020-05-13T00:00:00Z', end: '2020-05-13T01:00:00Z' },
      { start: '2020-05-20T13:00:00Z', end: '2020-05-20T13:30:00Z' },
      { start: '2020-05-20T14:00:00Z', end: '2020-05-20T18:00:00Z' },
      { start: '2020-05-20T18:30:00Z', end: '2020-05-20T22:00:00Z' },
    ];

    const days = availDays([2020, 4, 1], mayBusy, userAvail, userAvail.timeZone, 'Asia/Seoul', 60);

    assert.deepEqual(days, [4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30]);
  });
});

describe('test timeslots', () => {
  it('returns no slots for a fully busy day', () => {
    const may20th = [
      { start: '2020-05-20T13:00:00Z', end: '2020-05-20T13:30:00Z' },
      { start: '2020-05-20T14:00:00Z', end: '2020-05-20T18:00:00Z' },
      { start: '2020-05-20T18:30:00Z', end: '2020-05-20T22:00:00Z' },
    ];

    const slots = availSlots([2020, 4, 20], may20th, userAvail.hours, userAvail.days, userAvail.timeZone, clientTz, 60);

    assert.deepEqual(slots, []);
  });
});

describe('test timeslots', () => {
  it('returns expected slots for client timezone', () => {
    const may20th = [{ start: '2020-05-20T14:00:00Z', end: '2020-05-20T18:00:00Z' }];

    const slots = availSlots([2020, 4, 20], may20th, userAvail.hours, userAvail.days, userAvail.timeZone, clientTz, 60);

    assert.deepEqual(slots, [
      '2020-05-20T08:00:00-05:00',
      '2020-05-20T13:00:00-05:00',
      '2020-05-20T13:30:00-05:00',
      '2020-05-20T14:00:00-05:00',
      '2020-05-20T14:30:00-05:00',
      '2020-05-20T15:00:00-05:00',
    ]);
  });
});

describe('test timeslots', () => {
  it('returns expected slots for significant difference client timezone', () => {
    const may20th = [{ start: '2020-05-20T14:00:00Z', end: '2020-05-20T18:00:00Z' }];

    const slots = availSlots(
      [2020, 4, 20],
      may20th,
      userAvail.hours,
      userAvail.days,
      userAvail.timeZone,
      'Asia/Seoul',
      60,
    );

    assert.deepEqual(slots, [
      '2020-05-20T00:00:00+09:00',
      '2020-05-20T00:30:00+09:00',
      '2020-05-20T01:00:00+09:00',
      '2020-05-20T01:30:00+09:00',
      '2020-05-20T02:00:00+09:00',
      '2020-05-20T02:30:00+09:00',
      '2020-05-20T03:00:00+09:00',
      '2020-05-20T03:30:00+09:00',
      '2020-05-20T04:00:00+09:00',
      '2020-05-20T04:30:00+09:00',
      '2020-05-20T05:00:00+09:00',
      '2020-05-20T22:00:00+09:00',
    ]);
  });
});

const clientTz = 'US/Central';
const userAvail = {
  days: {
    Sunday: false,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
  },
  //change data input format?
  hours: {
    start: '9:00',
    end: '17:00',
  },
  timeZone: 'America/New_York',
  offset: '-04:00',
};

const busyData = [
  //resp.data.calendars.primary.busy
  // Z is UTC time
  {
    start: '2020-04-01T04:00:00Z',
    end: '2020-05-03T04:00:00Z',
  },
  {
    start: '2020-05-13T00:00:00Z',
    end: '2020-05-13T01:00:00Z',
  },
  {
    start: '2020-05-20T14:00:00Z',
    end: '2020-05-20T18:00:00Z',
  },
];

const aprilBusy = { start: '2020-04-01T04:00:00Z', end: '2020-05-03T04:00:00Z' };
