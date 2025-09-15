import cv2
import numpy as np
import os

def change_background_to_black(image_path: str, output_path: str):
    """
    Processes an image to create a clean kolam design
    with a black background and smooth white lines with perfect dots.
    Enhanced version with better noise removal and background cleaning.
    """
    print("\n--- Starting Enhanced Kolam Image Processing ---")
    if not os.path.exists(image_path):
        print(f"Error: Original image not found at '{image_path}'")
        return False

    try:
        # Read the image
        image = cv2.imread(image_path)
        if image is None:
            print("Error: Could not read the image")
            return False
        
        print("✓ Image loaded successfully")
        
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply bilateral filter to reduce noise while preserving edges
        bilateral = cv2.bilateralFilter(gray, 15, 80, 80)
        
        # Enhanced denoising
        denoised = cv2.fastNlMeansDenoising(bilateral, None, h=30, templateWindowSize=7, searchWindowSize=21)
        
        # Apply adaptive threshold to handle varying lighting conditions
        adaptive_thresh = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                               cv2.THRESH_BINARY, 21, 10)
        
        # Also try Otsu's thresholding
        _, otsu_thresh = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Combine both thresholding methods for better results
        combined_thresh = cv2.bitwise_and(adaptive_thresh, otsu_thresh)
        
        # Invert if the kolam lines are dark on light background
        if np.mean(combined_thresh) > 127:  # If background is mostly white
            binary = cv2.bitwise_not(combined_thresh)
        else:
            binary = combined_thresh
        
        # Create different kernels for different operations
        small_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
        medium_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        large_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        
        # More aggressive noise removal
        clean = cv2.morphologyEx(binary, cv2.MORPH_OPEN, small_kernel, iterations=2)
        
        # Remove small isolated pixels (noise)
        clean = remove_small_noise(clean, min_area=20)
        
        # Close gaps in lines
        clean = cv2.morphologyEx(clean, cv2.MORPH_CLOSE, medium_kernel, iterations=3)
        
        # Enhance and perfect the dots
        clean = enhance_dots_improved(clean)
        
        # Smooth the lines while preserving structure
        clean = smooth_lines_advanced(clean)
        
        # Final cleanup to ensure pure black background
        clean = final_cleanup(clean)
        
        # Ensure black background, white kolam
        final_image = cv2.bitwise_not(clean)
        
        # Force background to be completely black
        final_image = ensure_black_background(final_image)
        
        cv2.imwrite(output_path, final_image)
        print(f"✅ Clean kolam design saved to: {output_path}")
        return True

    except Exception as e:
        print(f"An error occurred during processing: {e}")
        return False

def remove_small_noise(image, min_area=20):
    """
    Remove small noise components that are smaller than min_area pixels
    """
    # Find all connected components
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(image, connectivity=8)
    
    # Create output image
    cleaned = np.zeros_like(image)
    
    # Keep only components larger than min_area (skip label 0 which is background)
    for i in range(1, num_labels):
        if stats[i, cv2.CC_STAT_AREA] >= min_area:
            cleaned[labels == i] = 255
    
    return cleaned

def enhance_dots_improved(image):
    """
    Detect and enhance circular dots in the kolam pattern with better accuracy
    """
    # Find contours
    contours, _ = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Create a copy to work with
    enhanced = image.copy()
    
    for contour in contours:
        # Calculate contour properties
        area = cv2.contourArea(contour)
        
        # Filter for dot-like shapes
        if 15 < area < 300:  # Adjust based on your image size
            # Calculate circularity
            perimeter = cv2.arcLength(contour, True)
            if perimeter > 0:
                circularity = 4 * np.pi * area / (perimeter * perimeter)
                
                # If the shape is roughly circular (dot-like)
                if circularity > 0.3:  # More lenient threshold
                    # Get the center and radius
                    (x, y), radius = cv2.minEnclosingCircle(contour)
                    center = (int(x), int(y))
                    radius = max(3, int(radius * 0.9))  # Slightly smaller for cleaner look
                    
                    # Draw a perfect circle to replace the imperfect dot
                    cv2.circle(enhanced, center, radius, 255, -1)
    
    return enhanced

