import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  GlobalStyles,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SecurityIcon from '@mui/icons-material/Security';
import BoltIcon from '@mui/icons-material/Bolt';
import GroupsIcon from '@mui/icons-material/Groups';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import MortgageCalc from './components/MortgageCalc';
import ApplicationForm from './components/ApplicationForm';

import myLogo from './assets/logo.jpg';
import etnoWall from './assets/etno-gener.png';
import etnoPattern from './assets/etno-wall.png';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import AdressPage from './pages/AdressPage';
import FaqPage from './pages/FaqPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#006B4F', dark: '#004738', light: '#39B88C' },
    secondary: { main: '#F4F8F5' },
  },
  typography: {
    fontFamily: 'Cormorant Garamond, Georgia, serif',
    h1: { fontFamily: '"Cinzel Decorative", "Cinzel", serif', fontWeight: 700 },
    h2: { fontFamily: '"Cinzel Decorative", "Cinzel", serif', fontWeight: 700 },
    h3: { fontFamily: '"Cinzel", serif', fontWeight: 600 },
    h4: { fontFamily: '"Cinzel", serif', fontWeight: 600 },
    h5: { fontFamily: '"Cinzel", serif', fontWeight: 400 },
    h6: { fontFamily: '"Cinzel", serif', fontWeight: 600 },
    body1: { fontFamily: 'Inter, Roboto, sans-serif' },
    body2: { fontFamily: 'Inter, Roboto, sans-serif' },
    button: { fontFamily: '"Cinzel", serif', letterSpacing: 1.5 },
    subtitle1: { fontFamily: 'Inter, Roboto, sans-serif' },
    subtitle2: { fontFamily: '"Cinzel", serif', letterSpacing: 2 },
    caption: { fontFamily: 'Inter, Roboto, sans-serif' },
  },
  shape: { borderRadius: 12 },
});

const NAV_LINKS = [
  { label: 'Главная', to: '/' },
  { label: 'О нас', to: '/about' },
  { label: 'Отзывы', to: '/reviews' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Адрес', to: '/adress' },
];

// ── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = () => (
  <Box
    component="section"
    sx={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,.55)), url(${etnoWall})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
    }}
  >
    <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 10 } }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' } }}
      >
        Amanat Kyrgyzstan
      </Typography>
      <Typography
        variant="h5"
        sx={{ maxWidth: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, mb: 4, opacity: 0.92 }}
      >
        Нет официальной работы или дохода? Мы поможем! Постройте с нами путь к&nbsp;собственной
        квартире — через доступную ипотеку
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowDownwardIcon />}
          onClick={() =>
            document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
          }
          sx={{
            bgcolor: 'primary.main',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Оставить заявку
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<WhatsAppIcon />}
          component="a"
          href="https://wa.me/996990999993"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderColor: 'rgba(255,255,255,0.7)',
            color: '#fff',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': {
              borderColor: '#fff',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          WhatsApp
        </Button>
      </Box>
    </Container>
  </Box>
);

// ── 404 ──────────────────────────────────────────────────────────────────────
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
        pt: 8,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: '5rem', md: '8rem' }, color: 'primary.main', fontWeight: 700 }}
      >
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Возможно, страница была удалена или вы перешли по неверной ссылке.
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/')}>
        На главную
      </Button>
    </Box>
  );
};

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: 'blur(6px)',
          bgcolor: 'rgba(255,255,255,0.85)',
          boxShadow: '0 2px 12px rgba(0,0,0,.06)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src={myLogo}
              alt="Amanat logo"
              height={40}
              style={{ borderRadius: '50%', marginRight: 8 }}
            />
            Amanat
          </Typography>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {NAV_LINKS.map((link) => (
              <Button key={link.to} color="inherit" component={Link} to={link.to}>
                {link.label}
              </Button>
            ))}
            <Button
              variant="contained"
              sx={{ ml: 1, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
              component="a"
              href="https://wa.me/996990999993"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />}
            >
              Связаться
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Открыть меню"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="Закрыть меню">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.to}
              component={Link}
              to={link.to}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            component="a"
            href="https://wa.me/996990999993"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsAppIcon />}
            onClick={() => setDrawerOpen(false)}
          >
            Связаться в WhatsApp
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

