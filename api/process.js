export default async function handler(req, res) {
  const AUTH_TOKEN = process.env.STEPHANEE_SECRET_KEY;

  if (req.headers.authorization !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ message: "No autorizado" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { filename, content } = req.body;

  if (!filename || !content) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  return res.status(200).json({
    message: "Archivo procesado correctamente",
    resultado: `Archivo '${filename}' con ${content.length} caracteres recibido.`,
  });
}

