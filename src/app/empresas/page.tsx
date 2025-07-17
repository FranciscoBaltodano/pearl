import { getEmpresas } from "@/api"
import EmpresasPage from "./empresas"

export default async function Page() {
  const empresas = await getEmpresas()

  if (!empresas || empresas.length === 0) {
    return <div>No se encontraron empresas</div>
  }

  return <EmpresasPage empresas={empresas} />
}
