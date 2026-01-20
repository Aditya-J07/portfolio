import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

// In a real app, you might want to dynamically import these or use a CMS.
// For now, we'll confirm the list of files manually or assume a naming convention if possible,
// but since files are in public for this user request, we'll list them here.
// The user said they will paste images and tell us.
const photos = [
    { src: '/gallery/image1.png', alt: 'Gallery Image 1' },
    { src: '/gallery/image2.png', alt: 'Gallery Image 2' },
    { src: '/gallery/image3.png', alt: 'Gallery Image 3' },
    { src: '/gallery/image4.png', alt: 'Gallery Image 4' },
    { src: '/gallery/image5.png', alt: 'Gallery Image 5' },
    { src: '/gallery/image6.jpg', alt: 'Gallery Image 6' },
    { src: '/gallery/image7.png', alt: 'Gallery Image 7' },
    { src: '/gallery/image8.jpg', alt: 'Gallery Image 8' },
    { src: '/gallery/image9.png', alt: 'Gallery Image 9' },
    { src: '/gallery/image10.png', alt: 'Gallery Image 10' },
    { src: '/gallery/image11.png', alt: 'Gallery Image 11' },
    { src: '/gallery/image12.png', alt: 'Gallery Image 12' },
];

export default function Pics() {
    return (
        <div className="min-h-screen pt-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-mono text-text mb-4 flex items-center justify-center gap-3">
                        <Camera className="w-10 h-10 text-accent" />
                        Photography
                    </h1>
                    <p className="text-subtext0 text-lg max-w-2xl mx-auto">
                        A collection of moments captured through my lens.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.src}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-surface0 shadow-lg"
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
