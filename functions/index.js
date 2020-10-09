const functions = require("firebase-functions");
const serviceAccount = require("./food-delivery-app-86ccd-firebase-adminsdk-cm4g9-56f4f7b14c.json");
const stripe = require("stripe")(
  "sk_test_51HYM73FJbeEVXG7GsYDdGV5dTaq05MLdbi88gozHr5DucqfkQ4MHvcK0fBe2sndlkTEwi6Ar7Iw7KdICAwPYc68000Hp8jooPl"
);
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://food-delivery-app-86ccd.firebaseio.com",
});

// Setup Stripe user (should be called when creating an app user)
exports.createStripeUser = functions.https.onRequest(
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

exports.createPaymentIndent;
