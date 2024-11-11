// src/app/layout.tsx
import './globals.css'; // Importando o CSS global

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>StudyPlanner</title>
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="bg-green-500 text-white p-4 text-center">
          <h1 className="text-3xl font-bold">StudyPlanner</h1>
        </header>
        
        <main className="flex-1 mb-20"> {/* mb-20 adiciona uma margem inferior para o conteúdo */}
          {children}
        </main>

        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2024 IONKOD. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
