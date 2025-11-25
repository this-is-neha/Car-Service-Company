import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role")
  const name = localStorage.getItem("name")
  const id = localStorage.getItem("userId")
  console.log("User id", id)
  console.log("Role", role)


  console.log("Token in header is ", token)
  const handleCreate = () => {
    nav("/claim/create");
  };

  const handleView = () => {
    nav("/claims/list");
  };

  const handleHome = () => {
    nav("/");
  };

  const handleLogin = () => {
    nav("/login");
  };
  const handleClick = (id: any) => {

    console.log("Id is", id)
    nav(`/user/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    nav("/login");
  };

  return (
    <header className="bg-white text-gray-900 mx-10 text-l my-2 flex items-center justify-between">
      <div className="flex gap-12 mx-20">
        <button onClick={handleHome}>Home</button>
        {role === "admin" && (
          <button onClick={handleView}
            className=" text-gray-900 px-4 py-2 rounded">
            Claims
          </button>
        )}


      </div>

      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          {role === "admin" ? (
            <button
              onClick={handleCreate}
              className="bg-black px-6 py-2 rounded-full flex items-center gap-2 text-white"
            >
              <IoIosAdd size={20} color="white" /> New
            </button>


          ) : token ?
            (
              <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full">
                <div
                  onClick={() => handleClick(id)} className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">

                </div>
                <span className="font-medium">{name}</span>
              </div>
            ) : null}
        </div>



        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
