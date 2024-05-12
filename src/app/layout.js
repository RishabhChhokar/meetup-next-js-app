import Layout from "../components/layout/Layout";
import "../styles/globals.css";

export const metadata = {
  title: "Meetup app",
  description: "MeetUp app built using next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
