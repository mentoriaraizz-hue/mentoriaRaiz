import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [dados, setDados] = useState(null);
  const [busca, setBusca] = useState("");

  const token = localStorage.getItem("adminToken");

  function carregarDados(searchTerm = "") {
    let url = "https://mentoriaraiz-api.onrender.com/api/admin/dashboard";
    if (searchTerm) {
      url += `?search=${encodeURIComponent(searchTerm)}`;
    }

    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setDados(data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    carregarDados(); // sem filtro no início
  }, []);

  function logout() {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  }

  function handleSearch(e) {
    e.preventDefault();
    carregarDados(busca); // chama com filtro
  }

  return (
    <div className="min-h-[100vh] min-w-[100vw] bg-gradient-to-bl from-[#350e0e] via-[#630303] to-[#350e0e]">
      <header className="flex pt-[80px] justify-between px-3 w-full">
        <h1 className="text-2xl font-semibold">Dashboard Admin</h1>
        <button
          className="bg-amber-600 p-2 w-[80px] rounded font-semibold"
          onClick={logout}
        >
          Sair
        </button>
      </header>

      <form onSubmit={handleSearch} className="p-4 flex gap-2">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome, email ou whatsapp"
          className="p-2 rounded text-black"
        />
        <button type="submit" className="bg-yellow-600 p-2 rounded">
          Buscar
        </button>
      </form>

      <div className="p-4">
        {dados?.inscritos?.map((i) => (
          <div key={i._id} className="bg-white text-black p-2 mb-2 rounded">
            <p>
              <strong>Tipo:</strong> {i.tipo}
            </p>

            {i.tipo === "individual" && (
              <>
                <p>
                  <strong>Nome:</strong> {i.nome}
                </p>
                <p>
                  <strong>Email:</strong> {i.email}
                </p>
                <p>
                  <strong>Idade:</strong> {i.idade}
                </p>
                <p>
                  <strong>Profissão:</strong> {i.profissao}
                </p>
                <p>
                  <strong>Empresa:</strong> {i.empresa}
                </p>
                <p>
                  <strong>paymentId:</strong> {i.paymentId}
                </p>
                <p>
                  <strong>Valor:</strong> {i.valor}
                </p>
                <p>
                  <strong>Status:</strong> {i.status}
                </p>
              </>
            )}

            {i.tipo === "socios" && (
              <>
                <p>
                  <strong>Sócios:</strong>
                </p>
                {i.socios?.map((socio, idx) => (
                  <div key={idx} className="ml-4 mb-1">
                    <p>
                      <strong>Nome do sócio:</strong> {i.socio.nomeSocio1}
                    </p>
                    <p>
                      <strong>Nome do sócio2:</strong> {i.socio.nomeSocio2}
                    </p>
                    <p>
                      <strong>Email do sócio:</strong> {i.socio.emailSocio1}
                    </p>
                    <p>
                      <strong>Email do sócio2:</strong> {i.socio. emailSocio2}
                    </p>
                    <p>
                      <strong>Whatszap do sócio:</strong> {i.socio.whatsappSocio1}
                    </p>
                    <p>
                      <strong>Email do sócio2:</strong> {i.socio.whatsappSocio2}
                    </p>
                    <p>
                      <strong>Empresa:</strong> {i.socio.empresaSocio}
                    </p>
                    <p>
                      <strong>Profissão:</strong> {i.socio. profissaoSocio}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
