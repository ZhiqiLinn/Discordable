import { NavLink } from "react-router-dom";
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
                    <p style={{color:"white", fontWeight:'900', fontSize:'80px'}}>IMAGINE A PLACE...</p>
                    <p style={{color:"white"}}>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                        <div className="splash-buttons-div">
                            <button className="splash-buttons-left">      
                                <a href='https://discord.com/download'><i className="fa-solid fa-download" style={{cursor:"pointer"}}></i>  Discord Download for Windows</a>
                            </button>

                            <div className="splash-buttons-right">
                                <NavLink to='/servers' exact={true} activeClassName='active'>
                                    Open Discordable in Your Browser
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p style={{position:"absolute", bottom:"5px", color:"white"}}>© Copyright 2022 Discordable by Zhiqi Lin, Discord, and App Academy</p>
        </div>
    )
}
export default HomePage;