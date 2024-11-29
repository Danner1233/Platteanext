/** @type {import('next').NextConfig} **/
const nextConfig = {
  images: {
    domains: ['localhost'], // Añade aquí los dominios desde los que quieres permitir la carga de imágenes
  },
  env: {
    SERVER_URL: 'https://platea-server-1rqr.onrender.com', // Define aquí tu variable de entorno
  },
};

export default nextConfig;