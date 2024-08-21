import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"

function App() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const token = localStorage.getItem("token");
        const getUserResponse = await fetch(`${API_URL}/account`, {
          mode: 'cors',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!getUserResponse.ok) {
          navigate("/login");
        } else {
          const userData = await getUserResponse.json();
        }
      } catch (err) {
        alert("Error accessing page");
        console.error(err);
      }
    }


    getUser();
    getFolder();
  }, [API_URL, navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    alert("You are logged out!");
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (images.length === 0) {
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    try {
      const token = localStorage.getItem("token");
      const getSubmitFormResponse = await fetch(`${API_URL}/file`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });
      const data = await getSubmitFormResponse.json();
      console.log(data);
      setImages([]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="grid p-4">
        <div className="grid grid-cols-5">
          <div className="col-span-1">
          <h1 className="text-4xl font-bold">File Uploader</h1>
          </div>
          <div className="grid col-span-4">
            <button className="justify-self-end" onClick={handleLogout}>logout</button>
          </div>
        </div>
      

        <div className="grid grid-cols-5">
          <div className="cols-span-1">
            
          </div>
          <div className="col-span-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label htmlFor="">file</label>
                <input onChange={(e) => setImages(e.target.files)} type="file" name="images" multiple />
              </div>
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
