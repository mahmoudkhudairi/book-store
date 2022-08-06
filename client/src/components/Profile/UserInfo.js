import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useBooksContext } from '../../context';
import Avatar from 'react-avatar';
const UserInfo = (props) => {
  const { updateProfile } = useBooksContext();
  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [shouldEdit, setShouldEdit] = useState(false);
  const [shouldSpin, setShouldSpin] = useState(false);
  const handleClick = () => {
    setShouldEdit(!shouldEdit);
  };
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageData = reader.result;
        setUserInfo({ ...userInfo, profilePicture: imageData });
      };
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };
  const handleUpdate = () => {
    setShouldSpin(true);
    const newInfo = {
      profilePicture: userInfo.profilePicture,
      name: userInfo.name,
      about: userInfo.about,
    };
    updateProfile(props.username, newInfo).then(() => {
      setShouldSpin(false);
      setShouldEdit(!shouldEdit);
    });
  };
  return (
    <div className="max-w-[80%] my-16 mx-auto rounded-lg shadow-xl bg-catalina-blue-500 dark:bg-slate-800 p-8 text-center text-white relative">
      <div className="absolute hover:cursor-pointer  top-5 right-5  text-gray-300 ">
        <FontAwesomeIcon className={`h-4 w-4 `} icon={faPen} onClick={handleClick} />
      </div>
      {shouldEdit ? (
        <>
          <div className=" top-1/2 left-1/2 mt-[-85px] mb-4">
            <Avatar name={userInfo.name} src={userInfo.profilePicture} size={120} round />
            <label
              onChange={handleChange}
              htmlFor="imagePicker"
              className="absolute inline-flex items-center justify-center h-[120px] w-[120px] ml-[-120px] bg-black bg-opacity-40 text-center p-1 rounded-full"
            >
              <input type="file" name="image" accept="image/*" hidden id="imagePicker" />
              <FontAwesomeIcon
                className={`h-4 w-4 text-white hover:cursor-pointer`}
                icon={faCamera}
              />
            </label>
          </div>
          <div className="text-black font-bold flex flex-col gap-5 w-1/2 mx-auto">
            <input
              className="bg-gray-200 pl-2 rounded"
              type="text"
              value={userInfo.name}
              name="name"
              onChange={handleChange}
            />
            <label className="text-white">About: </label>
            <textarea
              className="pl-2 bg-gray-200 rounded"
              value={userInfo.about}
              name="about"
              onChange={handleChange}
            />
          </div>
          <button
            className="ml-4 mt-3 rounded-lg px-2 py-1 bg-catalina-blue-500  text-white hover:bg-catalina-blue-600 duration-300 inline-flex justify-center items-center"
            onClick={handleUpdate}
            disabled={shouldSpin}
          >
            {shouldSpin && (
              <svg
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Update
          </button>
        </>
      ) : (
        <>
          <div className=" top-1/2 left-1/2 mt-[-85px] mb-4">
            <Avatar name={userInfo.name} src={userInfo.profilePicture} size={120} round />
          </div>
          <h2 className="font-bold">{userInfo.name}</h2>
          <p>About: {userInfo.about}</p>
        </>
      )}
    </div>
  );
};

export default UserInfo;
