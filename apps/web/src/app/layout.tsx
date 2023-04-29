import { Providers } from "@/components/Providers";
import { ClerkProvider } from "@clerk/nextjs/app-beta";

import "./../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body className="bg-white dark:bg-zinc-950">
          <Providers>{children}</Providers>
        </body>
      </ClerkProvider>
    </html>
  );
}
