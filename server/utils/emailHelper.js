const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function emailUserNewAppt(userEmail, userName, guestName, guestEmail, guestTz, guestComment, meetingName) {
  const msg = {
    to: userEmail,
    from: process.env.SENDER_EMAIL_ADDRESS,
    templateId: 'd-6125845abb24432b8af269d996fac682',
    dynamic_template_data: {
      name: userName,
      guest: {
        name: guestName,
        email: guestEmail,
        timezone: guestTz,
        comments: guestComment,
      },
      meetingName: meetingName,
      eventTime: '09:00am - Wednesday, May 20, 2020 (America/New York GMT-4:00)',
    },
  };

  try {
    sgMail.send(msg);
  } catch (err) {
    throw Error(err);
  }
}

module.exports = { emailUserNewAppt };
