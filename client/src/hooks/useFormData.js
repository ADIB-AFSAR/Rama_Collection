import React, { useState } from "react";


export const useFormData = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const uploadFiles = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        setFormData((prev) => ({
            ...prev,
            images: Array.from(files) // Ensure you're storing files as an array
        }));
     }
};


  return [
    handleChange,
    formData,
    setFormData,
    buttonState,
    uploadFiles,
  ]
}
