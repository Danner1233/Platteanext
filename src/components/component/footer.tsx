import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted p-6 md:py-12 w-full bg-plattea1">
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="text-plattea2 text-sm mb-4 md:mb-0">Plattea &copy; 2024</div>
          <div className="flex gap-4 text-sm">
            <Link href="/contactus" className="hover:underline text-plattea2" prefetch={false}>
              Contáctanos
            </Link>
            <Link href="aboutus" className="hover:underline text-plattea2" prefetch={false}>
              Sobre nosotros
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
