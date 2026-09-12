import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grade Target Calculator",
  description: "Work out exactly what average you need to hit your target grade.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
