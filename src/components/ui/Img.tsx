import { getImageDimensions } from "@sanity/asset-utils";
import type { ImageUrlBuilderOptionsWithAliases } from "@sanity/image-url";
import Image, { type ImageProps } from "next/image";
import { stegaClean } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

type SanityImage = {
  asset?: {
    url?: string | null;
    metadata?: {
      lqip?: string | null;
      dimensions?: {
        width?: number | null;
        height?: number | null;
        aspectRatio?: number | null;
      } | null;
    } | null;
  } | null;
  crop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  } | null;
  hotspot?: {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  } | null;
};

export default function ({
  image,
  width,
  height,
  imageOptions,
  fill,
  ...props
}: {
  image?: SanityImage;
  imageOptions?: Partial<ImageUrlBuilderOptionsWithAliases>;
} & Omit<ImageProps, "src">) {
  if (!image?.asset?.url) return null;

  const { lqip } = image.asset.metadata ?? {};

  // @ts-expect-error - getImageDimensions expects stricter types but works with our flexible type
  const dimensions = getImageDimensions(image);
  const [w, h] = [
    (image.hotspot?.width ?? 1) * dimensions.width,
    (image.hotspot?.height ?? 1) * dimensions.height,
  ];

  // @ts-expect-error - loading property may exist on legacy image objects
  const loading = stegaClean(props.loading || image.loading);

  return (
    <Image
      src={
        urlFor(image)
          .withOptions({ auto: "format", q: 100, ...imageOptions })
          .url() ?? image.asset.url
      }
      {...(fill
        ? { fill: true }
        : {
            width: width ?? Math.round(height ? (Number(height) * w) / h : w),
            height: height ?? Math.round(width ? (Number(width) * h) / w : h),
          })}
      loading={loading}
      {...(loading === "eager"
        ? { priority: true, fetchPriority: "high" }
        : {})}
      placeholder={lqip ? "blur" : undefined}
      blurDataURL={lqip || undefined}
      {...props}
    />
  );
}
