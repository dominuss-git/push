import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

import { PushNotifications } from '@capacitor/push-notifications';
import { useEffect, useState } from 'react';

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}

const Home: React.FC = () => {
  const [token, setToken] = useState<string>('')

  const addListeners = async () => {
    let r_token = '';
    await PushNotifications.addListener('registration', token => {
      setToken(token.value);
      console.info('Registration token: ', token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  useEffect(() => {
    registerNotifications();
    addListeners();
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Push Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer token={token || '1'}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
