import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

const collection = `hCollectionTeste`;

export default functions.https.onRequest(async (req, res) => {
  const message = Buffer.from(req.body.message.data, 'base64').toString(
    'utf-8'
  );
  
  const batch = admin.firestore().batch();
  const data = JSON.parse(message);   
  batch.set(admin.firestore().doc(`/${collection}/${data.id}`), data);
  await batch.commit();
  res.status(200).json({ status: 'ok' });
});