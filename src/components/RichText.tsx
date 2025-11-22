import { PortableText, PortableTextProps } from "@portabletext/react";
import { forwardRef } from "react";
import { join } from "@/utils/join";

interface RichTextProps extends PortableTextProps {
  className?: string;
}

export const RichText = forwardRef<HTMLDivElement, RichTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={join("prose", className)}>
        <PortableText {...props} />
      </div>
    );
  }
);

RichText.displayName = "RichText";
