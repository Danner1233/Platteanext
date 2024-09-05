
"use client"

import { useState } from "react"

export function Footer() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [fullName, setFullName] = useState("")
  const [message, setMessage] = useState("")
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Contáctanos</h3>
              <button onClick={() => setIsPopupOpen(false)} className="text-gray-900 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full h-24 resize-none"
                  placeholder="Escribe tu mensaje aquí"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <footer className="bg-black text-white p-4 md:p-6 w-full mt-auto">
        <div className="container max-w-7xl flex flex-col items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-2 mt-4 text-white">
              <p className="text-sm">© 2024 Plattea. Todos los derechos reservados.</p>
              <button onClick={() => setIsPopupOpen(true)} className="text-sm font-medium text-white">
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
