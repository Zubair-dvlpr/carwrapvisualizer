import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUserAPIFn, deleteShopManUserAPIFn, getAllUsersAPIFn, resetPasswordRequestAPIFn } from '../../../redux/features/newUser/newUser';
import { FiTrash2, FiRefreshCcw } from 'react-icons/fi';

const MembersList = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.newUser);
  const [selectedUser, setSelectedUser] = useState(null); // user selected for deletion
  const [showModal, setShowModal] = useState(false);
  const [resetPopupUser, setResetPopupUser] = useState(null);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(getAllUsersAPIFn());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewUser = async (e) => {
    e.preventDefault();

    // Simple form validation
    const { firstName, lastName, email, password } = formData;
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const data = await dispatch(addNewUserAPIFn(formData));

      if (data?.meta?.requestStatus === 'fulfilled') {
        // alert('✅ User added successfully!');
        setShowModal(false);
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        dispatch(getAllUsersAPIFn()); // Refresh user list
      } else {
        const errorMessage = data?.payload?.message || 'Something went wrong while adding the user.';
        alert(`❌ Failed to add user: ${errorMessage}`);
        console.error("Add user error:", data);
      }
    } catch (error) {
      alert('❌ An unexpected error occurred.');
      console.error("Unexpected error while adding user:", error);
    }
  };

  const confirmDeleteUser = async () => {
    try {
      const res = await dispatch(deleteShopManUserAPIFn(selectedUser._id));
      if (res?.meta?.requestStatus === 'fulfilled') {
        alert('✅ User deleted successfully!');
        dispatch(getAllUsersAPIFn()); // Refresh list
      } else {
        alert(`❌ Failed to delete user: ${res?.payload}`);
      }
    } catch (err) {
      console.error(err);
      alert('Unexpected error occurred.');
    } finally {
      setSelectedUser(null); // close modal
    }
  };

  const handleResetPassword = async (userId, user) => {
    try {
      const res = await dispatch(resetPasswordRequestAPIFn({ userId }));

      if (res?.meta?.requestStatus === 'fulfilled') {
        setResetPopupUser(user);  // Set user info for popup
        setShowResetPopup(true);  // Show popup

        // Auto-close after 5 seconds (optional)
        setTimeout(() => {
          setShowResetPopup(false);
          setResetPopupUser(null);
        }, 5000);
      } else {
        alert(`❌ Failed to send reset request: ${res?.payload}`);
      }
    } catch (error) {
      console.error(error);
      alert('❌ Unexpected error occurred while resetting password.');
    }
  };



  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full mx-auto relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
        <span
          onClick={() => setShowModal(true)}
          className="text-sm text-[#858585] cursor-pointer hover:underline"
        >
          Add Member
        </span>
      </div>
      {/* {console.log(users)} */}
      {/* Members */}
      <div className="space-y-4">

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#EB227C] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <div className="text-sm text-gray-500 mt-2">Loading Members</div>
          </div>
        ) : (
          users.map((member, index) => (
            <div key={index} className="flex items-center  justify-between">

              <div className='flex items-center gap-4'>
                <img
                  src={member?.avatar || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}`}
                  alt={member?.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-900 font-medium">
                    {member?.firstName} {member?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {member?.role?.[0]?.role === 'shop-man' ? 'Shop Manager' : 'Member'}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                {/* Reset Password Icon */}
                <button
                  onClick={() => handleResetPassword(member._id, member)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Reset Password"
                >
                  <FiRefreshCcw size={20} />
                </button>

                {/* Delete Icon */}
                <button
                  onClick={() => setSelectedUser(member)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete User"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Modal (same as before) */}
      {showModal && (
        <div className="fixed inset-0 bg-[#000000a8] backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <form onSubmit={addNewUser} className="space-y-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-[#000000a8] backdrop-blur-sm bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete{' '}
              <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}


      {showResetPopup && resetPopupUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000a8] backdrop-blur-sm  bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Password Reset Email Sent
            </h2>
            <p className="text-sm text-gray-600">
              Hello <strong>{resetPopupUser.firstName}</strong>, we've sent you an email with a link to reset your password.
              <br />
              Please check your inbox. The link will expire in <strong>5 minutes</strong>.
            </p>
            <div className="text-right mt-4">
              <button
                onClick={() => setShowResetPopup(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MembersList;
