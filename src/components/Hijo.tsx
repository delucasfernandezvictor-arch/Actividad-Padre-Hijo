import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
} from '@ionic/react';
import { addCircleOutline, paperPlaneOutline } from 'ionicons/icons';
import { useState } from 'react';

import './Hijo.css';

/**
 * Props del componente Hijo.
 * - Datos que BAJAN del padre al hijo: nombre, mensajeDelPadre, contador, color.
 * - Funciones callback para SUBIR datos del hijo al padre: onEnviarMensaje, onIncrementar.
 */
export interface HijoProps {
  nombre: string;
  color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning';
  mensajeDelPadre: string;
  contador: number;
  onEnviarMensaje: (nombreHijo: string, texto: string) => void;
  onIncrementar: (nombreHijo: string) => void;
}

const Hijo: React.FC<HijoProps> = ({
  nombre,
  color,
  mensajeDelPadre,
  contador,
  onEnviarMensaje,
  onIncrementar,
}) => {
  // Estado LOCAL del hijo: solo él conoce lo que está escribiendo.
  const [texto, setTexto] = useState('');

  const enviar = () => {
    if (!texto.trim()) return;
    onEnviarMensaje(nombre, texto.trim()); // Hijo -> Padre
    setTexto('');
  };

  return (
    <IonCard className={`hijo hijo--${color}`} data-testid={`hijo-${nombre}`}>
      <IonCardHeader>
        <IonCardSubtitle>Componente hijo</IonCardSubtitle>
        <IonCardTitle>{nombre}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        {/* Padre -> Hijo: datos recibidos por props */}
        <p className="hijo__label">Mensaje recibido del padre (props):</p>
        <p className="hijo__mensaje" data-testid={`mensaje-${nombre}`}>
          {mensajeDelPadre || <em>El padre todavía no ha dicho nada…</em>}
        </p>

        <p className="hijo__label">
          Contador compartido (props): <IonBadge color={color}>{contador}</IonBadge>
        </p>

        {/* Hijo -> Padre: eventos mediante callbacks */}
        <IonItem lines="none" className="hijo__input">
          <IonInput
            label="Responder al padre"
            labelPlacement="stacked"
            placeholder="Escribe un mensaje…"
            value={texto}
            onIonInput={(e) => setTexto(String(e.detail.value ?? ''))}
            onKeyDown={(e) => e.key === 'Enter' && enviar()}
          />
        </IonItem>

        <div className="hijo__acciones">
          <IonButton color={color} onClick={enviar} disabled={!texto.trim()}>
            <IonIcon slot="start" icon={paperPlaneOutline} />
            Enviar al padre
          </IonButton>
          <IonButton color={color} fill="outline" onClick={() => onIncrementar(nombre)}>
            <IonIcon slot="start" icon={addCircleOutline} />
            +1 al contador
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Hijo;
