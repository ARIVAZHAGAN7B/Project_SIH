import { kolgal2,kolgal3,kolgal4 } from '../assets/Assets';
const GalleryLayout = () => {
      const galleryImages = [
        kolgal2,
        kolgal3,
        kolgal4,
      ];
  return (
    <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  alt={`Kolam design ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={img}
                />
              </div>
            ))}
          </div>
    </div>
  )
}

export default GalleryLayout;
