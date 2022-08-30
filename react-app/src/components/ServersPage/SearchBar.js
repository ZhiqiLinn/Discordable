import { useState, useEffect } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

const SearchBar = ({ allServers }) => {
    const [query, setQuery] = useState("")
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    const serversArr = Object.values(allServers)
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu]);

    const handleSearch = () => {
        history.push(`/search/${query}`)
    }

    return (
        <>
            <div id="search">
                <p className="explore-server-quote">Find your community on Discordable </p>
                <p className="explore-server-quote2">From gaming, to music, to learning, there's a place for you.</p>
                <input 
                        type="text" 
                        id="search-bar" 
                        placeholder="Explore Communities"
                        value={query}
                        onChange={event => {
                            openMenu()
                            setQuery(event.target.value)
                        }}
                        />
                    <img class="search-icon" onClick={handleSearch} src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png">
                    </img>

                {showMenu &&
                    <div className="search-bar-drop-down-menu">
                        <p>Click to join...</p>
                        {query && serversArr.filter(server => {
                            if (query === "" && server.user_id !== sessionUser.id) {
                                //if query is empty
                                return server;
                            } else if ((server.name.toLowerCase().includes(query.toLowerCase())) 
                                        && server.user_id !== sessionUser.id) {
                                            //returns filtered array
                                            return server;
                            }
                            }).map((server, index) => (
                                <NavLink to={`/servers/${server.id}/join`} onClick={() => setQuery("")} style={{ textDecoration: 'none', color: 'black' }}>
                                    <div key={index} className="drop-down-unit">
                                        <p>{server.name}</p>
                                    </div>
                                </NavLink>
                                )
                                )
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default SearchBar
