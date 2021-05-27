import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import {Row} from 'antd';

function MovieDetail(props) {
    // App.js에서 "/movie/:movieId" 로 넘겨진 movieId를 아래와 같은 식으로 가져올 수 있음 .
    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

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

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            console.log('responseforCrew',response)
            setCasts(response.cast)
        })

    }, [])

    const toggleActorView = () =>{
        setActorToggle(!ActorToggle)
    }
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
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {/* 로그인정보는 로컬스토리지에 저장되어있음. localStorage.getItem('key')는 'key'값에 해당하는 value값을 가져옴(곧 ID값) */}
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>

                {/* Movie Info */}
            <MovieInfo
                movie={Movie}
            />
                <br/>
                {/* Actors Grid */}

                <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

{/* ActorToggle이 true일 때 아래 실행*/}
                {ActorToggle &&
                    <Row gutter={[16,16]}>
                    {/* movie는 Movies배열의 영화 데이터 하나. map은 그 movie하나하나에 대해 아래 함수를 실행하여 배열 변환  */}
                    {Casts && Casts.map((cast, index)=>(
                        // Fragments는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화할 수 있습니다.key는 Fragment에 전달할 수 있는 유일한 어트리뷰트.
                        <React.Fragment key={index}>
                            {/* gridcards컴포넌트(GridCards.js) */}
                            <GridCards
                                image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}`:null}
                                characterName={cast.name}
                            />
                        </React.Fragment>
                    ))}

                    </Row>
            
                }


            </div>

        </div>
    )
}

export default MovieDetail
