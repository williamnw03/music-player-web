import { ArrowLeft, ArrowRight } from "react-bootstrap-icons"
import { useSwiper } from "swiper/react"


function Arrow() {

    const swiper = useSwiper()

    return (
        <>
            <div className="button-prev-sub" onClick={() => swiper.slidePrev()}><ArrowLeft/></div>
            <div className="button-next-sub" onClick={() => swiper.slideNext()}><ArrowRight/></div>
        </>
    )
}

export default Arrow