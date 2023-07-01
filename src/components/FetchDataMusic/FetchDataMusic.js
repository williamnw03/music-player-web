function FetchDataMusic(url, setData, setTotalGenre) {
    // Fetch Music
    const fetchMusic = async () => {

        try{
            const resp = await fetch(url)
            const data = await resp.json()
    
            setData(data.map(e => {
                return {...e, active: false, genreShow: true, searchShow: true}
            }))
    
            const genres = []
            data.forEach(e => {
                e.genre.forEach(e2 => {
                    if(!genres.includes(e2)){
                        genres.push(e2)
                    }
                })
            });
    
            setTotalGenre(genres)
        } catch(err) {
            console.log(err)
        }
    }

    fetchMusic()
}

export default FetchDataMusic