import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todolist",
  description: "A simple todo list application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body style={{backgroundColor: "rgb(137, 185, 185)"}}>
        {children}
      </body>
    </html>
  );  
}
