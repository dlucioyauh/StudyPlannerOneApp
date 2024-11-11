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
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
