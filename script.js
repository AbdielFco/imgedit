document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("imageInput");
    const editedImage = document.getElementById("editedImage");
    const brightnessInput = document.getElementById("brightness");
    const contrastInput = document.getElementById("contrast");
    const temperatureInput = document.getElementById("temperature");
    const saturationInput = document.getElementById("saturation");
    const applyFiltersButton = document.getElementById("applyFilters");
    const cropImageButton = document.getElementById("cropImage");
    const saveImageButton = document.getElementById("saveImage");
  
    let originalImage = null;
    let currentImage = null;
  
    imageInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      originalImage = URL.createObjectURL(file);
      currentImage = originalImage;
      editedImage.src = currentImage;
    });
  
    applyFiltersButton.addEventListener("click", applyFilters);
    cropImageButton.addEventListener("click", cropImage);
  
    saveImageButton.addEventListener("click", function() {
      if (currentImage) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = editedImage.width;
        canvas.height = editedImage.height;
        ctx.filter = editedImage.style.filter;
        ctx.drawImage(editedImage, 0, 0, canvas.width, canvas.height);
  
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "edited_image.jpg";
        link.click();
      }
    });
  
    function applyFilters() {
      if (currentImage) {
        const brightnessValue = brightnessInput.value;
        const contrastValue = contrastInput.value;
        const temperatureValue = temperatureInput.value;
        const saturationValue = saturationInput.value;
  
        editedImage.style.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%) sepia(${temperatureValue}%) saturate(${saturationValue}%)`;
      }
    }
  
    function cropImage() {
      if (currentImage) {
        const container = document.querySelector(".image-container");
        const scaleX = originalImage.width / container.offsetWidth;
        const scaleY = originalImage.height / container.offsetHeight;
  
        const cropX = (container.offsetWidth - editedImage.width) / 2;
        const cropY = (container.offsetHeight - editedImage.height) / 2;
  
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
  
        ctx.drawImage(editedImage, cropX * scaleX, cropY * scaleY, editedImage.width, editedImage.height);
  
        editedImage.src = canvas.toDataURL("image/jpeg");
        currentImage = canvas.toDataURL("image/jpeg");
      }
    }
  });
  