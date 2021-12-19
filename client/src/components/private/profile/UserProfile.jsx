import React, { useRef, useState, useEffect } from 'react';
import DefaultImage from '../../../resources/default-user-image.jpeg';
import { MdCheckCircleOutline } from 'react-icons/md';
import BottomContainer from './BottomContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../common/Navbar';


const UserProfile = ({ user }) => {

    let { username, dob, phone, email } = user;
    dob = dob.split('T')[0];
    const NavbarContents = [{ name: 'logout', link: '/logout' }];

    const [newUsername, setNewUsername] = useState(user.username);
    const [newPhone, setnewPhone] = useState(user.phone);
    const [image, setImage] = useState(null);
    const [userImg, setUserImg] = useState(null);
    const [initialImage, setInitialImage] = useState(null);
    const userImgInputRef = useRef();
    const [isUpdated, setIsUpdated] = useState(false);

    // Function to check if the button to change image has been clicked
    function imgButtonClicked(event) {
        event.preventDefault();
        userImgInputRef.current.click();
    }

    // Error Toast
    const ErrorToast = (errorMsg) => {
        toast.error(errorMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });
    }

    // Success Toast
    const SuccesToast = (succesMsg) => {
        toast.success(succesMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });
    }

    // To give an initial image to the user when the page loads
    useEffect(() => {
        if (!user.profilePic) {
            setUserImg(DefaultImage);
            setInitialImage(DefaultImage);
        }
        else {
            setUserImg(user.profilePic);
            setInitialImage(user.profilePic);
        }
    }, [user.profilePic]);

    // When we upload an image
    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImg(reader.result);
            }
            reader.readAsDataURL(image);
        }
        else {
            setUserImg(initialImage);
        }
    }, [image, initialImage]);

    // Function to reflect these changes in the database
    async function saveChanges() {
        const res = await fetch('./updateUserData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newUsername, newPhone, userImg, email })
        });

        const data = await res.json();

        // 201 means success
        if (!data || res.status !== 201) {
            ErrorToast(data.error)
        }
        else {
            SuccesToast(data.message);
        }
    }

    // Whenever we update any content(image, username, phone number)
    function contentUpdated(event) {
        if (event.target.name === "username") {
            setNewUsername(event.target.value);
        }
        else if (event.target.name === "phone") {
            setnewPhone(event.target.value);
        }
        else if (event.target.name === "profile-pic") {
            const file = event.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
                setImage(file);
            }
            else {
                setImage(image);
            }
        }
    }

    // to check whether all the mutable fields are same as the initial ones or not
    useEffect(() => {
        if (newUsername !== username || newPhone !== phone || initialImage !== userImg) {
            setIsUpdated(true);
        }
        else {
            setIsUpdated(false);
        }
    }, [newUsername, newPhone, username, phone, initialImage, userImg]);


    return (
        <>
            <div className="container">
                <Navbar contents={NavbarContents} />
                <div className="main-content">
                    <ToastContainer style={{ fontSize: "2rem" }} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} limit={2} theme={"dark"} pauseOnFocusLoss={false} draggable pauseOnHover={false} />
                    <div className="top-div">
                        <div className="basic-info">
                            {isUpdated && <MdCheckCircleOutline onClick={() => saveChanges()} id="save-icon" />}
                            <div className="col-left">
                                <div className="user-img-container">
                                    <img src={userImg} alt="User-Pic" />
                                    <button onClick={(event) => imgButtonClicked(event)}>Change Image</button>
                                    <input type="file" ref={userImgInputRef} name="profile-pic" onChange={(event) => contentUpdated(event)} accept="image/jpeg" />       {/* gif is taking too much space */}
                                </div>
                            </div>
                            <div className="col-right">
                                <input type="text" name="username" autoComplete="off" placeholder="Username" maxLength="10" value={newUsername} onChange={(event) => contentUpdated(event)} />
                                <input type="tel" name="phone" minLength="10" autoComplete="off" placeholder="Phone" maxLength="10" value={newPhone} onChange={(event) => contentUpdated(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="middle-div">
                        <h2>{dob}</h2>
                        <h2>{email}</h2>
                    </div>
                    <div className="bottom-div">
                        <h2>Statistics</h2>
                        <BottomContainer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;