import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonAlert,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { lockClosed, mail, key } from 'ionicons/icons'; // Import icons
import './ChangePassword.css'; // Import custom CSS

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const history = useHistory();

  const handleChangePassword = async () => {
    const payload = {
      email,
      oldPassword,
      newPassword,
    };

    try {
      const response = await axios.post('http://localhost:5000/change-password', payload);
      setAlertHeader('Success');
      setAlertMessage(response.data.message);
      setShowAlert(true);
      setShouldRedirect(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setAlertMessage(error.response?.data?.message || 'Failed to change password');
      } else {
        setAlertMessage('Failed to change password');
      }
      setAlertHeader('Error');
      setShowAlert(true);
      setShouldRedirect(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot='start'>
                <IonBackButton defaultHref='/home'></IonBackButton>
            </IonButtons>
          <IonTitle>Change Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding change-password-content">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <div className="form-container">
                <IonItem>
                  <IonLabel position="floating">
                    <IonIcon icon={mail} className="input-icon" /> Email
                  </IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">
                    <IonIcon icon={lockClosed} className="input-icon" /> Old Password
                  </IonLabel>
                  <IonInput
                    type="password"
                    value={oldPassword}
                    onIonChange={(e) => setOldPassword(e.detail.value!)}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">
                    <IonIcon icon={key} className="input-icon" /> New Password
                  </IonLabel>
                  <IonInput
                    type="password"
                    value={newPassword}
                    onIonChange={(e) => setNewPassword(e.detail.value!)}
                  />
                </IonItem>

                <IonButton
                  expand="full"
                  onClick={handleChangePassword}
                  className="change-password-button"
                >
                  Change Password
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            if (shouldRedirect) {
              history.push('/home');
            }
          }}
          header={alertHeader}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;