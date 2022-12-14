import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { addServerThunk } from '../../store/server';

function CreateServerForm({hideForm}) {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user)
    const categorySelections = ['Gaming', 'Music', 'Education', 'Science & Tech', 'Entertainment' ]

    const [name, setName] = useState("")
    const [server_pic, setServer_pic] = useState("")
    const [default_role, setDefault_role] = useState("")
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [category, setCategory] = useState(categorySelections[0])
    const [explore_pic, setExplore_pic] = useState("")
    const [description, setDescription]= useState("")
    
    useEffect(() => {
        let errors = []
        let nameArr = name.split(' ').join('')
        let newRole = default_role.split(' ').join('')
        let newDescription = description.split('').join('')
        if (nameArr.length < 3 || nameArr.length > 50) errors.push("Name should be 3 and 50 characters long, not include white space. Name shouldn't include only white spaces")
        if (!/https?:\/\/.*\.(?:png|jpg|jpeg)/.test(server_pic)) errors.push('Image URL invalid, should be ending with JPG/PNG/JPEG. ie. "https://www.exampleImage.jpg"'
        );
        if (!/https?:\/\/.*\.(?:png|jpg|jpeg)/.test(explore_pic)) errors.push('Image URL invalid, should be ending with JPG/PNG/JPEG. ie. "https://www.exampleImage.jpg"'
        );
        if (newDescription.length <= 0 || newDescription.length > 200) errors.push("Description should be less than 200 characters, not include white space. Role shouldn't include only white spaces")
        if (newRole.length <= 0 || newRole.length > 15) errors.push("Role should be less than 15 characters, not include white space. Role shouldn't include only white spaces")
        setErrors(errors);
        // console.log(default_role)
    }, [name, server_pic, default_role, description, explore_pic]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const serverPayload = {
            user_id: sessionUser.id,
            name,
            server_pic,
            default_role,
            explore_pic,
            category,
            description
        }
        let newServer;
        if (!errors.length) {
            newServer = await dispatch(addServerThunk(serverPayload))
            reset();
            setHasSubmitted(false)
            hideForm();
            history.push(`/servers`)
        }
    }
    const reset = () => {
        setName('');
        setServer_pic('');
    }
    const handleCancel = () =>{
        hideForm();
    }

    return(
        <div className='create-server-container'>
            <h1>Customize Your Server</h1>
            <p style={{color:'grey'}}>Give your new server a personality with a name and image. You can always change it later.</p>
            <form onSubmit={handleCreate}>
                    {hasSubmitted && errors &&
                    <div id='error-msg'>
                    {errors.map((error, ind) => (
                        <div key={ind} style={{color:"rgb(230, 65, 65)"}}> ??? {error}</div>
                    ))}
                    </div>
                    }
                <div>
                    <div>Server Name</div>
                    <input
                        placeholder='Server Name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <div>Set a Role for Your Members</div>
                    <input
                        placeholder='Role'
                        type='text'
                        value={default_role}
                        onChange={(e) => setDefault_role(e.target.value)}
                    />
                </div>
                <div>
                    <div>Upload Picture for Your Server</div>
                    <input
                        placeholder='Server Logo URL'
                        type='text'
                        value={server_pic}
                        onChange={(e) => setServer_pic(e.target.value)}
                    />
                </div>
                <div>
                    <div>Upload Background Picture for Your Server</div>
                    <input
                        placeholder='Explore Page Background URL'
                        type='text'
                        value={explore_pic}
                        onChange={(e) => setExplore_pic(e.target.value)}
                    />
                </div>
                <div>
                    <div>Add a Description in Explore Page</div>
                    <input
                        placeholder='Description'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <div>Select a Category for Your Server</div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categorySelections.map(cate =>
                            <option value={cate} key={cate}>{cate}</option>
                        )}
                    </select>
                </div>
                <div>
                    <button className='btn' type="submit">Create</button>
                    <br></br>
                    <button className='btn' type='button' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateServerForm