import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Send,
  Heart,
  CircleUserRound,
  Sparkle,
} from "lucide-react";

import contacter from "../adds/contacter.webp";

const contactText = {
  nl: {
    cards: [
      { icon: MapPin, title: "Adres", text: ["Cinemadreef 52", "1325 EM Almere"] },
      {
        icon: Clock,
        title: "Openingstijden",
        text: ["Woensdag - Maandag", "11:00 - 21:00 uur", "Zondag", "11:00 - 21:00 uur"],
      },
      { icon: Phone, title: "Telefoon", text: ["036-7858241"] },
      { icon: Mail, title: "Email", text: ["info@mamarosa.nl"] },
    ],
    badge: "We horen graag van je",
    description:
      "Heb je een vraag, opmerking of wil je een reservering plaatsen? Neem gerust contact met ons op. We staan voor je klaar!",
    mapTitle: "Mamarosa locatie",
    mapsButton: "Open in Google Maps",
    formTitle: "Stuur ons een bericht",
    placeholders: {
      name: "Naam",
      email: "Email",
      subject: "Onderwerp",
      message: "Bericht",
    },
    submit: "Verstuur bericht",
    sending: "Versturen...",
    success: "Bericht succesvol verzonden!",
    error: "Er ging iets mis. Probeer opnieuw.",
    defaultStatus: "We reageren zo snel mogelijk!",
    directTextStart: "Liever direct contact? Bel ons op",
    directTextMiddle: "of mail naar",
  },

  en: {
    cards: [
      { icon: MapPin, title: "Address", text: ["Cinemadreef 52", "1325 EM Almere"] },
      {
        icon: Clock,
        title: "Opening Hours",
        text: ["Wednesday - Monday", "11:00 - 21:00", "Sunday", "11:00 - 21:00"],
      },
      { icon: Phone, title: "Phone", text: ["036-7858241"] },
      { icon: Mail, title: "E-mail", text: ["info@mamarosa.nl"] },
    ],
    badge: "We would love to hear from you",
    description:
      "Do you have a question, comment, or would you like to make a reservation? Feel free to contact us. We are here for you!",
    mapTitle: "Mamarosa location",
    mapsButton: "Open in Google Maps",
    formTitle: "Send us a message",
    placeholders: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
    },
    submit: "Send message",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "Something went wrong. Please try again.",
    defaultStatus: "We will respond as soon as possible!",
    directTextStart: "Prefer direct contact? Call us at",
    directTextMiddle: "or email",
  },
};

export default function Contact({ language }) {
  const currentText = contactText[language];
  const form = useRef(null);
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus(currentText.sending);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setStatus(currentText.success);
          form.current.reset();
        },
        () => {
          setStatus(currentText.error);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background px-6 py-38 text-foreground sm:px-8 md:px-10 lg:px-12 xl:px-16 lg:py-38"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={contacter}
          alt=""
          className="h-full w-full object-cover object-center opacity-95"
        />

        <div className="absolute inset-0 bg-background/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_42%,rgba(0,0,0,0.82)_100%)]" />
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/85 via-background/60 to-background/10" />

      <div className="relative z-10 mx-auto max-w-[1350px]">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 flex justify-center text-primary">
            <Sparkle size={24} />
          </div>

          <p className="font-poppins text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {currentText.badge}
          </p>

          <h2 className="mt-5 flex flex-col items-center gap-4 text-center font-playfair leading-none sm:flex-row sm:justify-center sm:gap-5 lg:gap-10 text-[64px] sm:text-[82px] lg:text-[118px]">
            <span>Contact</span>

            <span className="text-primary relative top-2 flex justify-center">
              <CircleUserRound
                className="h-[42px] w-[42px] sm:h-[52px] sm:w-[52px] lg:h-[64px] lg:w-[64px]"
              />
            </span>
          </h2>

          <div className="mx-auto mt-7 h-[2px] w-20 rounded-full bg-primary" />

          <p className="mx-auto mt-7 max-w-xl font-poppins text-base leading-8 text-foreground/80 sm:text-lg">
            {currentText.description}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {currentText.cards.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="rounded-2xl border border-primary/35 bg-black/45 p-7 text-center backdrop-blur-md"
            >
              <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full border border-primary/60 text-primary">
                <Icon size={31} />
              </div>

              <h3 className="mb-4 font-poppins text-lg font-bold uppercase text-primary">
                {title}
              </h3>

              <div className="space-y-1 font-poppins text-sm leading-6 text-foreground/80">
                {text.map((line, lineIndex) => (
                  <p key={`${title}-${line}-${lineIndex}`}>{line}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-14 overflow-hidden rounded-2xl border border-primary/35 bg-black/50 backdrop-blur-md"
        >
          <iframe
            title={currentText.mapTitle}
            src="https://www.google.com/maps?q=Cinemadreef%2052%2C%201325%20EM%20Almere&output=embed"
            className="h-[320px] w-full border-0 md:h-[420px]"
            loading="lazy"
          />

          <div className="flex flex-col gap-4 border-t border-primary/20 px-5 py-5 font-poppins text-sm text-foreground/80 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-primary" />
              <span>Cinemadreef 52, 1325 EM Almere</span>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Cinemadreef+52+1325+EM+Almere"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-bold text-primary underline underline-offset-4"
            >
              {currentText.mapsButton} <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <h3 className="flex flex-col items-center justify-center text-center font-playfair text-5xl leading-tight sm:text-6xl lg:flex-row lg:gap-6">
            <span>{currentText.formTitle}</span>

            <span className="mt-3 text-primary lg:mt-0 lg:relative lg:top-1">
              <Send size={40} />
            </span>
          </h3>

          <div className="mx-auto mt-5 h-[2px] w-20 bg-primary" />

          <form
            ref={form}
            onSubmit={sendEmail}
            className="mt-10 rounded-2xl border border-primary/35 bg-black/50 p-6 backdrop-blur-md sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder={currentText.placeholders.name} className="contact-input" />
              <input name="email" required type="email" placeholder={currentText.placeholders.email} className="contact-input" />
            </div>

            <input name="subject" required placeholder={currentText.placeholders.subject} className="contact-input mt-4" />

            <textarea
              name="message"
              required
              placeholder={currentText.placeholders.message}
              rows="6"
              className="contact-input mt-4 resize-none"
            />

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-5 font-poppins text-base font-bold text-black transition hover:bg-primary/90"
            >
              {currentText.submit} <ArrowRight size={22} />
            </button>

            <p className="mt-5 flex items-center justify-center gap-2 font-poppins text-sm text-foreground/75">
              <Heart size={18} className="text-primary" />
              {status || currentText.defaultStatus}
            </p>
          </form>
        </motion.div>

        <div className="mt-16 text-center font-poppins text-base text-foreground/80">
          {currentText.directTextStart}{" "}
          <a href="tel:0367858241" className="font-bold text-primary underline">
            036-7858241
          </a>{" "}
          {currentText.directTextMiddle}{" "}
          <a href="mailto:info@mamarosa.nl" className="font-bold text-primary underline">
            info@mamarosa.nl
          </a>
        </div>
      </div>
    </section>
  );
}