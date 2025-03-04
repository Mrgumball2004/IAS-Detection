import React, { useState, useEffect } from 'react';
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
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import validator from 'validator';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
  const history = useHistory();
  const [attempts, setAttempts] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [loginError, setLoginError] = useState<string>('');

  const handleAuth = async () => {
    if (timer > 0) return; // Prevent login during lockout

    // Validate email and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
  
    // Determine if it's a login or sign-up request
    const endpoint = isLogin ? 'login' : 'signup';
    const url = `http://localhost:5000/${endpoint}`;
  
    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
      });
  
      console.log(`${isLogin ? 'Login' : 'Sign-up'} successful!`, response.data);
  
      // Display success message
      setErrorMessage(`${isLogin ? 'Login' : 'Sign-up'} successful!`);
  
      // Save user data to localStorage
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('User data saved:', response.data.user);
      }
  
      // Wait for 2 seconds before redirecting to the Dashboard
      setTimeout(() => {
        history.push('/dashboard');
      }, 2000); // 2-second delay
      setAttempts(0);
    } catch (error) {
      // Increment failed attempts
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (isLogin && newAttempts >= 5) {
        setTimer(15);
        setLoginError('Login failed. Try again after');
        notifyUser();
      } else {
        setLoginError(
          isLogin
            ? 'Invalid email or password. Please try again.'
            : 'Sign-up failed. Please try again.'
        );
      }
    }
  };

  const notifyUser = () => {
    if (Notification.permission === 'granted') {
      new Notification('Security Alert', {
        body: 'Multiple failed login attempts detected on your account.',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Security Alert', {
            body: 'Multiple failed login attempts detected on your account.',
          });
        }
      });
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && attempts >= 5) {
      setAttempts(0);
      setLoginError('');
    }
  }, [timer, attempts]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isLogin ? 'Login' : 'Sign Up'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Toggle between Login and Sign Up */}
        <IonSegment
          value={isLogin ? 'login' : 'signup'}
          onIonChange={(e) => setIsLogin(e.detail.value === 'login')}
        >
          <IonSegmentButton value="login">
            <IonLabel>Login</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="signup">
            <IonLabel>Sign Up</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Email Input */}
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        {/* Password Input */}
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        {/* Login/Sign Up Button */}
        <IonAlert
          isOpen={!!loginError}
          onDidDismiss={() => setLoginError('')}
          header="Error"
          message={loginError + (timer > 0 ? ` (${timer} seconds remaining)` : '')}
          buttons={['OK']}
        />

          {(
          <IonButton expand="full" onClick={handleAuth}>
            {isLogin ? 'Login' : 'Sign Up'}
          </IonButton>
        )}

        {/* Error Message Alert */}
        <IonAlert
  isOpen={!!errorMessage}
  onDidDismiss={() => setErrorMessage('')}
  header={errorMessage.includes('success') ? 'Success' : 'Error'}
  message={errorMessage}
  buttons={['OK']}
/>

        <IonButton expand="full" onClick={() => history.push('/change-password')}>
          Change Password
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;