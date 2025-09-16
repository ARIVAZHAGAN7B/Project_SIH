from rembg import remove
from PIL import Image

input_path = "real_kolam.png"
output_path = "kolam_black_bg.png"

# Remove background
with open(input_path, "rb") as i:
    result = remove(i)

# Convert result to black background
image = Image.open(result).convert("RGBA")
black_bg = Image.new("RGBA", image.size, (0, 0, 0, 255))
final_img = Image.alpha_composite(black_bg, image)
final_img.save(output_path)
