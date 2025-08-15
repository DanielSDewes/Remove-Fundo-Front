import { useState, useRef } from "react"; // Adicione useRef

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null); // Crie a referência

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setResultImage(null);
    setError(null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return setError("Selecione uma imagem primeiro!");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://127.0.0.1:8000/remove-background/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao processar a imagem");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultImage(url);
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao remover o fundo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setResultImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container">
      <h1>Remover Fundo da Imagem</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className="buttons">
          <button type="submit" disabled={loading}>{loading ? "Processando..." : "Remover Fundo"}</button>
          <button type="button" onClick={handleClear}>Limpar</button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {preview && !resultImage && (
        <div className="preview">
          <h2>Pré-visualização:</h2>
          <img src={preview} alt="Preview" />
        </div>
      )}

      {resultImage && (
        <div className="result">
          <h2>Resultado:</h2>
          <img src={resultImage} alt="Sem fundo" />
          <a href={resultImage} download="imagem_sem_fundo.png">
            <button>Baixar Imagem</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
