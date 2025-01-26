'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    image: '/testimonials/review1.jpg',
  },
  {
    id: 2,
    image: '/testimonials/review2.jpg',
  },
  {
    id: 3,
    image: '/testimonials/review3.jpg',
  },
  // Додайте більше відгуків за потреби
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Кібер-елементи */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(4,159,255,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-20" />
      </div>

      <div className="absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(4,159,255,0.15),rgba(0,0,0,0))]" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Відгуки наших студентів
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Кнопки навігації */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10 px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollPrev}
              className={`cyber-button-circle p-2 pointer-events-auto ${
                prevBtnEnabled ? 'opacity-100' : 'opacity-50'
              }`}
              disabled={!prevBtnEnabled}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollNext}
              className={`cyber-button-circle p-2 pointer-events-auto ${
                nextBtnEnabled ? 'opacity-100' : 'opacity-50'
              }`}
              disabled={!nextBtnEnabled}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Карусель */}
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex-[0_0_100%] min-w-0 pl-4"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Image
                      src={testimonial.image}
                      alt="Відгук студента"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
