// MortgageCalc.jsx
import React, { useState, useMemo } from 'react';
import { Paper, Typography, Slider, TextField, Box, Button, Divider } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function MortgageCalc() {
  // ── cтоимость объекта (сом) ────────────────────────────────
  const [price, setPrice] = useState(6_000_000);
  const [down, setDown] = useState(20); // % первоначалки
  const [years, setYears] = useState(15); // срок

  // ── формулы ────────────────────────────────────────────────
  const monthly = useMemo(() => {
    const P = price * (1 - down / 100); // тело кредита
    const r = 0.14 / 12; // 14 % / 12
    const n = years * 12;
    return (P * r) / (1 - Math.pow(1 + r, -n));
  }, [price, down, years]); // пересчёт при любом изменении

  // ── helpers ───────────────────────────────────────────────
  const format = (v) => v.toLocaleString('ru-RU'); // 6 000 000
  const parse = (v) => Number(String(v).replace(/\D/g, '')); // "6 000 000" -> 6000000

  // ── UI ────────────────────────────────────────────────────
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Калькулятор ипотеки
      </Typography>

      {/* Стоимость квартиры */}
      <TextField
        label="Стоимость, cом"
        value={format(price)}
        onChange={(e) => setPrice(parse(e.target.value))}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9 ]*' }}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Первоначальный взнос */}
      <Typography>Первоначальный взнос: {down}%</Typography>
      <Slider value={down} onChange={(_, v) => setDown(v)} step={5} marks min={10} max={70} />

      {/* Срок */}
      <Typography sx={{ mt: 2 }}>Срок (лет): {years}</Typography>
      <Slider value={years} onChange={(_, v) => setYears(v)} step={1} marks min={5} max={30} />

      <Divider sx={{ my: 3 }} />

      {/* Результат */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Ежемесячный платёж
          </Typography>
          <Typography variant="h4" fontWeight={800} color="primary.main">
            {format(Math.round(monthly))} <Typography component="span" variant="h6" fontWeight={500}>сом</Typography>
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowDownwardIcon />}
          onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
          sx={{ px: 3, py: 1.5, whiteSpace: 'nowrap' }}
        >
          Хочу такой платёж
        </Button>
      </Box>
    </Paper>
  );
}
