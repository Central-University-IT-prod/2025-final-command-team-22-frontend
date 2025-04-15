import { IMGBB_API_KEY, IMGBB_API_URL, MAX_FILE_SIZE } from "@/shared/constants/constants";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/bmp", "image/tiff", "image/webp", "image/heic"];

export const uploadToImgBB = async (files: FileList | undefined): Promise<string> => {
  if (files === undefined) throw new Error("Выберите файл");

  const file = files[0];

  // Проверка типа файла
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error("Неподдерживаемый формат файла. Разрешены только JPEG, PNG, BMP, TIFF, WebP и HEIC");
  }

  // Проверка размера файла
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Размер файла не должен превышать ${MAX_FILE_SIZE / (1024 * 1024)} МБ`);
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", IMGBB_API_KEY);

  const response = await fetch(`${IMGBB_API_URL}/1/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!data.success) throw new Error("Ошибка загрузки изображения");
  return data.data.url;
};
