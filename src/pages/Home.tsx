import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';

import Padre from '../components/Padre';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Actividad Padre - Hijo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Actividad Padre - Hijo</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="home__contenedor">
          <div className="home__intro ion-padding">
            <IonText color="medium">
              <p>
                El <strong>Padre</strong> envía datos a sus hijos mediante <strong>props</strong>. Cada{' '}
                <strong>Hijo</strong> devuelve información al padre llamando a una <strong>función callback</strong>{' '}
                recibida por props.
              </p>
            </IonText>
          </div>

          <Padre />
        </div>

        <footer className="home__footer">Víctor de Lucas · Desarrollo de Interfaces · DAM</footer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
