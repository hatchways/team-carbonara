const chai = require('chai');
const chaiHttp = require('chai-http');
const { availDays, availSlots } = require('../utils/availabilityHelpers.js');

chai.should();
chai.use(chaiHttp);
const assert = chai.assert;

describe('test days', () => {
  it('returns expected days', () => {
    const days = availDays(mayBusy, userAvail, userAvail.timeZone, clientTz, reqYear, reqMonth, reqMeet);
    // console.log(days)
    assert.deepEqual(days, [4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29]);
  });
});

describe('test timeslots', () => {
  it('returns expected slots', () => {
    const slots = availSlots(may20th, userAvail.hours, userAvail.timeZone, clientTz, [2020, 4, 20], reqMeet);
    // console.log(slots)
    assert.deepEqual(slots, [
      '2020-05-20T09:00:00-04:00',
      '2020-05-20T14:00:00-04:00',
      '2020-05-20T14:30:00-04:00',
      '2020-05-20T15:00:00-04:00',
      '2020-05-20T15:30:00-04:00',
      '2020-05-20T16:00:00-04:00',
    ]);
  });
});

const reqMeet = 60;
const reqYear = 2020;
const reqMonth = 'May';

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
    start: {
      hour: 9,
      minute: 0,
    },
    end: {
      hour: 17,
      minute: 0,
    },
  },
  timeZone: 'America/New_York',
  offset: '-04:00',
};

const clientTz = 'US/Central';

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

const may20th = [{ start: '2020-05-20T14:00:00Z', end: '2020-05-20T18:00:00Z' }];
const aprilBusy = { start: '2020-04-01T04:00:00Z', end: '2020-05-03T04:00:00Z' };
const mayBusy = [
  { start: '2020-04-01T04:00:00Z', end: '2020-05-03T04:00:00Z' },
  { start: '2020-05-13T00:00:00Z', end: '2020-05-13T01:00:00Z' },
  { start: '2020-05-20T14:00:00Z', end: '2020-05-20T18:00:00Z' },
];
