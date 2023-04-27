import { useState } from 'react';
import axios from 'axios';
import './App.css';

const GithubUserFinder = () => {
    const [inputText, setInputText] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState();
    const [flag, setFlag] = useState(false);

    async function handleSearch() {
        setFlag(true);
        axios.get(`https://api.github.com/users/${inputText}`)
        .then((response) => {setUserInfo(response.data); setError(null);})
        .catch((err) => {
            setUserInfo(null);
            setError("User Not Found");
        })
    }
    return (
        <>
        <div className='search-container'>
            <input type='text' className='search-input' placeholder='Search user...' onChange={(e) => {setInputText(e.target.value)}} value={inputText} />
            <button className='search-btn' onClick={handleSearch}>Search</button>
        </div>

        {error && <p className='white error'>{error}</p>}
        {
            (inputText && flag && userInfo) && (
            <div className='white githubUserInfo'>
                <div className='top'>
                <img src={userInfo.avatar_url} alt='Developer Photo' />
                <h3>{userInfo.name}</h3>
                <a href={userInfo.html_url} target='_blank'><h5>{userInfo.login}</h5></a>
                <p id='bio'>{userInfo.bio}</p>
                </div>
                <div className='bottom'>
                <div className='left'>
                    <p>{"Repositories : " + userInfo.public_repos}</p>
                    <p>{"Followers : " + userInfo.followers}</p>
                    <p>{"Following : " + userInfo.following}</p>
                </div>
                <div className='right'>
                    <p>{"Location : " + ((userInfo.location) ? userInfo.location : "No Location")}</p>
                    <p>{"Company : " + ((userInfo.company) ? userInfo.company : "No Company")}</p>
                    <p>{"Twitter : @" + ((userInfo.twitter_username) ? userInfo.twitter_username : "No Twitter")}</p>
                </div>
                </div>
            </div>
            )
        }
    </>
    )
}

export default GithubUserFinder;