// ── Animated counter ─────────────────────────────────────────────────────────
const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, to, { duration: 1.8, ease: 'easeOut' });
    const unsub = motionVal.on('change', (v) => setDisplay(Math.round(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, motionVal]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

// ── Stats section ─────────────────────────────────────────────────────────────
const STATS = [
  { value: 500, suffix: '+', label: 'довольных клиентов' },
  { value: 5, suffix: '+', label: 'лет на рынке' },
  { value: 48, suffix: ' ч', label: 'среднее одобрение' },
  { value: 12, suffix: '', label: 'банков-партнёров' },
];

const StatsSection = () => (
  <Box sx={{ bgcolor: 'primary.main', py: { xs: 5, md: 7 } }}>
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {STATS.map(({ value, suffix, label }, i) => (
          <Grid size={{ xs: 6, md: 3 }} key={label}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              sx={{ textAlign: 'center', color: '#fff', py: { xs: 1.5, md: 1 } }}
            >
              {/* верхний орнамент */}
              <Typography sx={{ fontSize: '0.65rem', opacity: 0.45, letterSpacing: 4, mb: 0.5 }}>
                ◆ ◆ ◆
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '2.6rem', md: '3.4rem' },
                  fontWeight: 700,
                  lineHeight: 1,
                  fontFamily: '"Cinzel Decorative", "Playfair Display", serif',
                  letterSpacing: { xs: 1, md: 2 },
                  textShadow: '0 2px 16px rgba(0,0,0,0.25)',
                  mb: 0.75,
                }}
              >
                <Counter to={value} suffix={suffix} />
              </Typography>

              {/* разделитель — горизонтальная линия с ромбом */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mb: 0.75 }}>
                <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(255,255,255,0.3)', maxWidth: 32 }} />
                <Typography sx={{ fontSize: '0.5rem', opacity: 0.6 }}>◆</Typography>
                <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(255,255,255,0.3)', maxWidth: 32 }} />
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: '0.72rem', md: '0.82rem' },
                  opacity: 0.8,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

// ── Home page content ─────────────────────────────────────────────────────────
const HomePage = () => (
  <>
    <HeroSection />
    <StatsSection />

    {/* Why Amanat */}
    <Box
      sx={{
        position: 'relative',
        py: { xs: 6, md: 10 },
        backgroundImage: `url(${etnoPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.28)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '72px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15))',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight={700}
            sx={{
              display: 'inline-block',
              color: '#fff',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              px: 4,
              py: 1,
            }}
          >
            Почему Amanat?
          </Typography>
          <Typography
            sx={{
              maxWidth: 560,
              mx: 'auto',
              mt: 1,
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}
          >
            Гибкие ипотечные программы, прозрачные условия и поддержка на каждом этапе покупки
            жилья.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              icon: <SecurityIcon sx={{ fontSize: 36, color: 'primary.main' }} />,
              title: 'Прозрачные договоры',
              desc: 'Никаких скрытых платежей и сюрпризов. Все условия фиксируются в договоре до подписания.',
            },
            {
              icon: <BoltIcon sx={{ fontSize: 36, color: 'primary.main' }} />,
              title: 'Одобрение за 48 часов',
              desc: 'Быстро рассматриваем заявки и даём ответ в течение двух рабочих дней.',
            },
            {
              icon: <HomeWorkIcon sx={{ fontSize: 36, color: 'primary.main' }} />,
              title: 'Большой выбор районов',
              desc: 'Подберём квартиру или дом в любом районе Бишкека под ваш бюджет.',
            },
            {
              icon: <AccountBalanceIcon sx={{ fontSize: 36, color: 'primary.main' }} />,
              title: 'Без официального дохода',
              desc: 'Помогаем оформить ипотеку даже без справки о зарплате и официального трудоустройства.',
            },
            {
              icon: <SupportAgentIcon sx={{ fontSize: 36, color: 'primary.main' }} />,
              title: 'Поддержка 24/7',
              desc: 'Наши менеджеры всегда на связи — звоните или пишите в WhatsApp в любое время.',
            },
            {
              icon: <GroupsIcon sx={{ fontSize: 36, color: 'primary.main' }} />,
              title: 'Опытная команда',
              desc: 'Более 5 лет на рынке недвижимости Кыргызстана. Сотни успешных сделок.',
            },
          ].map(({ icon, title, desc }) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'box-shadow .25s, transform .25s',
                  '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
                }}
              >
                <Box sx={{ mb: 1.5 }}>{icon}</Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    {/* Mortgage calculator */}
    <Container maxWidth="md" sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 6, md: 10 } }}>
      <MortgageCalc />
    </Container>

    {/* Application form */}
    <Container id="application-form" maxWidth="sm" sx={{ pb: { xs: 6, md: 12 } }}>
      <ApplicationForm />
    </Container>

    {/* Footer */}
    <Footer />
  </>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const FOOTER_LINKS = [
  { label: 'Главная', to: '/' },
  { label: 'О нас', to: '/about' },
  { label: 'Отзывы', to: '/reviews' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Адрес', to: '/adress' },
];

const footerLink = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  color: 'rgba(255,255,255,0.75)',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: 'color .2s',
  '&:hover': { color: '#fff' },
};

const Footer = () => (
  <Box component="footer" sx={{ bgcolor: 'primary.dark', color: '#fff', pt: 7, pb: 3 }}>
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        {/* Лого + описание */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <img src={myLogo} alt="Amanat" height={44} style={{ borderRadius: '50%' }} />
            <Typography variant="h6" fontWeight={700}>
              Amanat Kyrgyzstan
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
            Помогаем получить ипотеку без официального дохода. Работаем по всему Бишкеку.
          </Typography>
        </Grid>

        {/* Навигация */}
        <Grid size={{ xs: 6, md: 2 }}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.5 }}
          >
            Меню
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
            {FOOTER_LINKS.map((l) => (
              <Box key={l.to} component={Link} to={l.to} sx={footerLink}>
                {l.label}
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Контакты */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.5 }}
          >
            Контакты
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
            <Box component="a" href="tel:+996312123456" sx={footerLink}>
              <PhoneIcon fontSize="small" /> +996 312 123 456
            </Box>
            <Box
              component="a"
              href="https://wa.me/996990999993"
              target="_blank"
              rel="noopener noreferrer"
              sx={footerLink}
            >
              <WhatsAppIcon fontSize="small" /> +996 990 999 993
            </Box>
            <Box component="a" href="mailto:info@amanat.kg" sx={footerLink}>
              <EmailIcon fontSize="small" /> info@amanat.kg
            </Box>
          </Box>
        </Grid>

        {/* CTA */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.5 }}
          >
            Готовы начать?
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.65)', mb: 2.5, lineHeight: 1.8 }}
          >
            Оставьте заявку — мы свяжемся в течение часа и подберём программу.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() =>
              document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
            }
            sx={{ bgcolor: 'primary.light', color: '#fff', '&:hover': { bgcolor: '#2ea87a' } }}
          >
            Оставить заявку
          </Button>
        </Grid>
      </Grid>

      {/* Нижняя строка */}
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mt: 5, mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)' }}>
          © {new Date().getFullYear()} Amanat Kyrgyzstan. Все права защищены.
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)' }}>
          Бишкек, Кыргызстан
        </Typography>
      </Box>
    </Container>
  </Box>
);

// ── Floating WhatsApp button ──────────────────────────────────────────────────
const WhatsAppFab = () => (
  <Box
    component="a"
    href="https://wa.me/996990999993"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Написать в WhatsApp"
    sx={{
      position: 'fixed',
      bottom: 28,
      right: 28,
      zIndex: 1300,
      width: 56,
      height: 56,
      borderRadius: '50%',
      bgcolor: '#25D366',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(37,211,102,0.5)',
      transition: 'transform .2s, box-shadow .2s',
      '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 6px 24px rgba(37,211,102,0.65)',
      },
    }}
  >
    <WhatsAppIcon sx={{ fontSize: 30 }} />
  </Box>
);

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles
          styles={{
            '@import': "url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap')",
        '#root': { maxWidth: '100%', margin: 0, padding: 0, textAlign: 'left' },
            body: {
              margin: 0,
              scrollBehavior: 'smooth',
              display: 'block !important',
              overflowX: 'hidden',
            },
            html: { overflowX: 'hidden' },
          }}
        />
        <CssBaseline />

        <Navbar />
        <WhatsAppFab />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/adress" element={<AdressPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
