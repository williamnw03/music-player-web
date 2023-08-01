import { Swiper, SwiperSlide } from "swiper/react";
import ScaleLoader from "react-spinners/ScaleLoader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

// Import CSS
import "./GenreFilter.css";
import { useEffect, useState } from "react";

function GenreFilter({
  totalGenre,
  activeGenre,
  loadingData,
  loadingPlaylists,
}) {
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Check Window Width Size
  const checkWindowWidth = () => {
    if (window.innerWidth >= 1280) {
      setSlidesPerView(5);
    } else if (window.innerWidth >= 1024) {
      setSlidesPerView(4);
    } else if (window.innerWidth >= 768) {
      setSlidesPerView(3);
    } else if (window.innerWidth >= 375) {
      setSlidesPerView(2);
    } else if (window.innerWidth <= 374) {
      setSlidesPerView(1);
    }
  };

  // Call event listener for Check Winsow Width Size
  window.addEventListener("resize", checkWindowWidth);

  useEffect(() => {
    checkWindowWidth();

    return () => window.removeEventListener("resize", checkWindowWidth);
  }, []);

  return (
    <>
      <ScaleLoader
        color="#b9d2d2"
        loading={loadingData && loadingPlaylists}
        width={10}
        height={35}
        cssOverride={{
          display: "block",
          width: "max-content",
          margin: "0 auto",
          marginTop: "2em",
        }}
      />
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        className="mySwiper"
      >
        {totalGenre.map((genre, i) => {
          return (
            <SwiperSlide key={i}>
              <div
                className="content-slide"
                onClick={activeGenre}
                data-genre={genre}
              >
                {genre}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default GenreFilter;
