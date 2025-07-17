'use client'

type EmpresasPageProps = {
  empresas: Empresas[]
}

export default function EmpresasPage({ empresas }: EmpresasPageProps) {
  return (
    <div>
      <h1 className="text-xl font-bold">Empresas</h1>
      <ul className="mt-4">
        {empresas.map((empresa) => (
          <li key={empresa.id}>{empresa.nombre}</li>
        ))}
      </ul>
    </div>
  )
}
