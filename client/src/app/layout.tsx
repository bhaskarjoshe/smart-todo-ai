import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Smart-Todo",
  description: "An AI Powered todo list app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        <main className="max-w-6xl mx-auto p-4 bg-gray-900">{children}</main>
      </body>
    </html>
  );
}
