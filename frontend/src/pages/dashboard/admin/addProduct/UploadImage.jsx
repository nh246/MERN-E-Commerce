import axios from "axios";
import { useState } from "react";
import { getBaseUrl } from "../../../../utils/getBaseUrl";

const UploadImage = ({ name, setImage, label, id, value }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = async (base64) => {
    // call api to upload the image to cloudinary server
    setLoading(true);

    await axios
      .post(`${getBaseUrl()}/uploadImage`, { image: base64 })
      .then((res) => {
        const imageUrl = res.data;
        setUrl(imageUrl);
        console.log("Image URL:", res.data);
        alert("Uploaded image successfully!");
        setImage(imageUrl);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Failed to upload image", error);
        setLoading(false);
        alert("Failed to upload image, please try again!");
      });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log("Files:", files);
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]); // result
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
  };
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        type="file"
        onChange={uploadImage}
        name={name}
        id={name}
        className="add-product-InputCSS"
      />
      {loading && (
        <div className="mt-2 text-sm text-blue-600">
          <p>Uplading...</p>
        </div>
      )}
      {url && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={url} alt="uploaded image" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
