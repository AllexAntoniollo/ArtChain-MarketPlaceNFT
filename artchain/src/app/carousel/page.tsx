import Carousel from "@/components/carousel";
const DATA = [
  { image: "https://picsum.photos/seed/random101/500/500" },
  { image: "https://picsum.photos/seed/random102/500/500" },
  { image: "https://picsum.photos/seed/random103/500/500" },
];
export default function Home() {
  return (
    <main className="">
      <Carousel data={DATA} />
    </main>
  );
}
