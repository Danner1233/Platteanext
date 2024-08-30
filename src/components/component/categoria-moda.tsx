
import Link from "next/link"

export function CategoriaModa() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Moda</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="bg-background rounded-lg overflow-hidden shadow-lg group">
          <Link href="#" className="block" prefetch={false}>
            <img
              src="/placeholder.svg"
              alt="Store Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-90 transition-opacity"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">Cozy Home Decor</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Discover a wide range of stylish and affordable home decor items to transform your living space.
              </p>
            </div>
          </Link>
        </div>
        <div className="bg-background rounded-lg overflow-hidden shadow-lg group">
          <Link href="#" className="block" prefetch={false}>
            <img
              src="/placeholder.svg"
              alt="Store Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-90 transition-opacity"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">Rustic Charm</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Explore our collection of rustic-inspired home decor items to bring a touch of warmth and character to
                your space.
              </p>
            </div>
          </Link>
        </div>
        <div className="bg-background rounded-lg overflow-hidden shadow-lg group">
          <Link href="#" className="block" prefetch={false}>
            <img
              src="/placeholder.svg"
              alt="Store Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-90 transition-opacity"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">Modern Minimalist</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Elevate your home with our selection of modern and minimalist decor pieces that exude elegance and
                simplicity.
              </p>
            </div>
          </Link>
        </div>
        <div className="bg-background rounded-lg overflow-hidden shadow-lg group">
          <Link href="#" className="block" prefetch={false}>
            <img
              src="/placeholder.svg"
              alt="Store Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-90 transition-opacity"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">Boho Chic</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Discover our collection of boho-inspired home decor items to create a cozy and eclectic atmosphere in
                your living space.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
