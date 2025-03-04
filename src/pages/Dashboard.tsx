import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import image from './Pics/Sonic Evil Sonic GIF - Sonic Evil sonic Evil sonic licking lips - Descobrir e Compartilhar GIFs.gif';

const Dashboard: React.FC = () => {
  // Safely retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const history = useHistory();
  const [loginTimestamp, setLoginTimestamp] = useState<string>('');

  useEffect(() => {
    const timestamp = new Date().toLocaleString();
    console.log(`User ${user.email} has logged in at ${timestamp}.`);
    setLoginTimestamp(timestamp);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    history.push('/home'); // Redirect to the login page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

    <IonCard style={{ textAlign: 'center' }}>
    <center><img alt="Silhouette of mountains" src={image} /></center>
      <IonCardHeader>
        <IonCardTitle>{user.email}</IonCardTitle>
        <IonCardSubtitle>Developer of this system</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        "Malooy gali ang ginoo si Sir pa kaha"
      </IonCardContent>
    </IonCard>

        <h1>Welcome, {user.email}!</h1>
        <p>You are now logged in.</p>
        <p>Login time: {loginTimestamp}</p>
        <IonButton expand="full" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;