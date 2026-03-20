import React from 'react';
import { Container, Grid, Box, Typography, Avatar, Paper, Stack, Divider } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

/*  ─── изображения ─────────────────────────────────────────── */
import founderImg from '/founder.jpeg';
import ceoImg from '/ceo.jpeg';
import team1Img from '/staff1.jpeg';
import team2Img from '/staff3.jpeg';
import team3Img from '/staff2.jpeg'; // ← добавьте свои файлы

/*  ─── данные ──────────────────────────────────────────────── */
const teamGallery = [team1Img, team2Img, team3Img];

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 10 }}>
      {/* ===== Founder & CEO ===== */}
      <Grid container spacing={4} alignItems="stretch">
        {/* Founder */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PersonCard
            img={founderImg}
            name="Умар кыргыз"
            title="Основатель"
            bio="Саламатсызбы, менин атым Умар кыргыз. Мен 5 жылдан ашуун убакыттан
            бери кыймылсыз мүлк тармагында иштеп келем. Эгер үй же батирди ипотека
            менен ала албай жатсаңыз, мен жардам берем. Мен жана менин командам
            сизге каалаган райондон ылайыктуу үй же батир таап беребиз."
          />
        </Grid>

        {/* CEO */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PersonCard
            img={ceoImg}
            name="Келдибек Маратбекович"
            title="Генеральный директор"
            bio="Генеральный директор компании Amanat Kyrgyzstan. Имеет более 10 лет
            опыта в банковской сфере и ипотечном кредитовании. Продвигает
            прозрачные условия, клиент-ориентированность и цифровизацию сервиса."
          />
        </Grid>
      </Grid>

      {/*  разделитель  */}
      <Stack direction="row" alignItems="center" sx={{ my: 6 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <BusinessCenterIcon color="disabled" sx={{ mx: 2 }} />
        <Divider sx={{ flexGrow: 1 }} />
      </Stack>

      {/* ===== Gallery of team photos ===== */}
      <Typography variant="h4" align="center" gutterBottom>
        Наша команда
      </Typography>

      <Typography align="center" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
        Мы собрали экспертов по ипотеке, финансам и недвижимости, чтобы сопровождать вас на каждом
        этапе сделки.
      </Typography>

      {/* --- две фотографии рядом --- */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          gap: 3,
          mb: 5,
        }}
      >
        {[team1Img, team2Img].map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt={`Команда ${i + 1}`}
            sx={{
              flex: 1,
              maxWidth: { xs: '100%', md: '50%' },
              borderRadius: 3,
              objectFit: 'cover',
              boxShadow: 2,
              transition: 'transform .35s, box-shadow .35s',
              '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
            }}
          />
        ))}
      </Box>

      {/* --- подпись и третья фотография --- */}
      <Typography variant="h4" align="center" gutterBottom paddingTop="30px">
        Отдел продаж
      </Typography>
      <Typography align="center" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
        Это команда, которая сопровождает клиента с первого запроса до получения ключей: помогает
        подобрать оптимальную ипотечную программу, готовит пакет документов и держит связь 24/7.
      </Typography>

      <Box
        component="img"
        src={team3Img}
        alt="Отдел продаж"
        sx={{
          display: 'block',
          mx: 'auto',
          width: { xs: '100%', md: '70%' },
          borderRadius: 3,
          objectFit: 'cover',
          boxShadow: 2,
          transition: 'transform .35s, box-shadow .35s',
          '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
        }}
      />
    </Container>
  );
}

/* ── маленький переиспользуемый компонент карточки ─────────── */
function PersonCard({ img, name, title, bio }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, md: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
      }}
    >
      <Avatar src={img} alt={name} sx={{ width: 160, height: 160, flexShrink: 0, mx: 'auto' }} />
      <Box>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography>{bio}</Typography>
      </Box>
    </Paper>
  );
}
