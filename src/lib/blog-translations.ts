/**
 * blog-translations.ts — hand-curated ES translations for blog posts.
 *
 * Sanity schema is not migrated to native i18n (deferred to Phase 2 per plan).
 * For now, English is canonical in Sanity (and in seed-posts.json fallback);
 * ES translations live here keyed by post `_id`. The merge function in
 * `src/sanity/lib/posts.ts` swaps title/excerpt/body when locale === 'es'
 * AND a translation exists. If missing, falls back to English with the
 * `t('untranslatedNote')` badge rendered by the page component.
 *
 * Pattern ported from Sylvia Rich Hungarian Consul (HU translation layer).
 *
 * COMPLIANCE-REVIEW-PENDING: All ES translations below are AI-demo copy.
 * Mortgage broker advertising in Spanish must be reviewed by the LMP
 * compliance IT firm before publish — state advertising rules apply per
 * state (MA, NH, ME, RI, CT, FL, CO, VT, TX). Quantitative claims (rate
 * deltas, dollar figures, MIP percentages, Polygon Research $10,662
 * lifetime savings figure) are carried over verbatim from the EN copy
 * and must be re-substantiated against the same sources.
 *
 * Voice: Castellano-neutral Spanish, "usted" register, no em dashes.
 * Match LMP voice anchor — warm, professional, mortgage-broker-appropriate.
 */

import type { BlockContent } from '@/sanity/queries';

export interface BlogTranslation {
  title: string;
  excerpt: string;
  body: BlockContent[];
}

/**
 * Keyed by Sanity post `_id` (also matches the `_id` in seed-posts.json
 * fallback). Add new translations as Spanish-priority articles ship.
 */
