/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/TVerZDIWbhB
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export function Historial() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de compras</CardTitle>
        <CardDescription>Detalles de tus compras anteriores.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Imagen</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio unitario</TableHead>
              <TableHead>Precio total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  src="/placeholder.svg"
                  alt="Producto"
                  width={64}
                  height={64}
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Camiseta de algodón</TableCell>
              <TableCell>2</TableCell>
              <TableCell>$19.99</TableCell>
              <TableCell>$39.98</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  src="/placeholder.svg"
                  alt="Producto"
                  width={64}
                  height={64}
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Zapatillas deportivas</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$49.99</TableCell>
              <TableCell>$49.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  src="/placeholder.svg"
                  alt="Producto"
                  width={64}
                  height={64}
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Reloj de pulsera</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$99.99</TableCell>
              <TableCell>$99.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  src="/placeholder.svg"
                  alt="Producto"
                  width={64}
                  height={64}
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Mochila de viaje</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$59.99</TableCell>
              <TableCell>$59.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  src="/placeholder.svg"
                  alt="Producto"
                  width={64}
                  height={64}
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Gafas de sol</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$29.99</TableCell>
              <TableCell>$29.99</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center">
          <div className="text-muted-foreground">Total de la compra:</div>
          <div className="font-medium">$279.94</div>
        </div>
      </CardFooter>
    </Card>
  )
}