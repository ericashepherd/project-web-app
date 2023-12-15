import { useSelector } from "react-redux";
import * as favClient from "./favorites/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const [favorites, setFavorites] = useState(null);

  const fetchFavorites = async () => {
    try {
      const favorites = await favClient.findVideosThatUserFavorited(currentUser._id);
      setFavorites(favorites);
    }
    catch (err){
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <br/>
      <h2 className="wd-center-align wd-gray">Welcome{currentUser && <>, {currentUser.firstName}!</>}</h2>
      <hr/>
      <p>
        The Shaolin Tai Chi Praying Mantis Institute offers training in the Tai Chi Praying Mantis style of Martial Arts. Training includes basic drills, hand forms, weapon forms, sparring, and application sets. The Tai Chi Praying Mantis style is a traditional Chinese Kung Fu created in the early 17th century by Wang Lang, a superior swordsman from the Shantung Province. The system combines the soft and hard fighting philosophies of Tai Chi with the Northern Shaolin system.
        <br/><br/>
        Tai Chi is a Chinese, internal martial art that not only provides a method of self defense but also helps the practitioner to obtain mental and physical fitness. It helps to improve coordination and balance, it increases flexibility, and it contributes to muscle relaxation and cardiovascular fitness.
        <br/><br/>
        Praying Mantis Kung Fu imitates the controlling actions of the praying mantis and the elusive footwork of the monkey. It applies the circular movements of Tai Chi to deflect an incoming attack and turn the force of the opponent against them. This style executes simultaneous close and long-range techniques including punches, low and high kicks, hooking and trapping hand combinations, elbow and backhand, and ground fighting techniques.
      </p>
      <hr/>
      {!currentUser && <br/>}
      {currentUser && 
      <div>
        <h2>Favorited Videos:</h2>
        <div className="list-group">
          {favorites && favorites.map((favorite) => (
            <Link
              key={favorite._id}
              to={`/details/${favorite.videoId}`}
              className="list-group-item list-group-item-dark"
            >
              <div className="wd-white">{favorite.videoTitle}</div>
            </Link>
          ))}
        </div>
        <hr/><br/>
      </div>
      }

    </div>
  );
}

export default Home;
