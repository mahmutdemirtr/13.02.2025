import { Roboto, Rubik_Mono_One, Sofadi_One } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from '@/redux/providers/ReduxProvider';

// Configure fonts
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  styles: ["normal", "italic"],
  display: "swap",
});

const rubikMonoOne = Rubik_Mono_One({
  subsets: ["latin"],
  weight: ["400"], // Rubik Mono One only supports normal weight
  display: "swap",
});

const sofadiOne = Sofadi_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
export const metadata = {
  title: "Unlock Any Private Instagram Profile",
  description: "Unlock the Secrets Now! Unlock Any Private Instagram Profile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${rubikMonoOne.variable} ${sofadiOne.variable}`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
