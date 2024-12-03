const admin = require("firebase-admin");

/**
 * generate your serviceAccountKey
 * Project Settings -> Service accounts -> Firebase Admin SDK
 */
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://your-project-id.firebaseio.com'
});

// Формируем сообщение
const message = {
  notification: {
    title: "Заголовок уведомления",
    body: "Текст уведомления",
  },
  data: {
    title: "Заголовок уведомления",
    body: "Текст уведомления",
  },
  token: "FCM_TOKEN_HERE"
};

// Отправляем уведомление
admin
  .messaging()
  .send(message)
  .then((response) => {
    console.log("Уведомление успешно отправлено:", response);
  })
  .catch((error) => {
    console.log("Ошибка отправки уведомления:", error);
  });
