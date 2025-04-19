export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { documentId, content } = req.body;

  if (!documentId || !content) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  return res.status(200).json({
    message: "Documento actualizado correctamente",
    docId: documentId,
    caracteres: content.length,
  });
}

