
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

// import required modules
import { Navigation } from "swiper"


// Import CSS
import "./GenreFilter.css"
import { useEffect, useState } from "react"

function GenreFilter({totalGenre, setCurrentGenre, setData}) {

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
        let newGenres = []
        setCurrentGenre(prev => {
            const genre = e.target.textContent
            if(prev.includes(genre)){
                newGenres = prev.filter(e => {
                    if(e !== genre) {
                        return e
                    }
                })
                return newGenres
            } else {
                newGenres = [...prev, e.target.textContent]
                return newGenres
            }
        })

        // Filter Genre
        setData(prev => {

            if(newGenres.length === 0){
                return prev.map(e => {
                    return {...e, genreShow: true}
                })
            }

            return prev.map(e => {
                let count = 0
                e.genre.forEach(genre => {
                    if(newGenres.includes(genre)){
                        count++
                    }
                })
                
                return count === 0 ? {...e, genreShow: false} : {...e, genreShow: true}
            })
        })
        

        e.target.classList.toggle("active-genre")
    }

    return (
    
    <Swiper navigation={true} modules={[Navigation]} slidesPerView={slidesPerView} className="mySwiper">

        {totalGenre.map((genre, i) => {
            return <SwiperSlide key={i}><div className="content-slide" onClick={activeGenre}>{genre}</div></SwiperSlide>
        })}
    </Swiper>
    )
}

export default GenreFilter