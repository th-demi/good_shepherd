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
import ReviewsBlock from "./components/ReviewsBlock";
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
          <ReviewsBlock />
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
    // Add About us, Exams, Admission in the navigation menu
    // No Repeated persons in photos/videos
    // Photos in reviews
    // Align what our commnity says
    // blinker in exam reult hyperlink
    // Add schools in exam results
    // Name, Class, Slot,UPI using gpay and Payment details if logged in
  );
}