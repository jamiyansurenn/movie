import { Metadata } from "next";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header/Header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";



export const metadata: Metadata = {
  title: "KDL.COM",
  // ...other metadata...
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col items-center mt-[80px]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
        <Footer />
      </body>
      <link rel="icon" href="@/public/star.png" />
    </html>
  );
}
