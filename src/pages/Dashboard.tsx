import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

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