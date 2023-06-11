import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Profile = () => {
  const {user}= useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-col items-center mx-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">My Profile</h2>
      </div>
      <div className="bg-white rounded-lg shadow-lg px-8 py-6 w-full md:w-2/3 lg:w-1/2">
        <div className="flex flex-col md:flex-row justify-center items-center mb-6">
          <Link to="#" id="edit_profile" className="btn btn-primary ml-4">
            Edit Profile
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="mb-6">
            <h4 className="text-lg font-semibold">username</h4>
            <p className="text-gray-700">{user?.username}</p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold">Email Address</h4>
            <p className="text-gray-700">{user?.email}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/orders" className="btn btn-danger">
              My Orders
            </Link>
            <Link to="/change-password" className="btn btn-primary">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
