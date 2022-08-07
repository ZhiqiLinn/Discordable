import { useEffect } from "react";
import './HomePage.css'
import cloud from './cloud.svg'
const HomePage = () => {

    return(
        <div>
            <div className="splash-cloud" style={{
                backgroundImage:`url(${cloud})`,
                backgroundSize:'cover',
                }}>
                    {/* <img src={cloud}></img> */}
            <div className="splash-intro">
                <div>
                    <p style={{color:"white", fontWeight:'900', fontSize:'xxx-large'}}>IMAGINE A PLACE...</p>
                    <p style={{color:"white", fontSize:'small'}}>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                        <div className="splash-buttons-div">
                            <button className="splash-buttons-left">
                                <i class="fa-solid fa-download"></i> DownLoad Discord for Windows
                            </button>

                            <button className="splash-buttons-right">
                                Open Discordable as DEMO USER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;