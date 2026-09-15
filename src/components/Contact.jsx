import { useState } from 'react';
import { contact, profile } from '../data/content';
import { useMagnetic } from '../hooks/useInteractions';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { useToast } from './Toasts';
import { Check, Copy, Linkedin, Mail, MapPin, Phone, Send } from './icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const channels = [
  { id: 'email', label: 'Email', value: profile.email, icon: Mail, copy: profile.email },
  { id: 'phone', label: 'Téléphone', value: profile.phone, icon: Phone, copy: profile.phone },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Nesrine Boussenna',
    icon: Linkedin,
    href: profile.linkedin,
  },
  { id: 'location', label: 'Localisation', value: profile.location, icon: MapPin },
];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Merci d’indiquer votre nom.';
  if (!values.email.trim()) errors.email = 'Merci d’indiquer votre email.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Cet email semble incomplet.';
  if (values.message.trim().length < 20) {
    errors.message = 'Quelques mots de plus (20 caractères minimum).';
  }
  return errors;
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const toast = useToast();
  const submitRef = useMagnetic(0.25);

  const update = (field) => (event) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field) => () => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length > 0) return;

    // Pas de serveur derrière ce site : le message part par le client mail,
    // pré-rempli avec ce qui vient d'être saisi.
    const subject = values.subject.trim() || `Prise de contact — ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    toast('Message préparé dans votre messagerie');
  };

  const field = (name, label, props = {}) => (
    <div className="field">
      <label className="field__label" htmlFor={`f-${name}`}>
        {label}
      </label>
      <input
        id={`f-${name}`}
        className="field__control"
        value={values[name]}
        onChange={update(name)}
        onBlur={blur(name)}
        aria-invalid={Boolean(errors[name] && touched[name])}
        aria-describedby={errors[name] && touched[name] ? `e-${name}` : undefined}
        {...props}
      />
      {errors[name] && touched[name] ? (
        <span className="field__error" id={`e-${name}`}>
          {errors[name]}
        </span>
      ) : null}
    </div>
  );

  return (
    <form className="card form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        {field('name', 'Nom', { type: 'text', placeholder: 'Votre nom', autoComplete: 'name' })}
        {field('email', 'Email', {
          type: 'email',
          placeholder: 'vous@entreprise.com',
          autoComplete: 'email',
        })}
      </div>

      {field('subject', 'Sujet (facultatif)', {
        type: 'text',
        placeholder: 'Opportunité, mission, question…',
      })}

      <div className="field">
        <label className="field__label" htmlFor="f-message">
          Message
        </label>
        <textarea
          id="f-message"
          className="field__control"
          value={values.message}
          onChange={update('message')}
          onBlur={blur('message')}
          placeholder="Quelques lignes sur le contexte et le besoin…"
          aria-invalid={Boolean(errors.message && touched.message)}
          aria-describedby={errors.message && touched.message ? 'e-message' : undefined}
        />
        {errors.message && touched.message ? (
          <span className="field__error" id="e-message">
            {errors.message}
          </span>
        ) : null}
      </div>

      <div className="form__row" style={{ alignItems: 'center' }}>
        <button type="submit" className="btn btn--brand" ref={submitRef}>
          <Send width="17" height="17" />
          Envoyer le message
        </button>

        {sent ? (
          <span className="form__status" role="status">
            <Check width="16" height="16" />
            Brouillon ouvert dans votre messagerie
          </span>
        ) : (
          <span className="mono muted" style={{ fontSize: 12 }}>
            Ouvre votre client mail, pré-rempli.
          </span>
        )}
      </div>
    </form>
  );
}

export default function Contact() {
  const toast = useToast();

  const copy = async (channel) => {
    try {
      await navigator.clipboard.writeText(channel.copy);
      toast(`${channel.label} copié`);
    } catch {
      toast(channel.copy);
    }
  };

  return (
    <section className="section section--subtle" id="contact">
      <div className="container">
        <SectionHeading
          num="06"
          label="Contact"
          lead={contact.titleLead}
          accent={contact.titleAccent}
          tail="."
          lede={contact.text}
        />

        <div className="contact">
          <Reveal className="contact__aside">
            <div className="contact__channels">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const content = (
                  <>
                    <span className="channel__icon">
                      <Icon width="19" height="19" />
                    </span>
                    <span>
                      <span className="channel__label">{channel.label}</span>
                      <span className="channel__value" style={{ display: 'block' }}>
                        {channel.value}
                      </span>
                    </span>
                    <span className="channel__action">
                      {channel.copy ? <Copy width="16" height="16" /> : null}
                    </span>
                  </>
                );

                if (channel.href) {
                  return (
                    <a
                      className="card card--lift channel"
                      key={channel.id}
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {content}
                    </a>
                  );
                }

                if (channel.copy) {
                  return (
                    <button
                      type="button"
                      className="card card--lift channel"
                      key={channel.id}
                      onClick={() => copy(channel)}
                      aria-label={`Copier : ${channel.value}`}
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <div className="card channel" key={channel.id}>
                    {content}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
