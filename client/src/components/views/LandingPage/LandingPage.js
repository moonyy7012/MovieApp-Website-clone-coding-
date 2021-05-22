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

    // useState은 react에서 가져옴. 초기화후 response로 가져온 것들을
    //  setMovies()를 통해 Movies state에 넣음
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(()=>{
        // API_URL은 설정한 상수, 현재 인기있는 영화 불러옴
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        
        // fetch 는 가져오는 것, response는 그 결과값
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([response.results])
            // 메인이미지는 인기있는 영화 가져온 response중 첫번째. 가장 인기 있는 영화의 이미지이므로
            setMainMovieImage(response.results[0])
        })

    }, [])

    return (
        <div style={{width: '100%', margin: '0'}}>
            {/* Main Image */}
            {/* 메인이미지도 앞의 URL로 설정한 상수 삽입 */}
            {MainMovieImage &&  // MainMovieImage가 있으면(API로 받아왔으면) 렌더링
            // MainImage.js(컴포넌트)로 아래 props(image, title, text)가 전달되어 표시
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
