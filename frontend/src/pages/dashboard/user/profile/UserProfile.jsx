import { useEffect, useState } from "react";
import avatarImg from "../../../../assets/avatar.png";
import { useDispatch, useSelector } from 'react-redux';
import { useEditProfileMutation } from "../../../../redux/features/auth/authApi";
import { setUser } from "../../../../redux/features/auth/authSlice";

function UserProfile() {

  const dispactch = useDispatch()
  const {user} = useSelector((state)=> state.auth) 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    profileImage: "",
    bio: "",
    profession: "",
    userId: "",
  });

  useEffect(() => {
      if(user){
        setFormData({
          username: user?.username || "",
          profileImage: user?.profileImage || avatarImg,
          bio: user?.bio || "",
          profession: user?.profession || "",
          userId: user?._id || ""
        })
      }
  }, [user]) 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [editProfile , {isLoading, isError, error}] = useEditProfileMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedUser = {
      username: formData.username,
      profileImage: formData.profileImage,
      bio: formData.bio,
      profession: formData.profession,
      userId: formData.userId
    };

    try {
        const response = await editProfile({id: user._id, profileData: updatedUser}).unwrap()
        dispactch(setUser(response.data))
        // console.log(response.data)
        alert("Profile updated successfully.");
    } catch (error) {
        alert("Failed to update profile. Please try again.");
    }
  };


  return (
    <div className="container !mx-auto !p-6">
      <div>
        <div className="flex items-center mb-4">
          <img
            src={formData.profileImage}
            alt=""
            className="!w-32 !h-32 !object-cover !rounded-full ring"
          />

          <div className="ml-6 space-y-1">
            <h2 className="text-2xl font-bold">Username: {formData.username || "N/A"}</h2>
            <p className="text-gray-700">User Bio: {formData?.bio || "N/A"}</p>
            <p className="text-gray-700">Profession: {formData.profession || "N/A"}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto text-blue-500 hover:text-blue-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 3H4a1 1 0 00-1 1v14a1 1 0 001 1h7m2 0h7a1 1 0 001-1V4a1 1 0 00-1-1h-7m-2 0v14"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

            {/* forms */}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  className="mt-1 p-2 w-full block shadow-sm border border-gray-300 rounded-md "
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium"
                  htmlFor="profileImage"
                >
                  Profile Image URL
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="profileImage"
                  id="profileImage"
                  value={formData.profileImage}
                  className="mt-1 p-2 w-full block shadow-sm border border-gray-300 rounded-md "
                  
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium"
                  htmlFor="bio"
                >
                  Write Bio
                </label>
                <textarea
                  onChange={handleChange}
                  type="text"
                  name="bio"
                  id="bio"
                  rows="3"
                  value={formData.bio}
                  className="mt-1 p-2 w-full block shadow-sm border border-gray-300 rounded-md "
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium"
                  htmlFor="profession"
                >
                  Profession
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="profession"
                  id="profession"
                  value={formData.profession}
                  className="mt-1 p-2 w-full block shadow-sm border border-gray-300 rounded-md "
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >Update Profile</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
