
import Link from "next/link"

export function Productos() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-background shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Productos</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 md:px-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-8">
        <Link href="/product" className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2" prefetch={false}>
          <img
            src="/placeholder.svg"
            alt="Product 1"
            width={500}
            height={400}
            className="object-cover w-full h-64"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-xl font-bold">Classic Leather Shoes</h3>
            <p className="text-sm text-muted-foreground">Elegant and comfortable</p>
            <h4 className="text-lg font-semibold md:text-xl">$59.99</h4>
          </div>
        </Link>
        <Link href="/product" className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2" prefetch={false}>
          <span className="sr-only">View</span>
          <img
            src="/placeholder.svg"
            alt="Product 2"
            width={500}
            height={400}
            className="object-cover w-full h-64"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-xl font-bold">Designer Handbag</h3>
            <p className="text-sm text-muted-foreground">Fashion statement</p>
            <h4 className="text-lg font-semibold md:text-xl">$89.99</h4>
          </div>
        </Link>
        <Link href="/product" className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2" prefetch={false}>
          <span className="sr-only">View</span>
          <img
            src="/placeholder.svg"
            alt="Product 3"
            width={500}
            height={400}
            className="object-cover w-full h-64"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-xl font-bold">Wireless Earbuds</h3>
            <p className="text-sm text-muted-foreground">Crystal clear audio</p>
            <h4 className="text-lg font-semibold md:text-xl">$69.99</h4>
          </div>
        </Link>
        <Link href="/product" className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2" prefetch={false}>
          <span className="sr-only">View</span>
          <img
            src="/placeholder.svg"
            alt="Product 4"
            width={500}
            height={400}
            className="object-cover w-full h-64"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-xl font-bold">Vintage Pocket Watch</h3>
            <p className="text-sm text-muted-foreground">Antique charm</p>
            <h4 className="text-lg font-semibold md:text-xl">$79.99</h4>
          </div>
        </Link>
      </div>
    </div>
  )
}
