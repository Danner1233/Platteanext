"use client";
import Select from 'react-select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NextCrypto from 'next-crypto';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PasarelaPagos } from "./pasarela-pagos";
import { Console } from 'console';

interface Ciudad {
  id: number;
  ciudad: string;
}

interface JWTDecoded {
  IdPersona: number;
}

export function Tarjeta() {
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [encryptedId, setEncryptedId] = useState<string | null>(null);
  const router = useRouter();
  const crypto = new NextCrypto('secret key'); // Mismo secret key para consistencia

  useEffect(() => {
    // Llamado a la API para obtener las ciudades
    const fetchCiudades = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/ciudades");
        setCiudades(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCiudades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCityId === null) {
      alert("Por favor selecciona una ciudad.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token");
      }

      // Decodifica el token para obtener el IdPersona
      const decodedToken: JWTDecoded = jwtDecode(token);
      const IdPersona = decodedToken.IdPersona;

      // Realiza el POST request para crear el pedido
      const response = await axios.post("http://localhost:4000/api/pedido", {
        IdPersonaFK: IdPersona,
        Direccion: address,
        Ciudad: selectedCityId, 
      });
      console.log("IdPersona: ",IdPersona ," ,address: ",address,"selectedCityId: ",selectedCityId)
      // Procesa la respuesta del backend
      const tiendaId = response.data.idPedido;
      const encryptedId = await crypto.encrypt(tiendaId.toString());
      const safeEncryptedId = encodeURIComponent(encryptedId.replace(/\//g, '_').replace(/\+/g, '-'));
      setEncryptedId(safeEncryptedId);

      // Redirige a la ruta dinámica usando el ID encriptado
      router.push(`/resumendecompra/${safeEncryptedId}`);

    } catch (error) {
      console.error("Error al crear el pedido:", error);
      console.log( " ,address: ",address,"selectedCityId: ",selectedCityId);
      alert("Hubo un error al crear el pedido. Inténtalo de nuevo.");
    }
  };
  const cityOptions = ciudades.map(ciudad => ({
    value: ciudad.id,
    label: ciudad.ciudad,
  }));
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? 'rgb(28, 40, 51)' : 'rgb(28, 40, 51)', // Aplica el color al borde
      '&:hover': {
        borderColor: 'rgb(28, 40, 51)', // Cambia el color del borde cuando se pasa el cursor
      },
      boxShadow: state.isFocused ? '0 0 0 1px rgb(28, 40, 51)' : 'none', // Sombra del borde cuando está enfocado
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 999, // Asegura que el menú se muestre por encima de otros elementos
    }),
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-9">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Agregar Tarjeta de Crédito</CardTitle>
            <CardDescription>Ingresa tu información de pago.</CardDescription>
            <PasarelaPagos />
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
      <Select
        id="city"
        options={cityOptions}
        onChange={(selectedOption) => setSelectedCityId(selectedOption?.value || null)}
        className="w-full"
        placeholder="Selecciona tu ciudad"
        styles={customStyles}
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
              href="/carrito"
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
