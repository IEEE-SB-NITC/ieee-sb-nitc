import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CountdownGate from "@/components/CountdownGate/CountdownGate";

export default function PublicLayout({ children }) {
  return (
    <CountdownGate>
      <Navbar />
      {children}
      <Footer />
    </CountdownGate>
  );
}
