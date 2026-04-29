'use client';

import { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import FadeInSection from './FadeInSection';

const content = {
  ja: {
    sublabel: 'お問い合わせ',
    heading: 'ご連絡ください',
    desc: 'ご質問・ご相談・ご提案など、お気軽にお問い合わせください。担当者より折り返しご連絡いたします。',
    name: 'お名前',
    email: 'メールアドレス',
    message: 'メッセージ',
    submit: '送信する',
    success: 'お問い合わせありがとうございます。\n担当者より折り返しご連絡いたします。',
    emailLabel: 'または直接メールにて',
  },
  en: {
    sublabel: 'CONTACT',
    heading: 'Get In Touch',
    desc: 'For inquiries, proposals, or any questions — we would love to hear from you. Our team will respond promptly.',
    name: 'Your Name',
    email: 'Email Address',
    message: 'Message',
    submit: 'Send Message',
    success: 'Thank you for reaching out.\nWe will be in touch shortly.',
    emailLabel: 'Or reach us directly',
  },
};

export default function Contact() {
  const { lang } = useLang();
  const c = content[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      lang === 'ja'
        ? `[利休 Robotics] ${name} 様よりお問い合わせ`
        : `[Rikyu Robotics] Inquiry from ${name}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.open(`mailto:info@rikyuu-robotics.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-transparent border-b border-green-deep/20 py-3 text-green-deep placeholder-green-deep/30 text-sm focus:outline-none focus:border-gold transition-colors duration-200';

  return (
    <section
      id="contact"
      data-nav-bg="#F5F0E8"
      className="py-28 md:py-36 bg-cream relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-green-deep/[0.025] leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(200px, 28vw, 360px)' }}>
        縁
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 relative">
        {/* Section label */}
        <FadeInSection>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold tracking-[0.4em] text-xs uppercase">
              {c.sublabel}
            </span>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 md:gap-20 items-start">
          {/* Left */}
          <FadeInSection delay={80}>
            <h2 className="text-green-deep font-light leading-tight mb-5 text-4xl md:text-5xl tracking-widest whitespace-nowrap">
              {c.heading}
            </h2>
            <div className="w-8 h-px bg-gold mb-6" />
            <p className="text-green-deep/60 text-sm leading-loose">
              {c.desc}
            </p>
            <div className="mt-10">
              <p className="text-green-deep/40 text-xs tracking-widest mb-2">
                {c.emailLabel}
              </p>
              <a
                href="mailto:info@rikyuu-robotics.com"
                className="text-gold text-sm tracking-wider hover:text-gold-light transition-colors duration-200"
              >
                info@rikyuu-robotics.com
              </a>
            </div>
          </FadeInSection>

          {/* Right: form */}
          <FadeInSection delay={160}>
            {submitted ? (
              <div className="flex flex-col items-start gap-4 py-8">
                <div className="w-10 h-px bg-gold" />
                <p className="text-green-deep text-base leading-loose whitespace-pre-line">
                  {c.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <label className="text-green-deep/40 text-xs tracking-widest block mb-1">
                    {c.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder={lang === 'ja' ? '山田 太郎' : 'Taro Yamada'}
                  />
                </div>
                <div>
                  <label className="text-green-deep/40 text-xs tracking-widest block mb-1">
                    {c.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputClass}`}
                    placeholder="taro@example.com"
                  />
                </div>
                <div>
                  <label className="text-green-deep/40 text-xs tracking-widest block mb-1">
                    {c.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder={
                      lang === 'ja'
                        ? 'ご用件をご記入ください...'
                        : 'Please describe your inquiry...'
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="self-start border border-gold text-gold text-xs tracking-[0.3em] px-8 py-3 hover:bg-gold hover:text-cream transition-all duration-300"
                >
                  {c.submit}
                </button>
              </form>
            )}
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
