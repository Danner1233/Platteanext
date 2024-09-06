import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface ComentariosProps {
  idProducto: string;
}

interface Comentario {
  NombrePersona: string;
  FechaAprobacion: string;
  ComentarioAprobacion: string;
}

export function Comentarios({ idProducto }: ComentariosProps) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [idPersona, setIdPersona] = useState<number | null>(null);

  // Obtener el id de la persona del token JWT
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setIdPersona(decodedToken.IdPersona);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('Token no encontrado en el localStorage');
    }
  }, []);

  // Obtener comentarios de la API
  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get<{ [key: string]: Comentario }>(`http://localhost:4000/api/aprobacion/${idProducto}`);
        console.log('Comentarios recibidos:', response.data);

        // Convertir el objeto en un array
        const comentariosArray = Object.values(response.data);
        setComentarios(comentariosArray);
      } catch (error) {
        console.error('Error al obtener los comentarios:', error);
      }
    };

    fetchComentarios();
  }, [idProducto]);

  const handleComentarioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComentario(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!idPersona || !idProducto) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/aprobacion', {
        ComentarioAprobacion: comentario,
        CalificacionAprobacion: calificacion,
        IdPersonaFK: idPersona,
        IdProductoFK: Number(idProducto)
      });
      
      // Añadir el nuevo comentario al estado
      const nuevoComentario: Comentario = {
        NombrePersona: response.data.NombrePersona, // Ajusta esto según la estructura de la respuesta
        FechaAprobacion: new Date().toISOString(),
        ComentarioAprobacion: comentario,
      };
      setComentarios([...comentarios, nuevoComentario]);

      setComentario('');
      setCalificacion(0);
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  return (
    <div className="mx-auto px-4 md:px-6 max-w-2x2 grid gap-12">
      <h2 className="text-2xl font-bold">Comentarios de los clientes</h2>

      {/* Comentarios traídos de la API */}
      {comentarios.length > 0 ? (
        comentarios.map((comentario, index) => (
          <div key={index} className="flex gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar usuario" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-4">
              <div className="flex gap-4 items-start">
                <div className="grid gap-0.5 text-sm">
                  <h3 className="font-semibold">{comentario.NombrePersona}</h3>
                  <time className="text-sm text-muted-foreground">{new Date(comentario.FechaAprobacion).toLocaleDateString()}</time>
                </div>
              </div>
              <div className="text-sm leading-loose text-muted-foreground">
                <p>{comentario.ComentarioAprobacion}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay comentarios disponibles.</p>
      )}

      {/* Formulario para agregar un nuevo comentario */}
      <div className="bg-muted p-6 rounded-md">
        <h3 className="text-lg font-semibold mb-4">Deja tu comentario</h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Textarea
            placeholder="Escribe tu comentario aquí..."
            rows={3}
            className="resize-none"
            value={comentario}
            onChange={handleComentarioChange}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </div>
  );
}