export const blogTranslations: Record<string, { es: BlogTranslation }> = {
  // ----------------------------------------------------------------
  // 1. FHA vs Conventional in NH
  //    Selected per CLAUDE.md AEO target list (loan-program comparison).
  // ----------------------------------------------------------------
  'post-fha-vs-conventional-nh': {
    es: {
      title: 'FHA frente a Convencional en NH: cuándo el 3.5% inicial supera al 5%',
      excerpt:
        'Mismo comprador, dos programas, lado a lado. Lo que realmente cuesta FHA después del MIP, cuándo Convencional 97 gana en tasa, y la matemática de mudanza en New Hampshire que nadie hace en la mesa de la cocina.',
      body: [
        {
          type: 'paragraph',
          text: 'Recibimos esta pregunta cada semana de compradores en Manchester, Salem y Concord. La cuota inicial de FHA es del 3.5%. La cuota inicial de Convencional 97 es del 3%. Entonces gana Convencional, ¿verdad? No tan rápido.',
        },
        {
          type: 'paragraph',
          text: 'La cuota inicial es un solo número. La imagen completa son cuatro: cuota inicial, seguro hipotecario, tasa de interés y el piso del puntaje crediticio. Equivóquese en cualquiera de los cuatro y lo paga cada mes durante años. Por eso los corremos los cuatro siempre.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'El piso de FICO es la primera puerta',
        },
        {
          type: 'paragraph',
          text: 'FHA acepta puntajes FICO hasta 580 con 3.5% inicial, y algunos prestamistas llegan a 500 con 10% inicial. Convencional 97 comienza en 620 en la mayoría de los casos, y los recargos de tasa suben fuerte por debajo de 680. Si su crédito está entre 580 y 640, FHA suele ser la única puerta abierta. Si está en 740 o más, Convencional casi siempre gana en tasa.',
        },
        {
          type: 'paragraph',
          text: 'La banda intermedia, de 660 a 720, es donde vive la verdadera comparación. Ahí nos sentamos a correr ambas opciones sobre la misma propiedad y dejamos que los números decidan.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Seguro hipotecario: la línea que nadie le explica',
        },
        {
          type: 'paragraph',
          text: 'FHA tiene dos MIPs. Uno inicial del 1.75% que se incorpora al préstamo, más el MIP anual que permanece durante toda la vida del préstamo, salvo que ponga 10% inicial. Convencional tiene PMI que usted puede eliminar al alcanzar 20% de plusvalía, a menudo en cinco a siete años con un calendario de pagos normal.',
        },
        {
          type: 'paragraph',
          text: 'En una vivienda de $400,000 en Salem con 3.5% inicial FHA, el MIP inicial agrega aproximadamente $6,755 al saldo del préstamo. El MIP anual del 0.55% sobre un préstamo a 30 años son cerca de $176 al mes, para siempre. Eso es dinero real.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Cuándo gana FHA',
        },
        {
          type: 'paragraph',
          text: 'FHA gana para tres compradores que vemos constantemente:',
        },
        {
          type: 'list',
          items: [
            'Crédito entre 580 y 640. Los recargos de tasa de Convencional se comen viva cualquier ventaja en la cuota inicial.',
            'DTI por encima del 45%. FHA estira más en la relación deuda-ingreso con suscripción manual.',
            'Compradores que planean refinanciar dentro de cinco años. El problema del MIP de por vida se disuelve al refinanciar, y los refinanciamientos streamline de FHA son rápidos y baratos.',
          ],
        },
        {
          type: 'heading',
          level: 2,
          text: 'Cuándo gana Convencional 97',
        },
        {
          type: 'paragraph',
          text: 'Convencional gana para el comprador con buen crédito, ingresos estables y una propiedad donde planea quedarse. El 0.5% menor en la cuota inicial importa menos que eliminar el PMI en el año cinco y bloquear una tasa más baja desde el primer día. Sobre una tenencia de 10 años en Manchester, la diferencia puede ser de $20,000 a $35,000.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Cómo se ve esto en números reales',
        },
        {
          type: 'paragraph',
          text: 'Mismo comprador. $400,000 unifamiliar en Concord. FICO de 720. Ingreso de $90,000. Ambas opciones corridas, mismo prestamista, mismo día. El pago FHA queda $312 más alto al mes que Convencional 97 una vez factorizado el MIP. Eso son $3,744 al año, o $37,440 a lo largo de la primera década. Convencional gana para este comprador. Llamada fácil.',
        },
        {
          type: 'paragraph',
          text: 'Baje al mismo comprador a un FICO de 640 y Convencional 97 desaparece. Los recargos de tasa empujan el pago mensual $190 por encima de FHA. Ahora gana FHA. Misma propiedad, mismo comprador, distinto crédito, distinta respuesta.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Cómo lo corremos para usted',
        },
        {
          type: 'paragraph',
          text: 'Quince minutos en una llamada. Hacemos una verificación de crédito blanda (sin impacto en su puntaje), tomamos la estimación de impuestos a la propiedad y seguro, y corremos ambos programas lado a lado. Usted ve el pago mensual, el efectivo al cierre y el costo de por vida en cada uno. Después usted elige. Nosotros no elegimos por usted.',
        },
      ],
    },
  },

  // ----------------------------------------------------------------
  // 2. UWM Wholesale Explained
  //    Selected per CLAUDE.md AEO target list (wholesale-broker model).
  // ----------------------------------------------------------------
  'post-uwm-wholesale-explained': {
    es: {
      title: 'UWM Wholesale, explicado: por qué importa que no seamos el banco',
      excerpt:
        'United Wholesale Mortgage es el prestamista mayorista más grande del país, y nosotros no somos su empleado. Somos su broker. Esa distinción aparece en su tasa, en su tiempo de cierre, y en cómo se maneja su archivo cuando algo se complica.',
      body: [
        {
          type: 'paragraph',
          text: 'Cuando los compradores escuchan mencionar a UWM en una llamada de descubrimiento, la siguiente pregunta es siempre la misma. ¿Es ese el banco para el que ustedes trabajan? No. UWM es United Wholesale Mortgage, el prestamista mayorista más grande de los Estados Unidos, y nosotros somos uno de los miles de brokers independientes que cada día cotizamos su tasa junto con la de otros treinta prestamistas mayoristas.',
        },
        {
          type: 'paragraph',
          text: 'Esa distinción no es un tecnicismo. Es la razón completa por la cual un comprador entra a LMP en lugar de a una sucursal bancaria. Así que repasemos qué significa realmente "mayorista", por qué UWM en particular importa, y dónde aterriza la matemática para el prestatario.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Mayorista, en lenguaje sencillo',
        },
        {
          type: 'paragraph',
          text: 'El crédito hipotecario minorista es lo que ocurre cuando usted llama a su banco. El oficial de préstamos sentado frente a usted trabaja para ese banco, fija el precio de los préstamos con la única hoja de tasas de ese banco, y suscribe contra el único conjunto de pautas de ese banco. Una puerta. Una respuesta.',
        },
        {
          type: 'paragraph',
          text: 'El mayorista es el lado de la industria construido para los brokers. Los prestamistas mayoristas publican hojas de tasas diarias a brokers como LMP. Nosotros corremos un solo archivo del prestatario por varios prestamistas mayoristas, encontramos al prestamista con el mejor calce en tasa, pautas y tiempo de cierre, y bloqueamos ahí. El prestatario recibe al prestamista mejor adecuado a su archivo. No al que estamos atados.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Por qué UWM es el mayorista más grande',
        },
        {
          type: 'paragraph',
          text: 'UWM ha sido el mayorista número uno del país durante varios años seguidos, por volumen reportado en HMDA. La escala es real. Su pila tecnológica, en particular EASE y BOLT, permite a un broker enviar un archivo, obtener una aprobación automatizada y pedir un avalúo en minutos. Su equipo de suscripción está dimensionado para mantener tiempos de cierre competitivos incluso durante temporadas de refinanciamiento intensas.',
        },
        {
          type: 'paragraph',
          text: 'La escala importa porque comprime los precios. Un prestamista mayorista que origina decenas de miles de millones en volumen anual puede publicar tasas por debajo de lo que la mayoría de los bancos minoristas pueden igualar. Ese diferencial es la razón completa por la cual existe el canal mayorista.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Qué significa esto para su archivo',
        },
        {
          type: 'paragraph',
          text: 'Tres cosas suceden cuando LMP corre su archivo a través de UWM que no suceden en un banco minorista:',
        },
        {
          type: 'list',
          items: [
            'Usted ve una tasa mayorista, a menudo por debajo de la tasa minorista que UWM mismo cotizaría a un prestatario que entra directamente. El ahorro fluye hacia usted, no a la división de comisión de un oficial de préstamos minorista.',
            'Usted obtiene tiempos de cierre rápidos. La suscripción tecnológica de UWM se ubica entre las más rápidas de la industria, lo cual importa cuando usted está corriendo para cerrar una oferta competitiva.',
            'Usted obtiene a un humano real en LMP que maneja el archivo, no una cola de centro de llamadas. UWM es la fuente del préstamo; nosotros somos la fuente de la relación.',
          ],
        },
        {
          type: 'heading',
          level: 2,
          text: 'La cifra de ahorro que sigue viendo',
        },
        {
          type: 'paragraph',
          text: 'Polygon Research analizó datos HMDA de 2023 y reportó que los prestatarios que usaron el canal mayorista de brokers ahorraron un promedio de $10,662 sobre la vida del préstamo en comparación con el canal minorista. Esa cifra es un promedio del canal de brokers, no específicamente de UWM ni específicamente de LMP. Algunos prestatarios ahorran más, algunos menos, unos pocos quedan parejos. El principio es consistente: más prestamistas compitiendo por su archivo le gana a un solo prestamista que lo da por sentado.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Cuándo UWM no es la opción correcta',
        },
        {
          type: 'paragraph',
          text: 'UWM es excelente en la mayoría de los archivos de agencia (Convencional, FHA, VA, USDA), la mayoría de los archivos jumbo, y la mayoría de los refinanciamientos estándar. No siempre son la respuesta correcta. Préstamos de estados de cuenta bancarios para prestatarios autoempleados, préstamos ITIN, préstamos DSCR para inversión, y ciertos escenarios non-QM a menudo tienen mejor precio en prestamistas mayoristas de nicho que se especializan en esos productos. Conocemos la banca. Elegimos al prestamista que calza con el archivo, no al prestamista del que tenemos un afiche en la pared.',
        },
        {
          type: 'paragraph',
          text: 'Esa es la diferencia entre un oficial de préstamos minorista cautivo y un broker independiente. El oficial minorista tiene una hoja de tasas. Nosotros tenemos más de treinta, y UWM es una de ellas, la más fuerte para la mayoría de los archivos pero nunca la única que corremos.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Cómo empezar con nosotros',
        },
        {
          type: 'paragraph',
          text: 'Quince minutos en una llamada, una verificación blanda de crédito (sin impacto en su puntaje), y corremos su archivo por los prestamistas mayoristas que calzan, incluido UWM. Usted ve estimaciones reales de préstamo, lado a lado. Usted elige. Nosotros no elegimos por usted.',
        },
      ],
    },
  },

  // ----------------------------------------------------------------
  // 3. Rate Shopping Guide for First-Time Buyers
  //    Selected per CLAUDE.md AEO target list (rate-shopping primer).
  // ----------------------------------------------------------------
  'post-rate-shopping-guide-first-time-buyers': {
    es: {
      title: 'Comparar tasas para compradores primerizos: qué se bloquea, cuándo y por qué',
      excerpt:
        'La mayoría de los compradores primerizos no comparan su hipoteca. Reciben una sola cotización, firman, y esperan. Esto es lo que todo prestatario debería saber sobre las ventanas de verificación de crédito, los bloqueos de tasa, las opciones de float-down, y el shock de la tarifa de bloqueo que sorprende a los compradores.',
      body: [
        {
          type: 'paragraph',
          text: 'Esta es la verdad sobre comparar tasas para compradores primerizos. La mayoría no lo hace. Reciben una cotización del banco donde tienen su cuenta corriente, firman, y esperan. Después se preguntan, seis meses más tarde, por qué su amigo del trabajo tiene un pago $200 más bajo en una casa similar. El amigo comparó. Ellos no.',
        },
        {
          type: 'paragraph',
          text: 'Tres mitos impiden que los compradores primerizos comparen: que múltiples verificaciones de crédito dañan su puntaje, que todos los prestamistas cotizan la misma tasa, y que bloquear la tasa es algo que el prestamista hace por usted automáticamente. Nada de eso es cierto. Repasemos qué ocurre realmente cuando compara una hipoteca.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'La ventana de verificación de crédito, explicada',
        },
        {
          type: 'paragraph',
          text: 'FICO y VantageScore tienen una regla especial para comparar hipotecas. Múltiples consultas hipotecarias de crédito dentro de una ventana corta cuentan como una sola consulta para efectos del puntaje. La ventana varía por modelo de puntuación, generalmente de 14 a 45 días dependiendo de la versión de FICO que se utilice.',
        },
        {
          type: 'paragraph',
          text: 'Regla práctica: obtenga todas sus cotizaciones hipotecarias dentro de una ventana de dos semanas y su puntaje crediticio recibe un solo impacto, no cinco. Comparar no castiga su crédito. No comparar castiga su billetera durante los próximos treinta años.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Precalificación, preaprobación y estimación de préstamo',
        },
        {
          type: 'paragraph',
          text: 'Estas tres palabras se usan indistintamente. No son lo mismo.',
        },
        {
          type: 'list',
          items: [
            'Precalificación es una verificación blanda, a menudo basada en información declarada. Útil como primer paso pero no permite bloquear una tasa.',
            'Preaprobación incluye una verificación real de crédito, revisión de documentación de ingresos, y una evaluación preliminar del suscriptor. Carta más fuerte, número real.',
            'Estimación de préstamo es la divulgación formal de tres páginas requerida por ley federal dentro de tres días hábiles tras una solicitud completa. Es el documento de comparación de manzanas con manzanas. Si quiere comparar prestamistas, compare estimaciones de préstamo, no cartas de precalificación.',
          ],
        },
        {
          type: 'heading',
          level: 2,
          text: 'Cuándo puede realmente bloquear',
        },
        {
          type: 'paragraph',
          text: 'No puede bloquear una tasa en la etapa de precalificación. Tampoco puede bloquear en la etapa de preaprobación. Usted bloquea una vez que tiene una oferta aceptada sobre una propiedad específica y se envía una solicitud completa. Hasta entonces, lo que tiene es una tasa cotizada, que se mueve con el mercado cada día hábil.',
        },
        {
          type: 'paragraph',
          text: 'Los bloqueos de tasa vienen en ventanas estándar: 15 días, 30 días, 45 días, 60 días. Los bloqueos más largos cuestan más. El prestamista incorpora el período de bloqueo en la tasa o en las tarifas. Un bloqueo de 45 días puede ser 0.125% más alto que un bloqueo de 30 días sobre el mismo préstamo, mismo prestamista, mismo día.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Float-down, en lenguaje sencillo',
        },
        {
          type: 'paragraph',
          text: 'Una opción de float-down le permite bloquear una tasa ahora y ajustarla a la baja una vez durante el período de bloqueo si las tasas caen materialmente. No todos los prestamistas la ofrecen. Los que sí lo hacen suelen cobrar una pequeña tarifa o una tasa inicial ligeramente más alta. Para un comprador que bloquea en un entorno de tasas a la baja, el float-down puede valer dinero real. En un entorno plano o al alza, es presupuesto desperdiciado.',
        },
        {
          type: 'paragraph',
          text: 'Pregunte a cualquier prestamista que le cotice si el float-down está incluido, cuál es el umbral de activación, y cuánto cuesta. La respuesta le dice mucho sobre con quién está tratando.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'El shock de la tarifa de bloqueo y otras trampas',
        },
        {
          type: 'paragraph',
          text: 'Dos trampas tropiezan a los compradores primerizos más que cualquier otra. Primero, el bloqueo expirado. Si su cierre se desliza más allá de la fecha de expiración del bloqueo (demoras de inspección, atrasos de avalúo, problemas de título), el prestamista extenderá el bloqueo por una tarifa, típicamente del 0.125% al 0.25% del monto del préstamo. En un préstamo de $400,000, eso son entre $500 y $1,000 de costo no presupuestado. Construya un margen en el período de bloqueo; no bloquee 30 días si sabe que inspección más avalúo más título suele tomar 35.',
        },
        {
          type: 'paragraph',
          text: 'Segundo, la cotización gancho. Algunos prestamistas cotizan una tasa de carnada para ganar el archivo, y luego la suben en suscripción bajo el pretexto de cambios de pautas o problemas de condición de la propiedad. La solución es la estimación de préstamo. Los números en una LE correctamente emitida son los que usted cierra, salvo ajustes normales de terceros.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Cómo compara LMP',
        },
        {
          type: 'paragraph',
          text: 'Sacamos crédito una vez, construimos el archivo una vez, y lo corremos por los prestamistas mayoristas que calzan. Usted ve estimaciones reales de préstamo de prestamistas reales, lado a lado. Le decimos qué prestamista recomendamos y por qué. Usted elige. Si quiere tomar nuestra cotización y compararla con otro banco minorista, lo alentamos. La confianza en la respuesta es el punto completo.',
        },
      ],
    },
  },
};

