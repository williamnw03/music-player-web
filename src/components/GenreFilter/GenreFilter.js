
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

// import required modules
import { Navigation } from "swiper"


// Import CSS
import "./GenreFilter.css"
import { useEffect, useState } from "react"

function GenreFilter() {

    const [slidesPerView, setSlidesPerView] = useState(1)

    // Check Window Width Size
    const checkWindowWidth = () => {
        if(window.innerWidth >= 1280) {
            setSlidesPerView(5)
        } else if(window.innerWidth >= 1024) {
            setSlidesPerView(4)
        } else if(window.innerWidth >= 768) {
            setSlidesPerView(3)
        } else if(window.innerWidth >= 375) {
            setSlidesPerView(2)
        } else if(window.innerWidth <= 374) {
            setSlidesPerView(1)
        }
    }

    // Call event listener for Check Winsow Width Size
    window.addEventListener("resize", checkWindowWidth)

    useEffect(() => {
        checkWindowWidth()

        return () => window.removeEventListener("resize", checkWindowWidth)
    },[])

    // Choose Genres
    const activeGenre = (e) => {
        e.target.classList.toggle("active-genre")
    }

    return (
    
    <Swiper navigation={true} modules={[Navigation]} slidesPerView={slidesPerView} className="mySwiper">
        <SwiperSlide><div className="content-slide" onClick={activeGenre}>Slide 1</div></SwiperSlide>
        <SwiperSlide><div className="content-slide" onClick={activeGenre}>Slide 2</div></SwiperSlide>
        <SwiperSlide><div className="content-slide" onClick={activeGenre}>Slide 3</div></SwiperSlide>
        <SwiperSlide><div className="content-slide" onClick={activeGenre}>Slide 4</div></SwiperSlide>
        <SwiperSlide><div className="content-slide" onClick={activeGenre}>Slide 5</div></SwiperSlide>
        <SwiperSlide><div className="content-slide" onClick={activeGenre}>Slide 6</div></SwiperSlide>
        <SwiperSlide><div className="content-slide" onClick={activeGenre}>Slide 7</div></SwiperSlide>
    </Swiper>
    )
}

export default GenreFilter