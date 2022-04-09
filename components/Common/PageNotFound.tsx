import styled from 'styled-components';
import err from '../../lib/images/403error.png';
import {NextPage} from "next";
import Image from 'next/image';
import history from "next/router";

const PageNotFound: NextPage = () => {

    const WrapDiv = styled.div`
      display: block;
      justify-content: center;
      text-align: center;
    `;

    const ErrorContainer = styled.div`
      margin-top: 90px;
    `;

    return (
        <ErrorContainer>
            <WrapDiv>
                <Image src={err}/>
            </WrapDiv>
            <WrapDiv>
                <button
                    className="MainBtn"
                    style={{margin: '30px'}}
                    onClick={() => {
                        history.push('/');
                    }}
                >메인으로 이동
                </button>
            </WrapDiv>
        </ErrorContainer>
    );
}

export default PageNotFound;
