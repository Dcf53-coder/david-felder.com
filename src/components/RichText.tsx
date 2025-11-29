import { PortableText, PortableTextProps, PortableTextComponents } from "@portabletext/react";
import { forwardRef } from "react";
import Link from "next/link";
import { join } from "@/utils/join";

interface RichTextProps extends PortableTextProps {
  className?: string;
}

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const { href, blank } = value;
      if (blank) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0B708A] hover:underline"
          >
            {children}
          </a>
        );
      }
      return (
        <a href={href} className="text-[#0B708A] hover:underline">
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      const { reference } = value;
      // Handle internal links - you can customize this based on your routing structure
      if (reference?._ref) {
        const href = `/${reference._type}/${reference._ref}`;
        return (
          <Link href={href} className="text-[#0B708A] hover:underline">
            {children}
          </Link>
        );
      }
      return <span>{children}</span>;
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  block: {
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-700">
        {children}
      </h3>
    ),
  },
};

export const RichText = forwardRef<HTMLDivElement, RichTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={join("prose", className)}>
        <PortableText components={components} {...props} />
      </div>
    );
  }
);

RichText.displayName = "RichText";
