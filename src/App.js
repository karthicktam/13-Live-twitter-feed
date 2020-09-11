import React, { useEffect, useState } from "react";
import moment from "moment";
import "./styles.css";

const dummyTweets = [
  {
    userImage:
      "https://pbs.twimg.com/profile_images/878140072469471233/QQUbWn7G_400x400.jpg",
    userName: "Karthick Rajan",
    userScreen: "@karthicktamil17",
    created: Date.now(),
    text: "Oooopsie!"
  },
  {
    userImage:
      "https://pbs.twimg.com/profile_images/878140072469471233/QQUbWn7G_400x400.jpg",
    userName: "Karthick Rajan",
    userScreen: "@karthicktamil17",
    created: Date.now() - 50000,
    text: "Twitter API limit reached. 😭"
  },
  {
    userImage:
      "https://pbs.twimg.com/profile_images/878140072469471233/QQUbWn7G_400x400.jpg",
    userName: "Karthick Rajan",
    userScreen: "@karthicktamil17",
    created: Date.now() - 150000,
    text: "Now all you can see are these dummy tweets... 😞"
  },
  {
    userImage:
      "https://pbs.twimg.com/profile_images/878140072469471233/QQUbWn7G_400x400.jpg",
    userName: "Karthick Rajan",
    userScreen: "@karthicktamil17",
    created: Date.now() - 300000,
    text: "But, you can come back later to see the real deal!"
  }
];

function App() {
  const [tweets, setTweets] = useState([]);

  const createTweet = (tweet) => {
    if (!tweets.find((tw) => tw.text === tweet.text)) {
      const tweetEl = (
        <>
          <div className="tw-left">
            <img src={tweet.userImage} alt={tweet.userName} />
          </div>
          <div className="tw-right">
            <h4 className="name">
              {tweet.userName}
              <span className="handle">{tweet.userScreen}</span>
              <span className="time">
                {moment(new Date(tweet.created)).fromNow()}
              </span>
            </h4>
            <p className="text">{tweet.text.replace(/\n/g, "<br />")}</p>
          </div>
        </>
      );

      setTweets((state) => [...state, tweetEl]);
    }
  };

  const getTweets = (interval) => {
    fetch("https://twitter-100-days-100-projects.glitch.me/feed")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          clearInterval(interval);
          setTweets([]);
          dummyTweets.sort(() => -1).forEach((tweet) => createTweet(tweet));
        } else {
          setTweets([]);
          res.sort(() => -1).forEach((tweet) => createTweet(tweet));
        }
      });
  };

  useEffect(() => {
    let interval = setInterval(() => getTweets(interval), 10000);
    return () => clearInterval(interval);
  });

  return (
    <div className="app">
      <h2>
        <a href="https://www.florin-pop.com/blog/2019/09/100-days-100-projects">
          #100Projects100Projects
        </a>
        Live Twitter Feed
        <small>
          ~ tweet something with the hashtag to see it show up here ~
        </small>
      </h2>
      <ul className="tweets-container">
        {tweets.length === 0 ? (
          <h3>Loading data...</h3>
        ) : (
          tweets.map((tweet, idx) => (
            <li className="tweet" key={idx}>
              {tweet}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
