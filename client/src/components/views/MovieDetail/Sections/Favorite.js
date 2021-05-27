import React from 'react'
import Axios from 'axios'

function Favorite(props) {
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    
    useEffect(() => {
        let variables = {
            userFrom,
            movieId
        }
        //서버로 보낼 임의의 endpoint 지정
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response=>{
            if(response.data.success){

            }else{
                alert('숫자 정보를 가져오는 데 실패했습니다.')
            }
        })
    }, [])

    return (
        <div>
                <button>Favorite</button>
            
        </div>
    )
}

export default Favorite
