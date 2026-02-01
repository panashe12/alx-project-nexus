import Button from "@/components/commons/Button";
import { useRouter } from "next/router";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

const Home: React.FC = () => {
  const router = useRouter();

  // Array of your GIFs
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
          Movies You Will Love, Made <span className="text-[#da7227]">Easy</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Dive into the latest blockbusters, award-winning films, and your personal favorites All in one place
        </p>
        <Button
          title="Browse Movies"
          action={() => router.push("/movies", undefined, { shallow: false })}
        />
      </section>

      {/* Middle Section: Center-Focused Slideshow */}
      <section className="py-16 px-8 md:px-44 bg-black text-white">
        <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-center">
          Explore Genres
        </h2>

        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
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










