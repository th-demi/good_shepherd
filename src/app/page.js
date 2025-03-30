// pages/index.js
import Header from "./components/Header";
import MainNavigation from "./components/MainNavigation";
import IntroKeylineBlock from "./components/IntroKeylineBlock";
import RecitalBlock from "./components/RecitalBlock";
import AcademyGuideBlock from "./components/AcademyGuideBlock";
import AdmissionsBlock from "./components/AdmissionsBlock";
import ExamsBlock from "./components/ExamsBlock";
import TeachersandtutorsBlock from "./components/TeachersandtutorsBlock";
import ReviewsBlock from "./components/ReviewsBlock";
import AdmissionsDetails from "./components/AdmissionDetails";
import FooterTop from "./components/FooterTop";
import FooterBottom from "./components/FooterBottom";
import ScrollUpButton from "./components/ScrollUpButton";
export default function Home() {
  return (
    <div>
      <div className="relative z-9999">
        <MainNavigation />
        <Header />
      </div>
      <main className="box-border">
        <IntroKeylineBlock />
        <AcademyGuideBlock />
        <RecitalBlock />
        <ExamsBlock />
        <TeachersandtutorsBlock />
        <ReviewsBlock />
        <AdmissionsBlock />
      </main>
      <ScrollUpButton />
      <footer>
        <FooterTop />
        <FooterBottom />
      </footer>
    </div>
    // 
  );
}