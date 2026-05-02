/**
 * locales/index.ts — aggregates all translation namespaces.
 * Statically imported so all translations are bundled with the client.
 * For LMP's site size (~17 namespaces) bundling is the correct tradeoff:
 * one extra ~50KB gzip bundle, zero runtime fetch latency on locale switch.
 *
 * Bilingual Copy Rule (CLAUDE.md): every key in en/<namespace>.json must
 * have a matching key path in es/<namespace>.json. Pre-launch-auditor enforces.
 */

import enCommon from './en/common.json';
import enHome from './en/home.json';
import enServices from './en/services.json';
import enTeam from './en/team.json';
import enPartners from './en/partners.json';
import enCareers from './en/careers.json';
import enStates from './en/states.json';
import enCalculators from './en/calculators.json';
import enQuiz from './en/quiz.json';
import enTestimonials from './en/testimonials.json';
import enBlog from './en/blog.json';
import enFaq from './en/faq.json';
import enContact from './en/contact.json';
import enBooking from './en/booking.json';
import enAccount from './en/account.json';
import enCompliance from './en/compliance.json';
import enPricing from './en/pricing.json';

import esCommon from './es/common.json';
import esHome from './es/home.json';
import esServices from './es/services.json';
import esTeam from './es/team.json';
import esPartners from './es/partners.json';
import esCareers from './es/careers.json';
import esStates from './es/states.json';
import esCalculators from './es/calculators.json';
import esQuiz from './es/quiz.json';
import esTestimonials from './es/testimonials.json';
import esBlog from './es/blog.json';
import esFaq from './es/faq.json';
import esContact from './es/contact.json';
import esBooking from './es/booking.json';
import esAccount from './es/account.json';
import esCompliance from './es/compliance.json';
import esPricing from './es/pricing.json';

const en = {
  common: enCommon,
  home: enHome,
  services: enServices,
  team: enTeam,
  partners: enPartners,
  careers: enCareers,
  states: enStates,
  calculators: enCalculators,
  quiz: enQuiz,
  testimonials: enTestimonials,
  blog: enBlog,
  faq: enFaq,
  contact: enContact,
  booking: enBooking,
  account: enAccount,
  compliance: enCompliance,
  pricing: enPricing,
};

const es = {
  common: esCommon,
  home: esHome,
  services: esServices,
  team: esTeam,
  partners: esPartners,
  careers: esCareers,
  states: esStates,
  calculators: esCalculators,
  quiz: esQuiz,
  testimonials: esTestimonials,
  blog: esBlog,
  faq: esFaq,
  contact: esContact,
  booking: esBooking,
  account: esAccount,
  compliance: esCompliance,
  pricing: esPricing,
};

export const translations = { en, es } as const;

export type Translations = typeof en;
