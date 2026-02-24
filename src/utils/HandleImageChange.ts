import { ChangeEvent, useState } from "react";

interface UseImageUploadReturn {
  imageUrl: string | null;
  imageBase64: string | null;
  error: string | null;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MAX_SIZE_MB = 2;

export function useImageUpload(): UseImageUploadReturn {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    setError(null);

    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione um arquivo de imagem.");
      return;
    }

    const maxSizeInBytes = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(`O tamanho máximo do arquivo é ${MAX_SIZE_MB}MB.`);
      return;
    }

    setImageUrl(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = ({ target }) => {
      setImageBase64(target?.result as string ?? null);
    };
    reader.onerror = () => setError("Erro ao importar imagem!");
    reader.readAsDataURL(file);
  }

  return { imageUrl, imageBase64, error, handleImageChange };
}