const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function emailUserNewAppt(
  userEmail,
  userName,
  guestName,
  guestEmail,
  guestTz,
  guestComment,
  meetingName,
  eventTime,
) {
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
      eventTime: eventTime,
    },
  };

  try {
    sgMail.send(msg);
  } catch (err) {
    throw Error(err);
  }
}

module.exports = { emailUserNewAppt };
