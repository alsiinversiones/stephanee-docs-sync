const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/documents"],
});

app.post("/update-doc", async (req, res) => {
  const { documentId, content } = req.body;

  try {
    const authClient = await auth.getClient();
    const docs = google.docs({ version: "v1", auth: authClient });

    const response = await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: content + "\n\n",
            },
          },
        ],
      },
    });

    res.status(200).send("Documento actualizado correctamente");
  } catch (error) {
    console.error("Error actualizando el documento:", error);
    res.status(500).send("Hubo un error");
  }
});

app.get("/", (req, res) => {
  res.send("Servidor de Stephanee Docs activo 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
