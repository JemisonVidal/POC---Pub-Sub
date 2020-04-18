import * as functions from "firebase-functions";
import { PubSub } from "@google-cloud/pubsub";

const topicName = 'hPocPubSub';
const token = 'TokenTeste';
const pubsub = new PubSub();
export default functions.https.onRequest(async (req, res) => {

  if (req.query.token !== token) {
    return res.status(400).send({ error: "token inválído", token: req.query.token });
  }
  try {
    const data = JSON.stringify(req.body);
    const dataBuffer = Buffer.from(data);
    const messageId = await pubsub.topic(topicName).publish(dataBuffer);
    console.log(`Nova Publicação Id:${messageId}`);
    return res.status(200).send({ Status: "Enviada para fila", Publisher: messageId });

  } catch (error) {
    return res.status(400).send({ error: error });
  }
});