import { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from 'axios';

interface JWTDecoded {
  idPersona: number;
  // otros campos del JWT si es necesario
}

export function Tarjeta() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Obtener el JWT del local storage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    // Decodificar el JWT para obtener idPersona
    const decodedToken: JWTDecoded = jwtDecode(token);
    const idPersona = decodedToken.idPersona;

    try {
      await axios.post('http://localhost:4000/api/pedido', {
        idPersonaFK: idPersona,
        Direccion: address,
        Ciudad: city
      });
      console.log(idPersona)
      // Redirigir o manejar la respuesta según sea necesario
    } catch (error) {
      console.error('Error al realizar la compra:', error);
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
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
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
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
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
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardholder-name">Nombre del Titular</Label>
              <Input
                id="cardholder-name"
                placeholder="Ingresa tu nombre"
                required
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                placeholder="Ingresa tu ciudad"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                placeholder="Ingresa tu dirección"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
            <Button className="ml-auto" onClick={handleSubmit}>Agregar Tarjeta</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}