# Quick Actions Images

Place your custom images for the Quick Actions section in this folder.

## Required Images

You need to upload 4 images with the following names:

1. **capture.png** (or .jpg, .webp) - For the "Capture" button
2. **upload.png** (or .jpg, .webp) - For the "Upload" button  
3. **manual.png** (or .jpg, .webp) - For the "Manual" button
4. **medicines.png** (or .jpg, .webp) - For the "Medicines" button

## Image Specifications

- **Format**: PNG, JPG, or WebP
- **Recommended Size**: 64x64 pixels to 128x128 pixels (square images work best)
- **Background**: Transparent or white background recommended
- **Aspect Ratio**: 1:1 (square) is ideal

## File Structure

```
public/
  images/
    quick-actions/
      capture.png
      upload.png
      manual.png
      medicines.png
```

## Notes

- Images will be automatically resized to fit the button container
- If an image fails to load, the system will show an error in the console
- Make sure image file names match exactly (case-sensitive)

