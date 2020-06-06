const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY);
const User = require('../models/User');

const subscription = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ sub });

    //create customer
    const customer = await stripe.customers.create({
      payment_method: req.body.payment_method,
      email: req.body.email,
      invoice_settings: {
        default_payment_method: req.body.payment_method,
      },
    });

    //store customer id in db
    user.customerId = customer.id;
    user.subscriber = true;
    await user.save();

    //create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: 'plan_H80WbQZGMMAEE7' }],
      expand: ['latest_invoice.payment_intent'],
    });

    res.json(subscription);
  } catch (err) {
    console.error(err);
  }
};

const unsubscribe = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ sub });

    const subscriptions = await stripe.subscriptions.list({
      customer: user.customerId,
    });

    //cancel subscription
    await stripe.subscriptions.del(subscriptions.data[0].id);

    user.subscriber = false;
    await user.save();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

module.exports = { subscription, unsubscribe };
