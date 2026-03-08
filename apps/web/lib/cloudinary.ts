const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export type CloudinaryImageOptions = {
  width?: number;
  height?: number;
  quality?: number | "auto";
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  crop?: "fill" | "fit" | "scale" | "thumb";
};

export function buildCloudinaryImageUrl(
  publicId: string,
  options: CloudinaryImageOptions = {},
): string {
  if (!cloudName) {
    throw new Error(
      "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME. Add it to apps/web/.env.local.",
    );
  }

  const transforms: string[] = ["f_auto", "q_auto"];

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.quality) transforms.push(`q_${options.quality}`);
  if (options.format) transforms.push(`f_${options.format}`);

  const cleanPublicId = publicId.replace(/^\/+/, "");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(",")}/${cleanPublicId}`;
}