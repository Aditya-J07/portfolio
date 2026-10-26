import { motion } from 'framer-motion';
import { Camera, Compass } from 'lucide-react';
import SectionLabel from '../components/common/SectionLabel';

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
    <div className="min-h-screen pt-24 px-4 pb-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-1 border-4 border-border p-6 sm:p-8 shadow-brutal flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <SectionLabel
              slot="[04/05]"
              title="Field Photography"
              subtitle="Expedition Frames & Lens Studies"
              className="mb-2"
            />
            <p className="font-body text-ink text-base sm:text-lg max-w-2xl leading-relaxed">
              A collection of moments captured through my lens. Exploring light, textures,
              geometry, and quiet spaces in the natural and urban world.
            </p>
          </div>

          <div className="bg-surface-deep text-text-on-deep border-3 border-border-on-deep p-4 shadow-brutal-sm font-pixel text-[9px] space-y-1.5 shrink-0 self-stretch md:self-auto">
            <div className="text-accent-yellow flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>OPTICS RIG: 35MM / 50MM</span>
            </div>
            <div className="text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent-green" />
              <span>FIELD ROLL: 12 EXPOSURES</span>
            </div>
          </div>
        </motion.div>

        {/* 3x4 Brutalist Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface-1 border-4 border-border p-3 shadow-brutal transition-transform hover:-translate-y-1 group"
            >
              <div className="relative aspect-[4/5] overflow-hidden border-2 border-border bg-surface-deep">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* EXIF Frame Overlay */}
                <div className="absolute top-2 left-2 bg-surface-deep text-accent-yellow font-pixel text-[8px] px-2 py-0.5 border border-border-on-deep shadow-[1px_1px_0px_#000]">
                  FRAME #{String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="pt-3 px-1 flex items-center justify-between font-mono text-xs text-ink">
                <span className="font-bold">{photo.alt}</span>
                <span className="font-pixel text-[8px] text-ink/70">ISO 100 • 1/250S</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
