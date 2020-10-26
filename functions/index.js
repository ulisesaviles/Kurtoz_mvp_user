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
  // Need: ammountToPay, userId, paymentMethod
  return cors(request, response, async () => {
    try {
      console.log(request.body);
      let card = request.body.paymentMethod;
      let customer;
      await admin
        .firestore()
        .collection("users")
        .doc(request.body.userId)
        .get()
        .then((user) => {
          customer = user.data().customerId;
          console.log(card);
        });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: request.body.ammountToPay,
        currency: "mxn",
        payment_method_data: {
          type: "card",
          card: {
            token: card.id,
          },
        },
        off_session: false,
        confirm: true,
        customer: customer,
      });
      console.log(paymentIntent);
      const clientSecret = paymentIntent.client_secret;
      console.log(clientSecret);
      // await stripe.confirmCardPayment(clientSecret, {
      //   // payment_method: {
      //   //   card: card.id,
      //   //   billing_details: {
      //   //     name: "Ulises Aviles",
      //   //   },
      //   // },
      // });
      return response.status(200).json({
        status: "success",
        userId: request.body.userId,
        card: "**** **** **** " + card.card.last4,
        paymentMethod: request.body.paymentMethod,
      });
    } catch (error) {
      return response.status(500).json({ msg: `Server error: ${error}` });
    }
  });
});
