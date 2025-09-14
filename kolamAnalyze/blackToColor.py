import os
import google.generativeai as genai
from PIL import Image
import cv2
import numpy as np
import matplotlib.pyplot as plt

# --- Gemini API Configuration ---
try:
    # Ensure your API key is set as an environment variable
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    # The model for image generation
    model = genai.GenerativeModel('gemini-1.5-flash')
except KeyError:
    print("Error: GEMINI_API_KEY environment variable not set.")
    exit()

def change_background_to_black(image_path: str, output_path: str):
    """
    Locally processes an image to create a clean kolam design
    with a black background and smooth white lines.
    """
    print("\n--- Starting Local Image Processing for Kolam Design ---")
    if not os.path.exists(image_path):
        print(f"Error: Original image not found at '{image_path}'")
        return False

    try:
        image = cv2.imread(image_path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        denoised = cv2.fastNlMeansDenoising(gray, None, h=30, templateWindowSize=7, searchWindowSize=21)
        binary = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 15, 5)
        
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        clean = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel, iterations=2)
        clean = cv2.morphologyEx(clean, cv2.MORPH_CLOSE, kernel, iterations=2)
        
        final_image = cv2.bitwise_not(clean)
        
        cv2.imwrite(output_path, final_image)
        print(f"✅ Clean black & white image saved to: {output_path}")
        return True

    except Exception as e:
        print(f"An error occurred during background change: {e}")
        return False

def colorize_kolam_with_gemini(image_path: str, output_path: str):
    """
    Colorizes a black and white kolam image using the Gemini API.
    """
    print("\nStarting Gemini API colorization...")
    if not os.path.exists(image_path):
        print(f"Error: Input image not found at '{image_path}'")
        return

    try:
        # Load the clean black and white image
        clean_kolam_image = Image.open(image_path)

        # Prompt for colorization
        colorization_prompt = [
            clean_kolam_image,
            "Colorize this kolam design. Use vibrant, aesthetic colors for the lines and dots. The background must remain pure black. The colors should be smooth and consistent, following the curves and dot pattern. Make sure the output is a high-quality, colorful image."
        ]

        # Use the Gemini model to generate the colored image
        response = model.generate_content(colorization_prompt)

        if hasattr(response, "images") and response.images:
            # The model may return a list of images, save the first one
            img = response.images[0]
            img.save(output_path)
            print(f"✅ Colorized image saved to: {output_path}")
        else:
            print("❌ Gemini API did not return a valid colorized image.")
            print("Response:", response.text)

    except Exception as e:
        print(f"An error occurred during Gemini API colorization: {e}")


def colorize_image(input_path, output_path, render_factor=35):
    """
    Colorize image using DeOldify (only imported when needed)
    """
    try:
        from deoldify.visualize import get_image_colorizer
        colorizer = get_image_colorizer(artistic=True)
        print("Colorizing image...")
        colorizer.plot_transformed_image(
            input_path,
            render_factor=render_factor,
            display_render_factor=True,
            figsize=(8,8),
            results_dir='.'
        )
        # The colorized image will be saved as 'colorized.jpg' in the current directory
        import shutil
        shutil.move('colorized.jpg', output_path)
        print(f"✅ Colorized image saved to: {output_path}")
        return True
    except ImportError as e:
        print(f"❌ DeOldify import error: {e}")
        print("Please install compatible versions or use Gemini API colorization instead.")
        return False
    except Exception as e:
        print(f"❌ Error during colorization: {e}")
        return False

if __name__ == "__main__":
    original_image_path = "image11.png"
    bw_output_path = "kolam_black_and_white.png"
    color_output_path = "kolam_colorized_deoldify.jpg"
    gemini_color_output_path = "kolam_colorized_gemini.jpg"

    # Step 1: Create a clean black and white image
    if change_background_to_black(original_image_path, bw_output_path):
        print("\n--- Attempting colorization methods ---")
        
        # Step 2a: Try DeOldify colorization
        deoldify_success = colorize_image(bw_output_path, color_output_path)
        
        # Step 2b: Try Gemini API colorization as fallback or alternative
        if not deoldify_success:
            print("\n--- Falling back to Gemini API colorization ---")
            colorize_kolam_with_gemini(bw_output_path, gemini_color_output_path)
        else:
            print("\n--- You can also try Gemini API colorization ---")
            colorize_kolam_with_gemini(bw_output_path, gemini_color_output_path)
    
    print("\nProcessing complete.")