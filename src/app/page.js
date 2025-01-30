// pages/index.js
import Header from "./components/Header";
import MainNavigation from "./components/MainNavigation";
import IntroKeylineBlock from "./components/IntroKeylineBlock";
import RecitalBlock from "./components/RecitalBlock";
import AcademyGuideBlock from "./components/AcademyGuideBlock";
import AdmissionsBlock from "./components/AdmissionsBlock";
import ExamsBlock from "./components/ExamsBlock";
import TeachersandtutorsBlock from "./components/TeachersandtutorsBlock";
import AdmissionsDetails from "./components/AdmissionDetails";
import FooterTop from "./components/FooterTop";
import FooterBottom from "./components/FooterBottom";
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
        <AdmissionsBlock />
        {/*<FutureOfMusicBlock />*/}
        {/* <AdmissionsDetails /> */}
        <FooterTop />
        <FooterBottom />
      </main>
      <footer>

      </footer>
    </div>
    // Audition to admission
    //
    // scholarships to International exam boards (scroll logos of 4 schools, anchor to new page for details) registered exam centres of RSL and MTB(highlighted)
    // Artisitic excellence - genral tutors info
  );
}