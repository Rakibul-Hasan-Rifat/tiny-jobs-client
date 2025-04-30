export const fileUpload = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  console.log(import.meta.env.VITE_IMGBB_API_KEY);
  console.log(formData.get("image"));

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?expiration=&key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      {
        method: "POST",
        body: formData,
      }
    );
    const { data } = await response.json();

    return data.display_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