def smooth_lines_advanced(image):
    """
    Advanced line smoothing while preserving the kolam structure
    """
    # Apply morphological gradient to find edges
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    
    # Smooth with closing operation
    smoothed = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel, iterations=2)
    
    # Apply Gaussian blur for smoothness
    blurred = cv2.GaussianBlur(smoothed, (3, 3), 0)
    
    # Re-threshold to maintain binary image
    _, smoothed = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY)
    
    # Final morphological operations for clean lines
    smoothed = cv2.morphologyEx(smoothed, cv2.MORPH_OPEN, kernel, iterations=1)
    
    return smoothed

def final_cleanup(image):
    """
    Final cleanup to remove any remaining artifacts
    """
    # Find connected components and remove very small ones
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(image, connectivity=8)
    
    cleaned = np.zeros_like(image)
    
    # Keep only significant components
    for i in range(1, num_labels):
        area = stats[i, cv2.CC_STAT_AREA]
        if area >= 25:  # Minimum area for keeping components
            cleaned[labels == i] = 255
    
    return cleaned

def ensure_black_background(image):
    """
    Ensure the background is completely black by cleaning up any gray areas
    """
    # Apply a more aggressive threshold to ensure pure black/white
    _, pure_bw = cv2.threshold(image, 200, 255, cv2.THRESH_BINARY)
    
    # Use morphological operations to clean up the result
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
    cleaned = cv2.morphologyEx(pure_bw, cv2.MORPH_CLOSE, kernel, iterations=1)
    cleaned = cv2.morphologyEx(cleaned, cv2.MORPH_OPEN, kernel, iterations=1)
    
    return cleaned

def post_process_kolam_enhanced(image_path: str, output_path: str):
    """
    Enhanced post-processing for ultra-clean results
    """
    try:
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        
        # Apply median filter to reduce noise
        filtered = cv2.medianBlur(image, 5)
        
        # Ensure pure black and white
        _, clean = cv2.threshold(filtered, 127, 255, cv2.THRESH_BINARY)
        
        # Final morphological cleanup
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
        clean = cv2.morphologyEx(clean, cv2.MORPH_CLOSE, kernel, iterations=1)
        
        cv2.imwrite(output_path, clean)
        print(f"✅ Enhanced post-processed image saved to: {output_path}")
        return True
        
    except Exception as e:
        print(f"Error in enhanced post-processing: {e}")
        return False

def create_perfect_kolam(image_path: str, output_path: str):
    """
    All-in-one function to create the perfect kolam with black background
    """
    temp_output = "temp_kolam.jpg"
    
    # First pass - main processing
    if change_background_to_black(image_path, temp_output):
        # Second pass - enhanced post-processing
        if post_process_kolam_enhanced(temp_output, output_path):
            # Third pass - ensure correct colors (white kolam on black background)
            fix_kolam_colors(output_path, output_path)
            
            # Clean up temporary file
            if os.path.exists(temp_output):
                os.remove(temp_output)
            print("🎉 Perfect kolam creation complete!")
            return True
    
    return False

def fix_kolam_colors(input_path: str, output_path: str):
    """
    Final function to ensure white kolam on black background
    """
    try:
        image = cv2.imread(input_path, cv2.IMREAD_GRAYSCALE)
        
        # Apply threshold
        _, binary = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)
        
        # Count white and black pixels
        white_pixels = np.sum(binary == 255)
        total_pixels = binary.shape[0] * binary.shape[1]
        white_ratio = white_pixels / total_pixels
        
        # If more than 50% is white, we likely have black kolam on white background
        # We want white kolam on black background
        if white_ratio > 0.5:
            final_image = cv2.bitwise_not(binary)
            print("✓ Inverted colors: White kolam on black background")
        else:
            final_image = binary
            print("✓ Colors already correct: White kolam on black background")
        
        # Save the corrected image
        cv2.imwrite(output_path, final_image)
        return True
        
    except Exception as e:
        print(f"Error fixing colors: {e}")
        return False

# Example usage
if __name__ == "__main__":
    input_path = "image11.png"  # Replace with your input image path
    output_path = "perfect_kolam.jpg"  # Output path
    
    # Create the perfect kolam
    create_perfect_kolam(input_path, output_path)