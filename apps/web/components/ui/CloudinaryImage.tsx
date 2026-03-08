import Image, { type ImageProps } from "next/image";
import { buildCloudinaryImageUrl, type CloudinaryImageOptions } from "@/lib/cloudinary";

type Props = Omit<ImageProps, "src"> & {
  publicId: string;
  transform?: CloudinaryImageOptions;
};

export function CloudinaryImage({ publicId, transform, alt, ...props }: Props) {
  const src = buildCloudinaryImageUrl(publicId, transform);

  return <Image src={src} alt={alt} {...props} />;
}