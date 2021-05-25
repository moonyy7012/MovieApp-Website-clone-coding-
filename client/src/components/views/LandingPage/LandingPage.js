import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';

// ''를 쓸때는
// const userInfo = 'User info: ' + name + ' ' + surname + ' ' + telephone;
// ``를 쓸때는
// const userInfo = `User info: ${name} ${surname} ${telephone}`;
// 이렇게 ``를 쓰면 굳이 + + 를 사용하지 않고서도 구현이 가능해짐. 

function LandingPage() {
    // const [<상태 값 저장 변수>, <상태 값 갱신 함수>] = useState(<상태 초기 값>);
    //  useState은 react에서 가져옴. 초기화후 response로 가져온 것들을
    //  setMovies()를 통해 Movies state에 넣음
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    // Movies state 변수를 선언한 뒤 리액트에게 effect를 사용함을 말함. useEffect Hook에 함수를 전달하고 있는데 이 함수가 바로 effect.
    // 컴포넌트를 렌더링할 때 리액트는 우리가 이용한 effect를 기억하였다가 DOM을 업데이트한 이후에 실행함.
    useEffect(()=>{
        // API_URL은 설정한 상수. 현재 인기있는 영화 불러옴
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        
        fetchMovies(endpoint)

    }, [])

    const fetchMovies = (endpoint)=>{
        // fetch 는 가져오는 것, response는 그 결과값
        fetch(endpoint)
        //fetch로는 데이터를 바로 사용할 수 없다. fetch를 사용할 땐 먼저 올바른 url로 요청을 보내야 하고, 바로 뒤에오는 응답에 대해 json()을 해줘야 한다.
        //  json()은 Response 스트림을 가져와 스트림이 완료될때까지 읽는다. 그리고 다 읽은 body의 텍스트를 Promise형태로 반환한다.
        .then(response => response.json()) //응답을 JSON 형태로 파싱합니다
        .then(response => {
            console.log(response)
            //  Object 1Depth 이하의 요소들을 모두 가져오고 싶은 경우에 전개 연산자(...) 활용이 용이, loadMore버튼 누를때마다 원래 Movies에 들어있는 것에 계속 누적되도록
            setMovies([...Movies, ...response.results])
            // 메인이미지는 인기있는 영화 가져온 response중 첫번째. 가장 인기 있는 영화의 이미지이므로
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page)
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;
        fetchMovies(endpoint)

    }

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
                {/* hr: 수평선 */}
                <hr />  
                {/*Movie Grid Cards */}
                {/* gutter : 사이 간격 */}
                <Row gutter={[16,16]}>
                    {/* movie는 Movies배열의 영화 데이터 하나. map은 그 movie하나하나에 대해 아래 함수를 실행하여 배열 변환  */}
                    {Movies && Movies.map((movie, index)=>(
                        // Fragments는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화할 수 있습니다.key는 Fragment에 전달할 수 있는 유일한 어트리뷰트.
                        <React.Fragment key={index}>
                            {/* gridcards컴포넌트(GridCards.js) */}
                            <GridCards
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}`:null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}

                </Row>

            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage



