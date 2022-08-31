import { NavLink } from "react-router-dom";

import UserProfileBar from "../UserProfile/UserProfileBar";


const ExploreFilterBar = () => {
    const categorySelections = ['Gaming', 'Music', 'Education', 'Science & Tech', 'Entertainment' ]

   
    return (
        <>
                <div className="explore-filterbar-container">
                    <div>
                        {categorySelections.map(category => {
                            <p>{category}</p>
                        })
                        }   
                    </div>
                    <div className="channel-user-logout-container">
                        <UserProfileBar />
                    </div>
                </div>
        </>
    )
}

export default ExploreFilterBar