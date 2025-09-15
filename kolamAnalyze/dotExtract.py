import cv2
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN
import math
import google.generativeai as genai
import os
from PIL import Image
import matplotlib.pyplot as plt

# --- Gemini API Configuration ---
try:
    genai.configure(api_key=os.environ["OPENAI_API_KEY"])
    model = genai.GenerativeModel('gemini-1.5-flash')
except KeyError:
    print("Error: GEMINI_API_KEY environment variable not set.")
    exit()

# --- Your ImprovedKolamDotDetector Class ---
class ImprovedKolamDotDetector:
    def __init__(self):
        self.detected_dots = []
        self.grid_spacing = None

    def preprocess_image(self, image):
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image.copy()
        
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        enhanced = clahe.apply(blurred)
        
        return enhanced

    def filter_edge_dots(self, dots, image_shape, margin_percent=0.05):
        h, w = image_shape[:2]
        margin_x = int(w * margin_percent)
        margin_y = int(h * margin_percent)
        
        filtered = []
        for x, y, r in dots:
            if margin_x < x < (w - margin_x) and margin_y < y < (h - margin_y):
                filtered.append((x, y, r))
        
        print(f"Edge filtering: {len(dots)} -> {len(filtered)} dots (removed {len(dots) - len(filtered)} edge dots)")
        return filtered

    def remove_duplicates_improved(self, dots, min_distance_factor=2.0):
        if len(dots) == 0:
            return []
        
        avg_radius = np.mean([r for _, _, r in dots])
        min_distance = int(avg_radius * min_distance_factor)
        
        print(f"Using min_distance = {min_distance} (avg_radius = {avg_radius:.1f})")
        
        dots_array = np.array([(x, y) for x, y, r in dots])
        
        clustering = DBSCAN(eps=min_distance, min_samples=1).fit(dots_array)
        labels = clustering.labels_
        
        unique_dots = []
        for label in set(labels):
            if label == -1: 
                continue
            cluster_mask = labels == label
            cluster_dots = [dots[i] for i in range(len(dots)) if cluster_mask[i]]
            
            if len(cluster_dots) > 0:
                x_coords = [dot[0] for dot in cluster_dots]
                y_coords = [dot[1] for dot in cluster_dots]
                radii = [dot[2] for dot in cluster_dots]
                
                median_x = int(np.median(x_coords))
                median_y = int(np.median(y_coords))
                median_r = int(np.median(radii))
                
                unique_dots.append((median_x, median_y, median_r))
        
        print(f"Duplicate removal: {len(dots)} -> {len(unique_dots)} dots (removed {len(dots) - len(unique_dots)} duplicates)")
        return unique_dots

    def detect_dots_hough_circles(self, image, min_radius=3, max_radius=25):
        preprocessed = self.preprocess_image(image)
        
        circles = cv2.HoughCircles(
            preprocessed,
            cv2.HOUGH_GRADIENT,
            dp=1,
            minDist=20,
            param1=50,
            param2=35,
            minRadius=min_radius,
            maxRadius=max_radius
        )
        
        dots = []
        if circles is not None:
            circles = np.round(circles[0, :]).astype("int")
            for (x, y, r) in circles:
                dots.append((x, y, r))
        
        print(f"Hough circles detected: {len(dots)} dots")
        return dots

    def detect_dots_blob_detection(self, image):
        preprocessed = self.preprocess_image(image)
        
        params = cv2.SimpleBlobDetector_Params()
        params.filterByArea = True
        params.minArea = 20
        params.maxArea = 250
        params.filterByCircularity = True
        params.minCircularity = 0.75
        params.filterByConvexity = True
        params.minConvexity = 0.8
        params.filterByInertia = True
        params.minInertiaRatio = 0.6
        
        detector = cv2.SimpleBlobDetector_create(params)
        keypoints = detector.detect(preprocessed)
        
        dots = []
        for kp in keypoints:
            x, y = int(kp.pt[0]), int(kp.pt[1])
            r = int(kp.size / 2)
            dots.append((x, y, r))
        
        print(f"Blob detection found: {len(dots)} dots")
        return dots

    def detect_dots_contour_based(self, image):
        preprocessed = self.preprocess_image(image)
        
        binary = cv2.adaptiveThreshold(
            preprocessed, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY_INV, 11, 2
        )
        
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
        binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
        
        contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        dots = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area < 20 or area > 250:
                continue
                
            perimeter = cv2.arcLength(contour, True)
            if perimeter == 0:
                continue
            circularity = 4 * math.pi * area / (perimeter * perimeter)
            
            if circularity > 0.7:
                M = cv2.moments(contour)
                if M["m00"] != 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])
                    radius = int(math.sqrt(area / math.pi))
                    dots.append((cx, cy, radius))
        
        print(f"Contour detection found: {len(dots)} dots")
        return dots

    def estimate_grid_spacing(self, dots):
        if len(dots) < 4:
            return None
        
        points = [(x, y) for x, y, r in dots]
        distances = []
        
        for i in range(len(points)):
            for j in range(i + 1, len(points)):
                dist = math.sqrt((points[i][0] - points[j][0])**2 + 
                                 (points[i][1] - points[j][1])**2)
                distances.append(dist)
        
        distances.sort()
        
        hist, bins = np.histogram(distances, bins=30)
        max_freq_idx = np.argmax(hist)
        estimated_spacing = (bins[max_freq_idx] + bins[max_freq_idx + 1]) / 2
        
        return estimated_spacing

    def conservative_hybrid_detection(self, image):
        print("\n=== Conservative Hybrid Detection ===")
        
        hough_dots = self.detect_dots_hough_circles(image)
        blob_dots = self.detect_dots_blob_detection(image)
        
        hough_filtered = self.filter_edge_dots(hough_dots, image.shape, margin_percent=0.08)
        blob_filtered = self.filter_edge_dots(blob_dots, image.shape, margin_percent=0.08)
        
        all_dots = hough_filtered + blob_filtered
        print(f"Combined detections: {len(all_dots)} dots")
        
        unique_dots = self.remove_duplicates_improved(all_dots, min_distance_factor=1.8)
        self.grid_spacing = self.estimate_grid_spacing(unique_dots)
        
        return unique_dots

    def count_dots(self, image_path, method='conservative_hybrid', visualize=True):
        image = cv2.imread(image_path)
        if image is None:
            print(f"Error: Could not load image from {image_path}")
            return 0
        
        print(f"Image shape: {image.shape}")
        
        if method == 'hough':
            dots = self.filter_edge_dots(self.detect_dots_hough_circles(image), image.shape)
            dots = self.remove_duplicates_improved(dots)
        elif method == 'blob':
            dots = self.filter_edge_dots(self.detect_dots_blob_detection(image), image.shape)
            dots = self.remove_duplicates_improved(dots)
        elif method == 'contour':
            dots = self.filter_edge_dots(self.detect_dots_contour_based(image), image.shape)
            dots = self.remove_duplicates_improved(dots)
        elif method == 'conservative_hybrid':
            dots = self.conservative_hybrid_detection(image)
        else:
            print(f"Unknown method: {method}")
            return 0
        
        self.detected_dots = dots
        dot_count = len(dots)
        
        print(f"\n=== FINAL RESULT ===")
        print(f"Total dots detected: {dot_count}")
        
        if visualize:
            self.visualize_results(image, dots, dot_count)
        
        return dot_count

    def visualize_results(self, image, dots, count):
        result_image = image.copy()
        for i, (x, y, r) in enumerate(dots):
            cv2.circle(result_image, (x, y), r, (0, 255, 0), 2)
            cv2.circle(result_image, (x, y), 2, (0, 0, 255), -1)
            cv2.putText(result_image, str(i+1), (x+r+5, y), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 0, 0), 1)
        
        cv2.putText(result_image, f'Total Dots: {count}', (10, 30), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
        
        if self.grid_spacing:
            cv2.putText(result_image, f'Grid Spacing: {self.grid_spacing:.1f}px', 
                        (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
        
        plt.figure(figsize=(15, 10))
        plt.subplot(1, 2, 1)
        plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        plt.title('Original Image')
        plt.axis('off')
        
        plt.subplot(1, 2, 2)
        plt.imshow(cv2.cvtColor(result_image, cv2.COLOR_BGR2RGB))
        plt.title(f'Detected Dots (Count: {count})')
        plt.axis('off')
        
        plt.tight_layout()
        plt.show()

    def save_results(self, image_path, output_path=None):
        if output_path is None:
            output_path = image_path.replace('.', '_results.')
        
        image = cv2.imread(image_path)
        if image is None:
            print("Error: Could not load image for saving results.")
            return

        result_image = image.copy()
        
        for i, (x, y, r) in enumerate(self.detected_dots):
            cv2.circle(result_image, (x, y), r, (0, 255, 0), 2)
            cv2.circle(result_image, (x, y), 2, (0, 0, 255), -1)
            cv2.putText(result_image, str(i+1), (x+r+5, y), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 0, 0), 1)
        
        cv2.putText(result_image, f'Total Dots: {len(self.detected_dots)}', 
                    (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
        
        cv2.imwrite(output_path, result_image)
        print(f"Results saved to: {output_path}")

def change_background_to_black(image_path, output_path):
    """
    Converts a Kolam image to have a pure black background and clear, white, circular dots and lines.
    Also visualizes each processing step for debugging.
    """
    try:
        image = cv2.imread(image_path)
        if image is None:
            print(f"Error: Could not load image from {image_path}")
            return

        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Denoise to remove background texture
        denoised = cv2.fastNlMeansDenoising(gray, None, h=30, templateWindowSize=7, searchWindowSize=21)

        # Use a global threshold (Otsu's method)
        binary = cv2.adaptiveThreshold(
            denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY, 15, 5
        )
        
        # Remove small noise (morphological opening)
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        clean = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel, iterations=2)
        clean = cv2.morphologyEx(clean, cv2.MORPH_CLOSE, kernel, iterations=2)
        
        # Invert the image so the lines/dots are white and the background is black.
        final_image = cv2.bitwise_not(clean)

                # --- Add dots to the morph cleaned image for visualization ---
        detector = ImprovedKolamDotDetector()
        dots = detector.conservative_hybrid_detection(image)
        clean_with_dots = clean.copy()
        for x, y, r in dots:
            cv2.circle(clean_with_dots, (x, y), max(3, min(r, 7)), (255, 255, 255), 2, lineType=cv2.LINE_AA)
        # --- Visualization of each step ---
       
        plt.figure(figsize=(15, 8))

        plt.subplot(2, 3, 1)
        plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        plt.title('Original')
        plt.axis('off')

        plt.subplot(2, 3, 2)   # changed from 6 → 2
        plt.imshow(gray, cmap='gray')
        plt.title('Gray')
        plt.axis('off')

        plt.subplot(2, 3, 3)
        plt.imshow(denoised, cmap='gray')
        plt.title('Denoised')
        plt.axis('off')

        plt.subplot(2, 3, 4)
        plt.imshow(binary, cmap='gray')
        plt.title('Thresholded')
        plt.axis('off')

        plt.subplot(2, 3, 5)
        plt.imshow(clean_with_dots, cmap='gray')
        plt.title('Morph Cleaned + Dots')
        plt.axis('off')

        plt.subplot(2, 3, 6)   # keep this for final
        plt.imshow(final_image, cmap='gray')
        plt.title('Final (Black BG)')
        plt.axis('off')

        plt.tight_layout()
        plt.show()
        # --- End visualization ---

        cv2.imwrite(output_path, final_image)
        print(f"Black background image with clear white dots saved to: {output_path}")

    except Exception as e:
        print(f"An error occurred during background change: {e}")
        
# --- Main execution block ---
# --- Main execution block ---
if __name__ == "__main__":
    detector = ImprovedKolamDotDetector()
    
    # Define the image path
    original_image_path = "kolam10.webp"
    
    print("Starting dot detection and Gemini API integration...")
    
    try:
        # Only use the original image and the prompt (no reference image)
        original_image = Image.open(original_image_path)
        
        image_generation_prompt = [
            original_image,
            "Redraw this kolam design with a black background and smooth white lines and white dots. The dots should be small, circular, and clearly defined. Maintain the original pattern and number of dots."
        ]

        print("\nSending prompt to Gemini API for image generation...")
        response = model.generate_content(image_generation_prompt)

        # --- Improved Gemini API response handling ---
        if hasattr(response, "image") and response.image is not None:
            output_path = "kolam_black_background_gemini.jpg"
            response.image.save(output_path)
            print(f"Gemini output image saved to: {output_path}")
        else:
            print("\n❌ Gemini API did not return a valid image.")
            print("Response:", getattr(response, "text", str(response)))
            print("Tip: You can colorize the black & white kolam manually using GIMP, Krita, or Photoshop.")

        # ------------------------------------------------------------------
        # NEW SECTION: LOCAL PROCESSING TO CHANGE BACKGROUND TO BLACK
        # ------------------------------------------------------------------
        print("\n=== Local Image Processing: Changing Background to Black ===")
        black_bg_output_path = "kolam_black_background.jpg"
        change_background_to_black(original_image_path, black_bg_output_path)
        # ------------------------------------------------------------------
        
        final_count = detector.count_dots(original_image_path, method='conservative_hybrid', visualize=True)
        detector.save_results(original_image_path, "kolam_detected_dots_improved.jpg")

    except Exception as e:
        print(f"An error occurred: {e}")