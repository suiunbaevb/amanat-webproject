import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { motion } from 'framer-motion';

import t1 from '../assets/testimonials/t1.jpg';
import t2 from '../assets/testimonials/t2.jpg';
import t3 from '../assets/testimonials/t3.jpg';
import t4 from '../assets/testimonials/t4.jpg';
import t5 from '../assets/testimonials/t5.jpg';
import t6 from '../assets/testimonials/t6.jpg';

const shots = [t1, t2, t3, t4, t5, t6];

export default function ReviewsPage() {
  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 10, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ pb: '20px' }}>
        Отзывы клиентов
      </Typography>

      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {shots.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Paper
              elevation={3}
              sx={{
                overflow: 'hidden',
                borderRadius: 2,
                transition: 'box-shadow 0.3s, transform 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Box
                component="img"
                src={src}
                alt={`Отзыв ${i + 1}`}
                loading="lazy"
                sx={{
                  width: '100%',
                  display: 'block',
                  transition: 'transform .3s ease',
                }}
              />
            </Paper>
          </motion.div>
        ))}
      </Masonry>
    </Container>
  );
}
