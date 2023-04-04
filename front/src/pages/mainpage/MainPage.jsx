import React, { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userGameCount } from '../../../recoil/user/atoms';
import gsap from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import doorSound from '../../assets/doorSound.wav';
import bellSound from '../../assets/bellSound.wav';
export default function Mainpage() {
  const location = useLocation();
  console.log(location)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const steamId = searchParams.get('steam_id');
    console.log(steamId);
  }, [location]);
  const audioRef = useRef(null);
  const [gameCount, setGameCount] = useRecoilState(userGameCount);
  // useEffect(() => {
  //   axios
  //     .get('http://127.0.0.1:8000/login')
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();

  const navigateToGame = () => {
    if (isLogin) {
      navigate('/game');
    }
  };

  function doorOpen() {
    audioRef.current.play();
    gsap
      .timeline()
      .to(leftDoorRef.current, { duration: 1, x: -250 })
      .to(rightDoorRef.current, { duration: 1, x: 250 }, '-=1');
    setLogin(true);
    axios
      .get('http://127.0.0.1:8000/login')
      .then(function (response) {
        console.log(response);
        setLogin(true);

        axios
          .get(`http://127.0.0.1:8000/games/count/${response}`)
          .then(function (res) {
            console.log(res);
            if (res >= 5) {
              setGameCount(true);
            } else {
              setGameCount(false);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="mainPageImg">
      <div className="kanban"></div>
      <div className="door" onClick={navigateToGame}>
        <div className="leftDoor" ref={leftDoorRef}>
          <div className="insideDoor"></div>
        </div>
        <div className="rightDoor" ref={rightDoorRef}>
          <div className="insideDoor"></div>
        </div>
        <audio ref={audioRef}>
          <source src={bellSound} type="audio/wav" />
        </audio>
      </div>
      {isLogin ? (
        <div>로그인 됨</div>
      ) : (
        <a href="https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=checkid_setup&openid.return_to=https%3A%2F%2Fj8c204.p.ssafy.io%2Fapi%2Flogin%2Fprocesslogin&openid.realm=https%3A%2F%2Fj8c204.p.ssafy.io%2Fapi%2Flogin%2Fprocesslogin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select">
          <div className="steamLoginBtn" onClick={doorOpen}>
            <div className="steamTxt">continue with steam login</div>
            <div className="steamImg"></div>
          </div>
        </a>
      )}
    </div>
  );
}
