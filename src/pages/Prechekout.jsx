import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function Precheckout() {
  const [openForm, setOpenForm] = useState(false);
  const [tipo, setTipo] = useState("individual");

  // Campos Individual
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [profissao, setProfissao] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [outraProfissao, setOutraProfissao] = useState("");

  // Campos Sócios
  const [nomeSocio1, setNomeSocio1] = useState("");
  const [emailSocio1, setEmailSocio1] = useState("");
  const [nomeSocio2, setNomeSocio2] = useState("");
  const [emailSocio2, setEmailSocio2] = useState("");
  const [whatsappSocio, setWhatsappSocio] = useState("");
  const [profissaoSocio, setProfissaoSocio] = useState("");
  const [empresaSocio, setEmpresaSocio] = useState("");
  const [outraProfissaoSocio, setOutraProfissaoSocio] = useState("");

  useEffect(() => {
    document.body.style.overflow = openForm ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openForm]);

  const resetForm = () => {
    setNome("");
    setIdade("");
    setEmail("");
    setWhatsapp("");
    setProfissao("");
    setEmpresa("");
    setOutraProfissao("");
    setNomeSocio1("");
    setEmailSocio1("");
    setNomeSocio2("");
    setEmailSocio2("");
    setWhatsappSocio("");
    setProfissaoSocio("");
    setEmpresaSocio("");
    setOutraProfissaoSocio("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;

    if (tipo === "individual") {
      data = {
        tipo,
        nome,
        idade,
        email,
        whatsapp,
        profissao: profissao === "outro" ? outraProfissao : profissao,
        empresa: profissao === "empreendedor" ? empresa : "",
      };
    } else if (tipo === "socios") {
      data = {
        tipo,
        nome: nomeSocio1,
        email: emailSocio1,
        whatsapp: whatsappSocio,
        profissao: profissaoSocio === "outro" ? outraProfissaoSocio : profissaoSocio,
        empresa: profissaoSocio === "empreendedor" ? empresaSocio : "",
        socios: [
          { nome: nomeSocio1, email: emailSocio1 },
          ...(nomeSocio2 || emailSocio2 ? [{ nome: nomeSocio2, email: emailSocio2 }] : [])
        ]
      };
    } else {
      alert("Tipo de inscrição inválido");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erro ao enviar inscrição");

      const responseData = await res.json();

      if (responseData.init_point) {
        window.location.href = responseData.init_point;
      } else {
        throw new Error("Erro ao gerar link de pagamento");
      }
    } catch (error) {
      alert(error.message);
    }
    resetForm()
  };

  return (
    <>
      {/* Conteúdo principal */}
      <main className="flex flex-col items-center pt-[18%] sm:pt-[0] bg-gradient-to-bl from-[#350e0e] via-[#630303] to-[#350e0e] min-h-screen text-white px-4">
        <h1 className="text-2xl sm:text-3xl font-semibold mt-[8%] sm:w-[40ch] text-center">
          Parabéns por decidir investir em você e no seu futuro, empreendedor!!
        </h1>

        <p className="mt-7">
          Sua inscrição na{" "}
          <span className="text-[#CC8C05] font-medium">Mentoria Raiz</span> está
          quase completa.
        </p>

        <ul className="w-full pl-5 mt-12 text-left">
          <p className="mb-7">
            Preencha seus dados com atenção e finalize sua inscrição para
            garantir:
          </p>
          <li className="flex items-center gap-1.5 mb-2"><img className="w-[30px]" src="check.png" alt="" /> Encontros ao vivo quinzenais com Thalyta Eloah.</li>
          <li className="flex items-center gap-1.5 mb-2"><img className="w-[30px]" src="check.png" alt="" /> Acesso ao grupo exclusivo de mentorados(as).</li>
          <li className="flex items-center gap-1.5 mb-2"><img className="w-[30px]" src="check.png" alt="" /> Materiais práticos e exercícios de implementação.</li>
          <li className="flex items-center gap-1.5 mb-2"><img className="w-[30px]" src="check.png" alt="" /> Desafios mensais com foco em progresso real.</li>
          <li className="flex items-center gap-1.5 mb-2"><img className="w-[30px]" src="check.png" alt="" /> Uma jornada de 3 meses de transformação.</li>
        </ul>

        <p className="my-6 font-semibold">
          Nos vemos do outro lado. É hora de construir com raiz e com verdade.
        </p>

        <div className="text-center">
          <h2 className="text-3xl text-yellow-600 font-semibold">Investimento</h2>
          <div className="flex items-center justify-center flex-wrap my-5 gap-16">
            <div className="border-1 border-yellow-600 p-[20px_40px] text-center rounded-2xl">
              <h3 className="my-2 text-3xl">Individual</h3>
              <p className="flex flex-col">
                <span className="font-semibold text-[14px]">investimento: </span>
                <span className="text-4xl py-1">R$ 3.597</span>
              </p>
            </div>
            <div className="border-1 border-yellow-600 p-[20px_40px] text-center rounded-2xl">
              <h3 className="my-2 text-3xl">Sócios</h3>
              <p className="flex flex-col">
                <span className="font-semibold text-[14px]">investimento: </span>
                <span className="text-4xl py-1">R$ 5.597</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pro-scale scale-[.9] mt-16 border-1 border-yellow-600 p-8 rounded-[6px] font-light text-center">
          <p>
            <span className="font-semibold">Promoção:</span> de{" "}
            <span className="font-medium line-through">R$ 3.597</span> por{" "}
            <span className="font-medium">R$ 2.997</span> para os{" "}
            <span className="text-[18px] font-medium">5 primeiros inscritos</span>
          </p>
          <p className="text-yellow-600 font-semibold text-[10px]">
            <span className="text-[12px]">Atenção:</span> promoção válida apenas para individual
          </p>
        </div>

        <button
          onClick={() => setOpenForm(true)}
          className="text-[18px] text-white font-semibold p-3 bg-gradient-to-bl from-[#8a6c21] to-[#886e08] mt-10 mb-10 rounded-[10px]"
        >
          INSCREVA-SE
        </button>
      </main>

      <Footer />

      {/* MODAL */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 bg-opacity-70 transition-opacity duration-500 ${openForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className={`bg-white text-black rounded-lg p-8 w-[80%] h-[85%] max-w-md relative transform transition-all duration-500 ${openForm ? "scale-100" : "scale-95"}`}>
          <button onClick={() => setOpenForm(false)} className="absolute top-2 right-3 text-gray-700 text-2xl font-bold hover:text-red-600">&times;</button>

          {/* TOGGLE */}
          <div className="flex mb-6 border border-gray-300 rounded overflow-hidden">
            <button onClick={() => setTipo("individual")} className={`flex-1 py-2 font-medium ${tipo === "individual" ? "bg-yellow-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}>
              Individual
            </button>
            <button onClick={() => setTipo("socios")} className={`flex-1 py-2 font-medium ${tipo === "socios" ? "bg-yellow-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}>
              Sócios
            </button>
          </div>

          {/* FORMULÁRIOS */}
          <div className="overflow-hidden relative h-auto">
            <div className="flex transition-transform duration-500" style={{ transform: tipo === "individual" ? "translateX(0%)" : "translateX(-50%)", width: "200%" }}>
              {/* Form Individual */}
              <div className="w-[49.5%] px-4">
                <h2 className="text-xl font-semibold mb-4">Preencha seus dados:</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input type="text" placeholder="Nome completo" className="w-full border p-2" value={nome} onChange={(e) => setNome(e.target.value)} required />
                  <input type="text" placeholder="Idade" className="w-full border p-2" value={idade} onChange={(e) => setIdade(e.target.value)} required />
                  <input type="email" placeholder="E-mail" className="w-full border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <input type="text" placeholder="WhatsApp com DDD" className="w-full border p-2" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
                  <select value={profissao} onChange={(e) => setProfissao(e.target.value)} className="w-full border p-2" required>
                    <option value="">Selecione sua profissão</option>
                    <option value="advogado">Advogado(a)</option>
                    <option value="designer">Designer</option>
                    <option value="psicologo">Psicólogo(a)</option>
                    <option value="empreendedor">Empresário(a)</option>
                    <option value="outro">Outro</option>
                  </select>
                  {profissao === "empreendedor" && <input type="text" placeholder="Nome da empresa" className="w-full border p-2" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />}
                  {profissao === "outro" && <input type="text" placeholder="Digite sua profissão" className="w-full border p-2" value={outraProfissao} onChange={(e) => setOutraProfissao(e.target.value)} />}
                  <button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded">Finalizar inscrição</button>
                </form>
              </div>

              {/* Form Sócios */}
              <div className="w-1/2 pl-4">
                <h2 className="text-xl font-semibold mb-4">Preencha os dados dos sócios:</h2>
                <form className="space-y-4 px-4 overflow-y-auto h-[80%]" onSubmit={handleSubmit}>
                  <input type="text" placeholder="Nome do sócio 1" className="w-full border p-2" value={nomeSocio1} onChange={(e) => setNomeSocio1(e.target.value)} required />
                  <input type="email" placeholder="E-mail do sócio 1" className="w-full border p-2" value={emailSocio1} onChange={(e) => setEmailSocio1(e.target.value)} required />
                  <input type="text" placeholder="Nome do sócio 2" className="w-full border p-2" value={nomeSocio2} onChange={(e) => setNomeSocio2(e.target.value)} />
                  <input type="email" placeholder="E-mail do sócio 2" className="w-full border p-2" value={emailSocio2} onChange={(e) => setEmailSocio2(e.target.value)} />
                  <input type="text" placeholder="WhatsApp com DDD" className="w-full border p-2" value={whatsappSocio} onChange={(e) => setWhatsappSocio(e.target.value)} required />
                  <select value={profissaoSocio} onChange={(e) => setProfissaoSocio(e.target.value)} className="w-full border p-2" required>
                    <option value="">Selecione a profissão</option>
                    <option value="advogado">Advogado(a)</option>
                    <option value="designer">Designer</option>
                    <option value="psicologo">Psicólogo(a)</option>
                    <option value="empreendedor">Empresário(a)</option>
                    <option value="outro">Outro</option>
                  </select>
                  {profissaoSocio === "empreendedor" && <input type="text" placeholder="Nome da empresa" className="w-full border p-2" value={empresaSocio} onChange={(e) => setEmpresaSocio(e.target.value)} />}
                  {profissaoSocio === "outro" && <input type="text" placeholder="Digite sua profissão" className="w-full border p-2" value={outraProfissaoSocio} onChange={(e) => setOutraProfissaoSocio(e.target.value)} />}
                  <button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded">Finalizar inscrição</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
