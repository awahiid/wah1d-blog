const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute =
    date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  return `${day} de ${months[month]} de ${year} a las ${hour}:${minute}`;
}

export function createImageURL(postId: string, imageName: string) {
  return `https://cprdweuivncsqzpwmnvm.supabase.co/storage/v1/object/public/posts/${postId}/${imageName}`;
}
