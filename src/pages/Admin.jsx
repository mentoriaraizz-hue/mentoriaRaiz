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
  },[]);

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
        <button className="bg-amber-600 p-2 w-[80px] rounded font-semibold"  onClick={logout}>Sair</button>
      </header>

      <form onSubmit={handleSearch} className="p-4 flex gap-2">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome, email ou whatsapp"
          className="p-2 rounded text-black"
        />
        <button type="submit" className="bg-yellow-600 p-2 rounded">Buscar</button>
      </form>

      <div className="p-4">
        {dados?.inscritos?.map((i) => (
          <div key={i._id} className="bg-white text-black p-2 mb-2 rounded">
            <p><strong>Nome:</strong> {i.nome}</p>
            <p><strong>Email:</strong> {i.email}</p>
            <p><strong>WhatsApp:</strong> {i.whatsapp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
