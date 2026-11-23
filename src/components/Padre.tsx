import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
} from '@ionic/react';
import { chatbubblesOutline, refreshOutline } from 'ionicons/icons';
import { useState } from 'react';

import Hijo from './Hijo';
import './Padre.css';

interface MensajeHijo {
  id: number;
  de: string;
  texto: string;
  hora: string;
}

/**
 * Componente PADRE.
 * Es el dueño del estado (mensaje, contador e historial) y lo comparte con
 * sus hijos mediante props. Los hijos le avisan de cambios llamando a las
 * funciones callback que el padre les pasa.
 */
const Padre: React.FC = () => {
  const [mensaje, setMensaje] = useState('');
  const [contador, setContador] = useState(0);
  const [historial, setHistorial] = useState<MensajeHijo[]>([]);

  // Callback que recibirán los hijos (Hijo -> Padre)
  const recibirMensaje = (nombreHijo: string, texto: string) => {
    setHistorial((prev) => [
      {
        id: Date.now(),
        de: nombreHijo,
        texto,
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ]);
  };

  // Callback que recibirán los hijos (Hijo -> Padre)
  const incrementar = (nombreHijo: string) => {
    setContador((c) => c + 1);
    recibirMensaje(nombreHijo, 'ha incrementado el contador (+1)');
  };

  const reiniciar = () => {
    setMensaje('');
    setContador(0);
    setHistorial([]);
  };

  return (
    <>
      <IonCard className="padre">
        <IonCardHeader>
          <IonCardSubtitle>Componente padre</IonCardSubtitle>
          <IonCardTitle>Padre</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem lines="none" className="padre__input">
            <IonInput
              label="Mensaje para los hijos"
              labelPlacement="stacked"
              placeholder="Escribe y se verá en los hijos al instante…"
              value={mensaje}
              onIonInput={(e) => setMensaje(String(e.detail.value ?? ''))}
              data-testid="input-padre"
            />
          </IonItem>

          <div className="padre__estado">
            <span>
              Contador: <strong data-testid="contador-padre">{contador}</strong>
            </span>
            <IonButton size="small" fill="clear" color="medium" onClick={reiniciar}>
              <IonIcon slot="start" icon={refreshOutline} />
              Reiniciar
            </IonButton>
          </div>

          <h3 className="padre__subtitulo">
            <IonIcon icon={chatbubblesOutline} /> Mensajes recibidos de los hijos
          </h3>
          {historial.length === 0 ? (
            <IonNote>Aún no ha llegado ningún mensaje de los hijos.</IonNote>
          ) : (
            <IonList inset className="padre__historial" data-testid="historial">
              {historial.map((m) => (
                <IonItem key={m.id}>
                  <IonLabel>
                    <h3>{m.de}</h3>
                    <p>{m.texto}</p>
                  </IonLabel>
                  <IonNote slot="end">{m.hora}</IonNote>
                </IonItem>
              ))}
            </IonList>
          )}
        </IonCardContent>
      </IonCard>

      {/* Los hijos reciben datos (props) y funciones (callbacks) */}
      <IonGrid className="padre__hijos">
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <Hijo
              nombre="Hijo 1"
              color="secondary"
              mensajeDelPadre={mensaje}
              contador={contador}
              onEnviarMensaje={recibirMensaje}
              onIncrementar={incrementar}
            />
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <Hijo
              nombre="Hijo 2"
              color="tertiary"
              mensajeDelPadre={mensaje}
              contador={contador}
              onEnviarMensaje={recibirMensaje}
              onIncrementar={incrementar}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Padre;
