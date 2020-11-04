const functions = require("firebase-functions");
const serviceAccount = require("./food-delivery-app-86ccd-firebase-adminsdk-cm4g9-56f4f7b14c.json");
const stripe = require("stripe")(
  "sk_test_51HYM73FJbeEVXG7GsYDdGV5dTaq05MLdbi88gozHr5DucqfkQ4MHvcK0fBe2sndlkTEwi6Ar7Iw7KdICAwPYc68000Hp8jooPl"
);
const cors = require("cors")();

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://food-delivery-app-86ccd.firebaseio.com",
});

exports.createStripeUser = functions.https.onRequest(
  // Need: user Id
  async (request, response) => {
    let email;
    try {
      await admin
        .firestore()
        .collection("users")
        .doc(request.body.id)
        .get()
        .then((user) => {
          email = user.data().email;
        });
      const customer = await stripe.customers.create({
        email: email,
      });
      const intent = await stripe.setupIntents.create({
        customer: customer.id,
      });
      await admin.firestore().collection("users").doc(request.body.id).set(
        {
          customerId: customer.id,
          setupSecret: intent.client_secret,
        },
        { merge: true }
      );
      return response.status(200).json({
        status: "success",
        userId: request.body.id,
        email: email,
        customerId: customer.id,
        setupSecret: intent.client_secret,
      });
    } catch (error) {
      return response.status(500).json({ msg: `Server error: ${error}` });
    }
  }
);

exports.pay = functions.https.onRequest(async (request, response) => {
  // Need: ammountToPay, userId, paymentIndex
  // return cors(request, response, async () => {
  try {
    console.log(request.body);
    let customer;
    let paymentId;
    await admin
      .firestore()
      .collection("users")
      .doc(request.body.userId)
      .get()
      .then((user) => {
        customer = user.data().customerId;
        paymentId = user.data().paymentMethods.data[request.body.paymentIndex]
          .id;
      });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: request.body.ammountToPay,
      currency: "mxn",
      payment_method: paymentId,
      off_session: false,
      confirm: true,
      customer: customer,
    });
    console.log(paymentIntent);
    if (paymentIntent.status == "succeeded") {
      return response.status(200).json({
        status: "success",
        userId: request.body.userId,
      });
    } else if (paymentIntent.status == "requires_confirmation") {
      const paymentIntent_ = await stripe.paymentIntents.confirm(
        paymentIntent,
        { payment_method: paymentId }
      );
      if (paymentIntent_.status == "succeeded") {
        return response.status(200).json({
          status: "success",
          userId: request.body.userId,
        });
      }
    } else {
      return response.status(400).json({
        status: "Declined",
        userId: request.body.userId,
      });
    }
  } catch (error) {
    return response.status(500).json({ msg: `Server error: ${error}` });
  }
  // });
});

exports.createPaymentMetod = functions.https.onRequest(
  // Need: userId, card
  async (request, response) => {
    // return cors(request, response, async () => {
    let customer;
    try {
      const stripe = require("stripe")(
        "sk_test_51HYM73FJbeEVXG7GsYDdGV5dTaq05MLdbi88gozHr5DucqfkQ4MHvcK0fBe2sndlkTEwi6Ar7Iw7KdICAwPYc68000Hp8jooPl"
      );
      console.log(request.body);
      await admin
        .firestore()
        .collection("users")
        .doc(request.body.userId)
        .get()
        .then((user) => {
          customer = user.data().customerId;
        });
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          token: request.body.token.token.id,
        },
      });
      const paymentMethod_ = await stripe.paymentMethods.attach(
        paymentMethod.id,
        { customer: customer }
      );
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer,
        type: "card",
      });
      console.log(paymentMethods);
      await admin
        .firestore()
        .collection("users")
        .doc(request.body.userId)
        .update({ paymentMethods: paymentMethods });
      return response.status(200).json({
        status: "success",
        userId: request.body.userId,
      });
    } catch (error) {
      return response.status(500).json({ msg: `Server error: ${error}` });
    }
    // });
  }
);
