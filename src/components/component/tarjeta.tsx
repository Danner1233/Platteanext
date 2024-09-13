import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Asegúrate de usar la función jwtDecode correctamente

interface JWTDecoded {
  IdPersona: number; // campo del JWT que contiene el ID de la persona
}

export function Tarjeta() {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Obtener el token del localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token");
      }

      // Decodificar el JWT para obtener el idPersona
      const decodedToken: JWTDecoded = jwtDecode(token);
      const IdPersona = decodedToken.IdPersona;

      // Verifica el contenido del token decodificado
      console.log("Token decodificado:", decodedToken);

      // Asegúrate de que idPersona esté definido
      if (IdPersona === undefined) {
        throw new Error("El campo idPersona no se encuentra en el token");
      }

      // Enviar la solicitud al backend con axios
      const response = await axios.post("http://localhost:4000/api/pedido", {
        IdPersonaFK: IdPersona, // Usa el nombre correcto del campo
        Direccion: address,
        Ciudad: city,
      });

      // Manejar la respuesta
      console.log("Pedido creado:", response.data);
      alert("Pedido creado exitosamente.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error al crear el pedido:", error.response.data);
      } else {
        console.error("Error al crear el pedido:", error);
      }
      alert("Ocurrió un error al crear el pedido.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-9">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Agregar Tarjeta de Crédito</CardTitle>
            <CardDescription>Ingresa tu información de pago.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Los demás campos los dejamos igual */}
            <div className="space-y-2">
              <Label htmlFor="card-number">Número de Tarjeta</Label>
              <Input
                id="card-number"
                placeholder="Ingresa el número de tu tarjeta"
                type="text"
                pattern="[0-9]{16}"
                maxLength={16}
                className="pr-12"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Fecha de Vencimiento</Label>
                <Input
                  id="expiry-date"
                  placeholder="MM/AA"
                  type="text"
                  pattern="[0-9]{2}/[0-9]{2}"
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="CVC"
                  type="text"
                  pattern="[0-9]{3,4}"
                  maxLength={4}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                placeholder="Ingresa tu ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                placeholder="Ingresa tu dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Volver
            </Link>
            <Button className="ml-auto" onClick={handleSubmit}>
              Agregar Tarjeta
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}