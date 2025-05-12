import Header from "@/components/header";
import VideoCard from "@/components/videocard";
import { dummyCards } from "../../../constants";

export default function Home() {
  return (
    <main className="wrapper page">
      <Header title="All Videos" subHeader="Public Library" />
      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section>
    </main>
  );
}
