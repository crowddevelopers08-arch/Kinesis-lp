import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainCheck from "@/components/PainCheck";
import Conditions from "@/components/Conditions";
import WhyKinesis from "@/components/WhyKinesis";
import Specialists from "@/components/Specialists";
import Treatments from "@/components/Treatments";
import CareApproach from "@/components/CareApproach";
import PatientStories from "@/components/PatientStories";
import ClinicGallery from "@/components/ClinicGallery";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainCheck />
        <Conditions />
        <WhyKinesis />
        <Specialists />
        <Treatments />
        <CareApproach />
        <PatientStories />
        <ClinicGallery />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
