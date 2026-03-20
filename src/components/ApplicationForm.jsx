import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdWBZEM1Is0HnUIL1hayMUWJqBWf8HMX6dgkEYbwvGVQlSSrg/formResponse';

const TG_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

async function sendToTelegram(data) {
  const text =
    `📋 *Новая заявка с сайта*\n\n` +
    `👤 *Имя:* ${data.name}\n` +
    `📞 *Телефон:* ${data.phone}\n` +
    `💼 *Работа:* ${data.job}\n` +
    `🎂 *Возраст:* ${data.age}\n` +
    `🏠 *Тип жилья:* ${data.housingType}\n` +
    `📍 *Район:* ${data.district}\n` +
    `🚪 *Комнат:* ${data.rooms}`;

  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'Markdown' }),
  });
}

const EMPTY_FORM = {
  name: '',
  phone: '+996',
  job: '',
  age: '',
  housingType: '',
  district: '',
  rooms: '',
};

// ── Validation rules ──────────────────────────────────────────────────────────
function validate(data) {
  const errors = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Введите имя (минимум 2 символа)';
  }

  const phoneDigits = data.phone.replace(/\D/g, '');
  const validPhone =
    /^(\+996|0)(700|500|550|770|220|312|999|990|555|777|888|996)\d{6}$/.test(
      data.phone.trim()
    ) || (phoneDigits.length >= 9 && phoneDigits.length <= 12);
  if (!data.phone.trim()) {
    errors.phone = 'Введите номер телефона';
  } else if (!validPhone) {
    errors.phone = 'Некорректный номер (пример: +996 700 123 456)';
  }

  if (!data.job.trim() || data.job.trim().length < 2) {
    errors.job = 'Укажите должность / место работы';
  }

  const age = Number(data.age);
  if (!data.age) {
    errors.age = 'Введите возраст';
  } else if (!Number.isInteger(age) || age < 18 || age > 70) {
    errors.age = 'Возраст должен быть от 18 до 70 лет';
  }

  if (!data.housingType) {
    errors.housingType = 'Выберите тип жилья';
  }

  if (!data.district.trim() || data.district.trim().length < 2) {
    errors.district = 'Укажите желаемый район';
  }

  if (!data.rooms) {
    errors.rooms = 'Выберите количество комнат';
  }

  return errors;
}

const ApplicationForm = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });

  const handleChange = (e) => {
    const { name } = e.target;
    let value = e.target.value;
    if (name === 'phone' && !value.startsWith('+996')) {
      value = '+996';
    }
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    // Re-validate this field if it was already touched
    if (touched[name]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched and validate
    const allTouched = Object.keys(EMPTY_FORM).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    const formBody = new URLSearchParams({
      'entry.2005620554': formData.name,
      'entry.1166974658': formData.phone,
      'entry.1045781291': formData.job,
      'entry.1065046570': formData.age,
      'entry.2004133215': formData.housingType,
      'entry.839337160': formData.district,
      'entry.2010576473': formData.rooms,
    });

    try {
      await Promise.all([
        fetch(FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody.toString(),
        }),
        sendToTelegram(formData),
      ]);
      setFormData(EMPTY_FORM);
      setTouched({});
      setErrors({});
      setSnackbar({ open: true, severity: 'success', message: 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.' });
    } catch {
      setSnackbar({ open: true, severity: 'error', message: 'Ошибка отправки. Пожалуйста, попробуйте ещё раз или свяжитесь с нами по телефону.' });
    } finally {
      setLoading(false);
    }
  };

  const fieldProps = (name) => ({
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && Boolean(errors[name]),
    helperText: touched[name] && errors[name],
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Оставить заявку
        </Typography>

        <TextField label="Имя" required {...fieldProps('name')} />

        <TextField
          label="Номер телефона"
          placeholder="+996 700 123 456"
          inputProps={{ inputMode: 'tel' }}
          required
          {...fieldProps('phone')}
        />

        <TextField label="Кем вы работаете" required {...fieldProps('job')} />

        <TextField
          label="Ваш возраст"
          inputProps={{ inputMode: 'numeric', min: 18, max: 70 }}
          required
          {...fieldProps('age')}
        />

        <TextField
          label="Тип жилья"
          select
          required
          {...fieldProps('housingType')}
        >
          <MenuItem value="Батир / Квартира">Батир / Квартира</MenuItem>
          <MenuItem value="Дом">Дом</MenuItem>
        </TextField>

        <TextField label="Желаемый район" required {...fieldProps('district')} />

        <TextField
          label="Количество комнат"
          select
          required
          {...fieldProps('rooms')}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4+</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{ mt: 1, py: 1.5 }}
        >
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ApplicationForm;
