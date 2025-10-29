"use client";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import Countdown from "@/components/Countdown";
import LeaderboardTable from "@/components/LeaderboardTable";
import "@/app/globals.css";

export default function Page() {
  // target end date for countdown (example: 4 days from now)
  const target = new Date();
  target.setDate(target.getDate() + 3);
  target.setHours(target.getHours() + 7);
  target.setMinutes(target.getMinutes() + 55);

  return (
    <>
      <div className="app-bg" aria-hidden="true"></div>

      <div className="mt-6">
        <LeaderboardTable />
      </div>

      <Footer />
    </>
  );
}
