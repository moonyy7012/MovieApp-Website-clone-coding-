import React from 'react'
import {Col} from 'antd';

// 반응형으로. 한 행의 size : 24. 창가장클때column4개->가장작을때1개 lg에서column크기6->xs에서column크기24
function GridCards(props) {
    if(props.landingPage){
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{position: 'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        {/* <img>의 alt속성은 해당 이미지를 못 읽어올 때 대체하여 나타나는 것*/}
                        <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.movieName}/>
                    </a>
                </div>
            </Col>
        )
    }
    else{
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{position: 'relative'}}>
                        {/* <img>의 alt속성은 해당 이미지를 못 읽어올 때 대체하여 나타나는 것*/}
                        <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.characterName}/>
                </div>
            </Col>
        )        
    }

}

export default GridCards
