import Button from "@/components/commons/Button";
import { useRouter } from "next/router";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

// Swiper styles
import "swiper/css";

const Home: React.FC = () => {
  const router = useRouter();

  const gifs = [
    { src: "/Action.webp", name: "Action" },
    { src: "/Comedy.webp", name: "Comedy" },
    { src: "/Crime.webp", name: "Crime" },
    { src: "/Romance.webp", name: "Romance" },
  ];

  return (
    <div className="text-white">
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-4 md:px-16"
        style={{ backgroundImage: 'url("/mainpic.jpg")' }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          Movies You Will Love, Made{" "}
          <span className="text-[#da7227]">Easy</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Dive into the latest blockbusters, award-winning films, and your personal favorites — All in one place
        </p>
        <Button
          title="Browse Movies"
          action={() => router.push("/movies")}
        />
      </section>

      {/* Continuous Horizontal Auto-Swiping Carousel */}
      <section className="py-16 px-8 md:px-44 bg-black text-white">
        <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-center">
          Explore Genres
        </h2>

        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          freeMode={true} // smooth continuous scrolling
          grabCursor={true}
          speed={3000} // controls how fast the slides scroll
          autoplay={{
            delay: 0, // continuous movement
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
          }}
        >
          {gifs.map((gif) => (
            <SwiperSlide key={gif.name} className="flex flex-col items-center">
              <img
                src={gif.src}
                alt={gif.name}
                className="w-full md:w-72 rounded-lg shadow-lg"
              />
              <span className="mt-4 text-xl font-semibold">{gif.name}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Join bingeGuru Section */}
      <section className="py-16 px-8 md:px-44 bg-[#121018] text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-8">
          Your Movie Journey Starts Here
        </h2>
        <p className="text-lg md:text-2xl mb-12">
          Join now to unlock exclusive content, the latest releases, and handpicked movie recommendations.
        </p>
        <Button title="Get Started" />
      </section>
    </div>
  );
};

export default Home;
















