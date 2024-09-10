"use client";


import { useState, useEffect, SVGProps } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { jwtDecode } from "jwt-decode"; // Usa la importación correcta para jwt-decode
import { XIcon } from "lucide-react";

interface DecodedToken {
  IdPersona: string;
}

interface Profile {
  CorreoPersona: string;
}

export function Footer() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Permite valores null

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.IdPersona;

        const response = await fetch(
          `http://localhost:4000/api/persona/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data: Profile = await response.json();
          setEmail(data.CorreoPersona);
        } else {
          throw new Error("Error fetching profile");
        }
      } catch (error) {
        console.error(error);
        setError("Error al cargar el perfil");
      }
    };

    fetchProfile();
  }, []);

  

  if (error) {
    return (
      <footer className="bg-plattea1 py-8 md:py-5 text-white relative">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:gap-12">
          <div className="flex flex-col items-start gap-4">
            <a href="#" className="flex items-center">
              <PlatteaIcon className="h-9 w-8" />
              <span className="ml-2 text-lg font-bold">Plattea</span>
            </a>
            <div className="grid gap-2">
              <a href="#" className="text-sm hover:underline">
                Sobre Nosotros
              </a>
              <a href="#" className="text-sm hover:underline">
                Manual de Usuario
              </a>
              <a href="#" className="text-sm hover:underline">
                Términos y condiciones del sitio
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-lg font-bold">Contáctanos</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5" />
                <span>+57 3103549968</span>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="h-5 w-5" />
                <span>platteaonline@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-lg font-bold">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <XIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/platteaonline/" className="text-muted-foreground hover:text-primary">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 text-sm" style={{ right: '18px' }}>
          Copyright © {new Date().getFullYear()} Plattea Todos los derechos reservados
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-plattea1 py-8 md:py-5 text-white relative">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:gap-12">
        <div className="flex flex-col items-start gap-4">
          <a href="#" className="flex items-center">
            <PlatteaIcon className="h-9 w-8" />
            <span className="ml-2 text-lg font-bold">Plattea</span>
          </a>
          <div className="grid gap-2">
            <a href="#" className="text-sm hover:underline">
              Sobre Nosotros
            </a>
            <a href="#" className="text-sm hover:underline">
              Manual de Usuario
            </a>
            <a href="#" className="text-sm hover:underline">
              Términos y condiciones del sitio
            </a>
            <Dialog>
                <DialogTrigger asChild>
                  <span className="text-sm cursor-pointer hover:underline">
                    Feedback y Sugerencias
                  </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">           
                  <div className="flex flex-col items-center justify-center gap-4 py-8">
                  <DialogTitle>Feedback y Sugerencias</DialogTitle>
                  <DialogDescription>
                    Proporcione sus comentarios y sugerencias para ayudarnos a mejorar.
                  </DialogDescription>
                    <form action="https://formsubmit.co/platteaonline@gmail.com" method="POST" className="grid w-full gap-4">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="Email"
                        readOnly
                        name="Email"
                      />
                      <label htmlFor="name" className="text-sm font-medium">Asunto</label>
                      <Input id="name" type="text" placeholder="Asunto" name="Asunto" required />
                      <label htmlFor="feedback" className="text-sm font-medium">Comentarios</label>
                      <Textarea id="feedback" placeholder="Feedback y Sugerencias" name="comentario" required/>
                      <input type="hidden" name="_captcha" value="false"/>
                      <input type="hidden" name="_template" value="table"/>
                      <input type="hidden" name="_next" value="http://localhost:3000/"></input>
                      <Button type="submit">Enviar</Button>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-lg font-bold">Contáctanos</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" />
              <span>+57 3103549968</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="h-5 w-5" />
              <span>platteaonline@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-lg font-bold">Síguenos</h3>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary">
              <XIcon className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <FacebookIcon className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/platteaonline/" className="text-muted-foreground hover:text-primary">
              <InstagramIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 text-sm" style={{ right: '18px' }}>
        Copyright © {new Date().getFullYear()} Plattea Todos los derechos reservados
      </div>
    </footer>
  );
}

function FacebookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h2z" />
    </svg>
  );
}

function InstagramIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="3" />
      <line x1="17" y1="7" x2="17.01" y2="7" />
    </svg>
  );
}

function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PlatteaIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="500"
      height="500"
      viewBox="0 0 375 375"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="b21ddd5b3f">
          <path d="M 146 204 L 172 204 L 172 298.1875 L 146 298.1875 Z M 146 204 " clipRule="nonzero"/>
        </clipPath>
        <clipPath id="56fe638cd2">
          <path d="M 87.855469 76.9375 L 287.355469 76.9375 L 287.355469 229 L 87.855469 229 Z M 87.855469 76.9375 " clipRule="nonzero"/>
        </clipPath>
      </defs>
      <g clipPath="url(#b21ddd5b3f)">
        <path fill="#FFFFFF" d="M 146.160156 298.03125 L 171.722656 298.03125 L 171.722656 225.054688 C 162.449219 219.5 153.875 212.402344 146.160156 204.746094 Z M 146.160156 298.03125 " fillOpacity="1" fillRule="nonzero"/>
      </g>
      <g clipPath="url(#56fe638cd2)">
        <path fill="#FFFFFF" d="M 211.917969 79.765625 L 146.160156 79.765625 L 146.160156 138.328125 C 152.976562 149.121094 161.871094 161.652344 171.722656 172.289062 L 171.722656 105.789062 L 212.460938 105.789062 C 239.34375 105.789062 261.128906 127.574219 261.128906 154.457031 C 261.128906 161.394531 259.648438 167.851562 257.03125 173.667969 C 249.238281 191.015625 230.746094 202.527344 211.898438 203.128906 C 197.367188 203.589844 184.617188 194.832031 174.324219 185.398438 C 158.613281 170.96875 145.878906 153.519531 135.285156 135.089844 C 133.988281 132.851562 118.757812 105.46875 115.71875 100.273438 L 121.953125 96.675781 L 104.925781 86.820312 L 87.894531 76.964844 L 87.855469 116.300781 L 93.871094 112.84375 C 114.960938 150.882812 135.828125 194.875 174.683594 217.917969 C 179.71875 220.917969 185.035156 223.4375 190.59375 225.296875 C 210.941406 232.152344 232.804688 228.414062 250.996094 217.421875 C 258.890625 212.664062 265.925781 206.507812 271.621094 199.25 C 281.316406 186.898438 287.132812 171.527344 287.113281 154.398438 C 287.09375 113.085938 253.234375 79.765625 211.917969 79.765625 Z M 211.917969 79.765625 " fillOpacity="1" fillRule="nonzero"/>
      </g>
    </svg>
  );
}

function PhoneIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path fill="currentColor" d="m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8 8 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208A128.14 128.14 0 0 1 48 80a40.2 40.2 0 0 1 34.87-40a.6.6 0 0 0 0 .12l21 47l-20.67 24.74a6 6 0 0 0-.57.77a16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8 8 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208"/>
    </svg>
  );
}