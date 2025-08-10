import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Sucesso() {
  const query = useQuery();
  const paymentId = query.get("payment_id") || query.get("collection_id"); // Mercado Pago pode usar esses nomes
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!paymentId) {
      setError("ID do pagamento não encontrado na URL");
      setLoading(false);
      return;
    }

    fetch(`http://www.mentoriaraiz.com.br/api/pagamento/${paymentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao consultar pagamento");
        return res.json();
      })
      .then((data) => {
        setStatus(data.status);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [paymentId]);

  if (loading) return <p>Verificando pagamento...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      {status === "approved" && <h1>Pagamento aprovado! Obrigado pela sua inscrição.</h1>}
      {status === "pending" && <h1>Pagamento pendente. Aguarde a confirmação.</h1>}
      {status === "rejected" && <h1>Pagamento rejeitado. Tente novamente ou contate o suporte.</h1>}
      {!["approved", "pending", "rejected"].includes(status) && (
        <h1>Status do pagamento: {status}</h1>
      )}
    </div>
  );
}
