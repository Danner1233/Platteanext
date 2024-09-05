
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"

export function Comentarios() {
  return (
    <div className="mx-auto px-4 md:px-6 max-w-2x2 grid gap-12">
      <h2 className="text-2xl font-bold">Comentarios de los clientes</h2>
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">Sarah Johnson</h3>
              <time className="text-sm text-muted-foreground">2 días atrás</time>
            </div>
          </div>
          <div className="text-sm leading-loose text-muted-foreground">
            <p>
              He estado experimentando con mi LuminaCook Multi-Function Air Fryer durante algunas semanas y ha sido una
              adición versátil a mi cocina. Es genial para hacer papas fritas crujientes, alitas de pollo e incluso
              algunas opciones más saludables.
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">Alex Smith</h3>
              <time className="text-sm text-muted-foreground">3 semanas atrás</time>
            </div>
          </div>
          <div className="text-sm leading-loose text-muted-foreground">
            <p>
              Recientemente compré el SparkleShine Home Cleaning Robot y ha sido un cambio de juego en mi vida. Solía
              pasar horas cada fin de semana limpiando mi casa, pero ahora puedo simplemente encender este pequeño robot
              y dejar que haga el trabajo. Es increíblemente eficiente, navegando por los obstáculos con facilidad. La
              única razón por la que no le di una calificación perfecta de 5 estrellas es que a veces se atasca debajo
              de los muebles bajos. En general, ha sido una gran adición a mi hogar, ahorrándome tiempo y esfuerzo.
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">Emily Parker</h3>
              <time className="text-sm text-muted-foreground">2 días atrás</time>
            </div>
          </div>
          <div className="text-sm leading-loose text-muted-foreground">
            <p>
              La duración de la batería es impresionante, durándome para vuelos de larga distancia sin problemas. Son
              cómodos de usar durante períodos prolongados y aprecio el diseño elegante. Vale cada centavo y se los
              recomendaría a cualquiera que valore el audio de alta calidad y la paz y la tranquilidad.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-muted p-6 rounded-md">
        <h3 className="text-lg font-semibold mb-4">Deja tu comentario</h3>
        <form className="grid gap-4">
          <Textarea placeholder="Escribe tu comentario aquí..." rows={3} className="resize-none" />
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </div>
  )
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
