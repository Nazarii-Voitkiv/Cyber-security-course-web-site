'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface Testimonial {
  id: string;
  rating: number;
  content: string;
  name: string;
  position: string;
  image: string;
}

interface TestimonialsData {
  testimonials: Testimonial[];
}

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= rating;
        const isHalf = !isFull && star - 0.5 <= rating;
        return (
          <StarIcon
            key={star}
            className={`h-6 w-6 ${
              isFull ? 'text-yellow-400' : isHalf ? 'text-yellow-400/50' : 'text-gray-400'
            }`}
          />
        );
      })}
    </div>
  );
};

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });

  const [data, setData] = useState<TestimonialsData | null>(null);
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
    fetch('/api/testimonials/get')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setData(json.data);
        }
      })
      .catch(err => console.error('Error loading testimonials data:', err));
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (!data) return null;

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
          {/* Кнопки навігації - тільки для десктопу */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between pointer-events-none z-10 px-4">
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

          {/* Текст для свайпу - тільки для мобільних */}
          <div className="md:hidden text-center mb-4">
            <p className="text-cyan-400 text-sm animate-pulse">
              &#8592; Гортайте для перегляду відгуків &#8594;
            </p>
          </div>

          {/* Карусель */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {data.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 pl-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-b from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 h-[600px] mx-auto max-w-lg relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(4,159,255,0.1),transparent_70%)]" />
                    <Rating rating={testimonial.rating} />
                    <p className="text-2xl italic text-gray-300 mb-8 leading-relaxed">{testimonial.content}</p>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center space-x-6">
                        <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 64px, 96px"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl md:text-2xl font-semibold text-white mb-1">{testimonial.name}</h4>
                          <p className="text-base md:text-lg text-cyan-400">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
