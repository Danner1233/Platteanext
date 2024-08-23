import Image from "next/image"

export function Banner() {
  return (
    <section className="w-full">
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]">
        <Image
          src="/placeholder.svg"
          alt="Banner Image"
          layout="fill" // Utiliza 'layout="fill"' para ocupar el contenedor
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw" // Opcional: puedes ajustar según el diseño
          style={{ aspectRatio: "1920/720", objectFit: "cover" }}
        />
      </div>
    </section>
  )
}