import type { Locale } from '@/lib/i18n';

/**
 * Merge a translated body onto an English post if available.
 *
 * Lookup key: post `_id` (stable across both Sanity and seed-posts.json).
 * Falls back to slug if `_id` is somehow absent.
 *
 * - locale === 'en' → returns post unchanged
 * - locale === 'es' && translation exists → swaps title, excerpt, body
 * - locale === 'es' && translation missing → returns post unchanged
 *   (page component renders untranslatedNote badge from blog.json)
 * - locale === 'pt' → returns post unchanged ALWAYS (full PT body translations
 *   are deferred to Phase 2 per CLAUDE.md Bilingual Copy Rule scope-expansion;
 *   the page component renders "Disponível em breve em português" note from
 *   pt/blog.json untranslatedNote)
 */
export function applyBlogTranslation<
  T extends {
    _id?: string;
    slug?: string;
    title: string;
    excerpt?: string;
    body?: BlockContent[];
  },
>(post: T, locale: Locale): T {
  if (locale === 'en' || locale === 'pt') return post;
  // locale === 'es'
  const key = post._id ?? post.slug;
  if (!key) return post;
  const translation = blogTranslations[key]?.es;
  if (!translation) return post;
  return {
    ...post,
    title: translation.title,
    excerpt: translation.excerpt,
    body: translation.body,
  };
}
