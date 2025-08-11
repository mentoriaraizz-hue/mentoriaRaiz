import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("https://mentoriaraiz-api.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErro(data.message);
        return;
      }

      // Salvar o token no localStorage
      localStorage.setItem("adminToken", data.token);

      // Redirecionar para o dashboard
      window.location.href = "/admin";
    } catch (error) {
      console.error(error);
      setErro("Erro ao tentar fazer login.");
    }
  }

  return (
    <div className="flex pt-[10%] flex-col items-center mx-auto bg-gradient-to-bl from-[#350e0e] via-[#630303] to-[#350e0e] min-h-[100vh] w-[100vw] ">
      <form className="flex flex-col items-center justify-center p-10" onSubmit={handleLogin}>
      <h2 className="text-4xl font-semibold mb-10 " >Login Admin</h2>
        <input className="outline-0 hover:outline-1 hover:outline-yellow-500 rounded-2xl p-2 mb-2 focus:outline-yellow-500 focus:outline-1 "
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input className="outline-0 hover:outline-1 hover:outline-yellow-500 rounded-2xl p-2 mb-2 focus:outline-yellow-500 focus:outline-1"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button className="bg-amber-600 rounded-2xl p-2 mt-2 w-[100px] cursor-pointer" type="submit">Entrar</button>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>
    </div>
  );
}
