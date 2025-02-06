// pages/index.js
import { AuthProvider } from "./components/MainNavigation";
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
import ScrollUpButton from "./components/ScrollUpButton";
export default function Home() {
  return (
    <AuthProvider>
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
          {/* <ReviewsBlock /> */}
          <AdmissionsBlock />
          {/*<FutureOfMusicBlock />*/}
          {/* <AdmissionsDetails /> */}
        </main>
        <ScrollUpButton />
        <footer>
          <FooterTop />
          <FooterBottom />
        </footer>
    </div>
    </AuthProvider>
    // Add tooltip to navigation icons
    // Add About us, Exams, Admission in the navigation menu
    // No Repeated persons in photos/videos
    // Add Review block (google review)

  );
}