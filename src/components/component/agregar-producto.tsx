import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NextCrypto from 'next-crypto';

export function AgregarProducto() {
  const params = useParams(); 
  const encryptedIdTienda = params.IdTienda as string;
  const crypto = new NextCrypto('secret key');
  const [idTienda, setIdTienda] = useState<string | null>(null);

  const [nombre, setNombre] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [precio, setPrecio] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [imagen, setImagen] = useState<File | null>(null);

  useEffect(() => {
    const fetchDecryptedId = async () => {
      try {
        const safeIdTienda = encryptedIdTienda.replace(/_/g, '/').replace(/-/g, '+');
        const decryptedId = await crypto.decrypt(decodeURIComponent(safeIdTienda));
        setIdTienda(decryptedId);
      } catch (error) {
        console.error('Error al desencriptar el ID de la tienda', error);
      }
    };

    if (encryptedIdTienda) {
      fetchDecryptedId();
    }
  }, [encryptedIdTienda]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!imagen || !idTienda) {
      alert('Por favor, completa todos los campos y selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('NombreProducto', nombre);
    formData.append('DescripcionProducto', descripcion);
    formData.append('PrecioProducto', precio);
    formData.append('StockProducto', stock);
    formData.append('FotoProducto', imagen);
    formData.append('IdTiendaFK', idTienda);

    try {
      const response = await fetch('http://localhost:4000/api/producto/', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        alert('Producto creado correctamente');
        window.location.reload(); // Refresca la página
      } else {
        alert('Error al crear el producto: ' + data.message);
      }
    } catch (error: any) {
      alert('Error al enviar el formulario: ' + error.message);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagen(file);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar Producto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
        </DialogHeader>
        <div>
          <form className="grid gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Ingresa el nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" placeholder="Ingresa la descripción del producto" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Precio</Label>
              <Input id="price" type="number" placeholder="Ingresa el precio del producto" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" placeholder="Ingresa el stock del producto" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Imagen</Label>
              <Input id="image" type="file" onChange={handleImageChange} />
            </div>
            <DialogFooter>
              <div>
                <Button variant="outline" type="button" onClick={() => {/* handle cancel */}}>Cancelar</Button>
              </div>
              <Button type="submit">Guardar Producto</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
