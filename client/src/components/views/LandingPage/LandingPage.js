import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage';

// ''를 쓸때는
// const userInfo = 'User info: ' + name + ' ' + surname + ' ' + telephone;
// ``를 쓸때는
// const userInfo = `User info: ${name} ${surname} ${telephone}`;
// 이렇게 ``를 쓰면 굳이 + + 를 사용하지 않고서도 구현이 가능해짐. 

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([response.results])
            setMainMovieImage(response.results[0])
        })

    }, [])

    return (
        <div style={{width: '100%', margin: '0'}}>
            {/* Main Image */}
            {MainMovieImage &&  // MainMovieImage가 있으면(API로 받아왔으면) 렌더링
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
                />
            }
            
            <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/*Movie Grid Cards */}
            
            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
