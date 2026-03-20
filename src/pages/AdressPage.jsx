// src/pages/AddressPage.jsx
import React from 'react';
import { Container, Grid, Box, Paper, Typography, Stack, Divider } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// ▸ изображения (поменяйте пути при необходимости)
import mapImg from '../assets/vefa-map.jpeg';
import buildingImg from '../assets/vefa.jpeg';
import officeImg from '../assets/office.png';

/* фирменный зелёный */
const brandGreen = '#006B4F';

/* лёгкий киргизский орнамент (SVG) ― поверх зелёного градиента */
const pattern =
  'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 2px, transparent 2.1px)';

export default function AddressPage() {
  return (
    <Box
      sx={{
        width: '100%', // растягивает фон на всю высоту окна
        background: `linear-gradient(135deg, #dff4eb 0%, #f4faf7 100%)`, // чуть насыщеннее зелёный
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: pattern,
          backgroundSize: '40px 40px',
          opacity: 0.25,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', pt: 14, pb: 14 }}>
        {/* ===== Заголовок ===== */}
        <Typography
          variant="h3"
          align="center"
          fontWeight={700}
          gutterBottom
          sx={{ color: brandGreen }}
        >
          Наш офис
        </Typography>
        <Typography align="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Мы находимся в&nbsp;деловом центре города&nbsp;&mdash; <b>VEFA&nbsp;Center</b>,
          Байтик&nbsp;Баатыра&nbsp;98, 10&nbsp;этаж. Ниже&nbsp;&mdash; карта и фото входа, чтобы вы
          точно не заблудились.
        </Typography>

        {/* ===== Блок: карта + фото ===== */}
        <Grid container spacing={7} justifyContent="center">
          {/* Карта */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={4}
              sx={{
                overflow: 'hidden',
                borderRadius: 3,
                position: 'relative',
                '& img': { width: '100%', display: 'block' },
              }}
            >
              <img src={mapImg} alt="Скрин карты 2ГИС" />
              {/* маркер поверх карты */}
              <RoomIcon
                sx={{
                  color: brandGreen,
                  fontSize: 48,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-100%)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.3))',
                }}
              />
            </Paper>
          </Grid>

          {/* Фото здания — два кадра в ряд */}
          <Grid size={{ xs: 12 }}>
            <Grid
              container
              spacing={4}
              justifyContent="center" // центрирует по горизонтали
            >
              {[buildingImg, officeImg].map((src, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 5.5 }} key={idx}>
                  <Paper
                    elevation={4}
                    sx={{
                      overflow: 'hidden',
                      borderRadius: 3,
                      '& img': {
                        width: '100%',
                        height: { xs: 260, md: 400 },
                        objectFit: 'cover',
                        transition: 'transform .45s',
                      },
                      '&:hover img': { transform: 'scale(1.06)' },
                    }}
                  >
                    <img src={src} alt={`VEFA Center — вход ${idx + 1}`} />
                  </Paper>
                </Grid>
              ))}

              <Stack
                direction={{ xs: 'row', md: 'column' }}
                spacing={4}
                justifyContent="center"
                sx={{ mt: 0 }}
              >
                <InfoItem icon={<RoomIcon />} label="Адрес">
                  VEFA&nbsp;Center, Байтик&nbsp;Баатыра&nbsp;98
                  <br />
                  10&nbsp;этаж, Бишкек
                </InfoItem>
                <Divider
                  flexItem
                  orientation="vertical"
                  sx={{ display: { xs: 'none', md: 'block' } }}
                />
                <InfoItem icon={<PhoneIcon />} label="Телефон">
                  +996&nbsp;990&nbsp;900&nbsp;999
                </InfoItem>
                <Divider
                  flexItem
                  orientation="vertical"
                  sx={{ display: { xs: 'none', md: 'block' } }}
                />
                <InfoItem icon={<AccessTimeIcon />} label="График">
                  Пн-Пт&nbsp;11:00-19:00
                </InfoItem>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* ── мелкий компонент под иконку + текст ─────────────── */
function InfoItem({ icon, label, children }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ color: brandGreen, mt: '4px' }}>{icon}</Box>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ color: brandGreen }}>
          {label}
        </Typography>
        <Typography>{children}</Typography>
      </Box>
    </Stack>
  );
}
