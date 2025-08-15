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

    <div className="p-4 overflow-x-auto">
  <table className="min-w-full border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2 border">Tipo</th>
        <th className="px-4 py-2 border">Nome</th>
        <th className="px-4 py-2 border">Email</th>
        <th className="px-4 py-2 border">Idade</th>
        <th className="px-4 py-2 border">Profissão</th>
        <th className="px-4 py-2 border">Empresa</th>
        <th className="px-4 py-2 border">Payment ID</th>
        <th className="px-4 py-2 border">Valor</th>
        <th className="px-4 py-2 border">Status</th>
      </tr>
    </thead>
    <tbody>
      {dados?.inscritos?.map((i) => (
        <tr key={i._id} className="text-center border">
          <td className="px-4 py-2 border">{i.tipo}</td>

          {i.tipo === "individual" ? (
            <>
              <td className="px-4 py-2 border">{i.nome}</td>
              <td className="px-4 py-2 border">{i.email}</td>
              <td className="px-4 py-2 border">{i.idade}</td>
              <td className="px-4 py-2 border">{i.profissao}</td>
              <td className="px-4 py-2 border">{i.empresa}</td>
              <td className="px-4 py-2 border">{i.paymentId}</td>
              <td className="px-4 py-2 border">{i.valor}</td>
              <td className="px-4 py-2 border">{i.status}</td>
            </>
          ) : (
            <>
              <td className="px-4 py-2 border">{i.nomeSocio1}, {i.nomeSocio2}</td>
              <td className="px-4 py-2 border">{i.emailSocio1}, {i.emailSocio2}</td>
              <td className="px-4 py-2 border">{i.idadeSocio1}, {i.idadeSocio2}</td>
              <td className="px-4 py-2 border">{i.profissaoSocio1}, {i.profissaoSocio2}</td>
              <td className="px-4 py-2 border">{i.empresaSocio}</td>
              <td className="px-4 py-2 border">{i.paymentId}</td>
              <td className="px-4 py-2 border">{i.valor}</td>
              <td className="px-4 py-2 border">{i.status}</td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
