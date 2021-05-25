import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';
function MovieDetail(props) {
    // App.js에서 "/movie/:movieId" 로 넘겨진 movieId를 아래와 같은 식으로 가져올 수 있음 .
    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])

    useEffect(() => {    
        // 영화 크레딧 정보
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        //영화상세정보
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
        console.log(props.match)

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)
        })
    }, [])

    return (
        <div>
            {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            
            />

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                {/* Movie Info */}
            <MovieInfo
                movie={Movie}
            />
                <br/>
                {/* Actors Grid */}

                <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button>Toggle Actor View</button>
                </div>


            </div>

        </div>
    )
}

export default MovieDetail
