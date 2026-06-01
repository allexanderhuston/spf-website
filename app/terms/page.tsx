'use client';
import React, { useState } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const content = {
  en: {
    eyebrow: 'Legal',
    title: 'Terms & Conditions',
    meta: '22 & 23 August 2026 · Port Pomorie, Bulgaria',
    back: 'Back to site',
    brand: 'Sunset Port Festival® · 2026 · Port Pomorie, Bulgaria',
    sections: [
      {
        num: '1',
        title: 'General',
        items: [
          { type: 'p', text: 'By purchasing a ticket to Sunset Port Festival 2026, you confirm that you have read, understood and agreed to the following terms and conditions. Please read them carefully before attending the event.' },
        ],
      },
      {
        num: '2',
        title: 'Event Information',
        items: [
          { type: 'ul', list: [
            'The festival takes place on 22 and 23 August 2026 at Port Pomorie, Bulgaria.',
            'Gates open at 17:00 on both days.',
            'The event is held outdoors and will go ahead in all weather conditions, except in the event of a declared state of emergency or force majeure.',
            'The organiser reserves the right to change the programme, artists or set times without prior notice.',
          ]},
        ],
      },
      {
        num: '3',
        title: 'Tickets & Entry',
        items: [
          { type: 'ul', list: [
            'Tickets are available exclusively through sunsetfestival.bg and eventim.bg. The organiser accepts no responsibility for tickets purchased through unofficial resellers.',
            'Each ticket is valid only for the date it was purchased for and cannot be used on a different day.',
            'A valid ticket (digital or printed) or festival wristband is required for entry. Please keep your ticket or wristband with you throughout the event.',
            'Re-entry is not permitted once you leave the festival venue. Please make sure you have everything you need before entering Port Pomorie.',
            'The organiser reserves the right to refuse entry to anyone who violates the rules or behaves in an inappropriate manner.',
          ]},
        ],
      },
      {
        num: '4',
        title: 'Age Restrictions',
        items: [
          { type: 'ul', list: [
            'Day 1 (22.08) is open to guests aged 16 and over. Guests aged 16–17 must be accompanied by a parent or responsible adult who holds a notarised parental consent letter.',
            'Day 2 (23.08) is strictly 18+ with valid photo ID.',
            'Anyone unable to prove their age will be refused entry with no right to a refund.',
            'Alcoholic beverages are sold exclusively to guests aged 18 and over. Age verification may be carried out at all bars.',
          ]},
        ],
      },
      {
        num: '5',
        title: 'Tickets — Refunds & Transfers',
        items: [
          { type: 'ul', list: [
            'All ticket sales are final and non-refundable.',
            'In the event of cancellation for any reason, including force majeure, the organiser accepts no liability for refunding the ticket price or for any additional costs incurred by attendees, such as travel or accommodation.',
            'Tickets may be transferred to another person. The organiser is not party to any such transaction.',
            'We recommend purchasing event cancellation insurance to protect against unforeseen circumstances.',
          ]},
        ],
      },
      {
        num: '6',
        title: 'Behaviour & Safety',
        items: [
          { type: 'ul', list: [
            'All attendees must follow the instructions of security staff, medical personnel and organisers at all times.',
            'Aggressive, racist, discriminatory or disrespectful behaviour towards other attendees or staff is grounds for immediate removal from the venue with no right to a refund.',
            'The use of illegal substances is strictly prohibited and will be reported to the relevant authorities.',
            'A medical team and security personnel will be on site throughout the event.',
            'In the event of an emergency or incident, please contact festival staff immediately or make your way to the medical point.',
          ]},
        ],
      },
      {
        num: '7',
        title: 'Prohibited Items',
        items: [
          { type: 'p', text: 'The following items are not permitted on the festival site:' },
          { type: 'ul', list: [
            'Glass bottles and containers',
            'Outside food and drinks',
            'Alcohol',
            'Weapons and sharp objects',
            'Illegal substances',
            'Drones',
            'Professional cameras without accreditation',
            'Pyrotechnics, fireworks and lasers',
            'Large umbrellas, chairs and furniture',
            'Selfie sticks',
            'Any item deemed unsafe by security',
          ]},
          { type: 'p', text: 'The organiser reserves the right to confiscate prohibited items upon entry. Confiscated items will not be returned.' },
        ],
      },
      {
        num: '8',
        title: 'Permitted Items',
        items: [
          { type: 'p', text: 'The following items are permitted:' },
          { type: 'ul', list: [
            'National ID card / passport / driving licence',
            'Small bag or backpack',
            'Sunscreen and personal items',
            'Light jacket',
            'Mobile phone and compact camera',
            'Prescription medication (please carry your prescription with you)',
            'Bank card',
          ]},
        ],
      },
      {
        num: '9',
        title: 'Payments',
        items: [
          { type: 'ul', list: [
            'The festival is cashless. All bars and food vendors accept card payments only.',
            'Cash will not be accepted anywhere on the festival site.',
          ]},
        ],
      },
      {
        num: '10',
        title: 'Photography, Video & Media',
        items: [
          { type: 'ul', list: [
            'By entering Port Pomorie during Sunset Port Festival 2026, attendees consent to being photographed and filmed by the official festival photographers and videographers.',
            'This material may be used by the organiser for promotional purposes.',
            'Drones and professional cameras without accreditation are not permitted. For media accreditation, please contact: __link:mailto:hello@sunsetfestival.bg__hello@sunsetfestival.bg__.',
          ]},
        ],
      },
      {
        num: '11',
        title: 'Limitation of Liability',
        items: [
          { type: 'ul', list: [
            'The organiser accepts no responsibility for lost, stolen or damaged personal belongings during the event.',
            'The organiser accepts no liability for injuries or incidents resulting from failure to comply with safety rules or from the actions of third parties.',
            'Attendees are personally responsible for their own safety and for the safety of anyone in their care, including any minors they accompany.',
          ]},
        ],
      },
      {
        num: '12',
        title: 'Data Privacy',
        items: [
          { type: 'ul', list: [
            'Personal data provided at the time of ticket purchase is processed in accordance with the applicable laws of the Republic of Bulgaria and the General Data Protection Regulation (GDPR).',
            'Data is used solely for the purposes of the event and will not be shared with third parties without explicit consent.',
          ]},
        ],
      },
      {
        num: '13',
        title: 'Changes to These Terms',
        items: [
          { type: 'ul', list: [
            'The organiser reserves the right to update these terms and conditions. The most current version will always be available at sunsetfestival.bg.',
            'Continued attendance at the event following any changes to these terms constitutes acceptance of the updated conditions.',
          ]},
        ],
      },
      {
        num: '14',
        title: 'Contact',
        items: [
          { type: 'ul', list: [
            'Ticket enquiries: eventim.bg',
            'Media accreditation: hello@sunsetfestival.bg',
            'General enquiries: sunsetfestival.bg',
          ]},
        ],
      },
    ],
  },
  bg: {
    eyebrow: 'Правна информация',
    title: 'Общи условия',
    meta: '22 и 23 август 2026 · Пристанище Поморие, България',
    back: 'Към сайта',
    brand: 'Sunset Port Festival® · 2026 · Пристанище Поморие, България',
    sections: [
      {
        num: '1',
        title: 'Общи положения',
        items: [
          { type: 'p', text: 'С закупуването на билет за Sunset Port Festival 2026 потвърждавате, че сте прочели, разбрали и се съгласявате с следните общи условия. Моля, прочетете ги внимателно преди посещението на събитието.' },
        ],
      },
      {
        num: '2',
        title: 'Информация за събитието',
        items: [
          { type: 'ul', list: [
            'Фестивалът се провежда на 22 и 23 август 2026 г. в Пристанище Поморие, България.',
            'Вратите отварят в 17:00 ч. и двата дни.',
            'Събитието се провежда на открито и ще се осъществи при всякакви метеорологични условия, с изключение на обявено извънредно положение или форсмажорни обстоятелства.',
            'Организаторът си запазва правото да промени програмата, артистите или часовете без предварително уведомление.',
          ]},
        ],
      },
      {
        num: '3',
        title: 'Билети и вход',
        items: [
          { type: 'ul', list: [
            'Билетите се продават изключително чрез sunsetfestival.bg и eventim.bg. Организаторът не носи отговорност за билети, закупени от неофициални препродавачи.',
            'Всеки билет е валиден само за датата, за която е закупен, и не може да се използва в друг ден.',
            'За вход е необходим валиден билет (дигитален или хартиен) или фестивална гривна. Моля, пазете билета или гривната си по цялото времетраене на събитието.',
            'Повторното влизане не е разрешено след напускане на фестивалното пространство. Уверете се, че имате всичко необходимо, преди да влезете в Пристанище Поморие.',
            'Организаторът си запазва правото да откаже вход на всеки, който нарушава правилата или се държи неподходящо.',
          ]},
        ],
      },
      {
        num: '4',
        title: 'Възрастови ограничения',
        items: [
          { type: 'ul', list: [
            'Ден 1 (22.08) е отворен за гости на 16 и повече години. Гости на възраст 16–17 г. трябва да бъдат придружени от родител или отговорен възрастен, притежаващ нотариално заверено писмо за родителско съгласие.',
            'Ден 2 (23.08) е строго за лица над 18 г. с валиден документ за самоличност със снимка.',
            'Всеки, който не може да докаже възрастта си, ще бъде отказан на входа без право на възстановяване на средства.',
            'Алкохолни напитки се продават единствено на гости над 18 г. Проверка на възрастта може да се извършва на всички барове.',
          ]},
        ],
      },
      {
        num: '5',
        title: 'Билети — Възстановяване и прехвърляне',
        items: [
          { type: 'ul', list: [
            'Всички продажби на билети са окончателни и невъзстановими.',
            'При отмяна по каквато и да е причина, включително форсмажор, организаторът не носи отговорност за възстановяване на цената на билета или за допълнителни разходи, направени от посетителите, като пътуване или настаняване.',
            'Билетите могат да се прехвърлят на друго лице. Организаторът не е страна по подобна сделка.',
            'Препоръчваме закупуване на застраховка за отмяна на събитие като защита срещу непредвидени обстоятелства.',
          ]},
        ],
      },
      {
        num: '6',
        title: 'Поведение и безопасност',
        items: [
          { type: 'ul', list: [
            'Всички посетители трябва да следват инструкциите на охранителния персонал, медицинския персонал и организаторите по всяко време.',
            'Агресивното, расистко, дискриминационно или неуважително поведение към други посетители или персонал е основание за незабавно отстраняване от обекта без право на възстановяване на средства.',
            'Употребата на незаконни вещества е строго забранена и ще бъде докладвана на компетентните органи.',
            'По време на събитието ще присъстват медицински екип и охранителен персонал.',
            'При аварийна ситуация или инцидент, моля, свържете се незабавно с персонала на фестивала или се насочете към медицинския пункт.',
          ]},
        ],
      },
      {
        num: '7',
        title: 'Забранени предмети',
        items: [
          { type: 'p', text: 'Следните предмети не са разрешени на фестивалното пространство:' },
          { type: 'ul', list: [
            'Стъклени бутилки и съдове',
            'Храна и напитки отвън',
            'Алкохол',
            'Оръжия и остри предмети',
            'Незаконни вещества',
            'Дронове',
            'Професионални камери без акредитация',
            'Пиротехника, фойерверки и лазери',
            'Големи чадъри, столове и мебели',
            'Селфи стикове',
            'Всеки предмет, преценен като опасен от охраната',
          ]},
          { type: 'p', text: 'Организаторът си запазва правото да конфискува забранени предмети при входа. Конфискуваните предмети няма да бъдат върнати.' },
        ],
      },
      {
        num: '8',
        title: 'Разрешени предмети',
        items: [
          { type: 'p', text: 'Следните предмети са разрешени:' },
          { type: 'ul', list: [
            'Лична карта / паспорт / свидетелство за управление на МПС',
            'Малка чанта или раница',
            'Слънцезащитен крем и лични вещи',
            'Лека яке',
            'Мобилен телефон и компактна камера',
            'Предписани лекарства (моля, носете рецептата си)',
            'Банкова карта',
          ]},
        ],
      },
      {
        num: '9',
        title: 'Плащания',
        items: [
          { type: 'ul', list: [
            'Фестивалът е безкасов. Всички барове и доставчици на храна приемат само картови плащания.',
            'В брой няма да се приема никъде на фестивалното пространство.',
          ]},
        ],
      },
      {
        num: '10',
        title: 'Снимки, видео и медии',
        items: [
          { type: 'ul', list: [
            'С влизането в Пристанище Поморие по време на Sunset Port Festival 2026 посетителите дават съгласието си да бъдат снимани и заснемани от официалните фестивални фотографи и видеооператори.',
            'Този материал може да се използва от организатора за промоционални цели.',
            'Дронове и професионални камери без акредитация не са разрешени. За медийна акредитация, моля, свържете се с: __link:mailto:hello@sunsetfestival.bg__hello@sunsetfestival.bg__.',
          ]},
        ],
      },
      {
        num: '11',
        title: 'Ограничение на отговорността',
        items: [
          { type: 'ul', list: [
            'Организаторът не носи отговорност за изгубени, откраднати или повредени лични вещи по време на събитието.',
            'Организаторът не носи отговорност за наранявания или инциденти, произтичащи от неспазване на правилата за безопасност или от действия на трети страни.',
            'Посетителите носят лична отговорност за собствената си безопасност и за безопасността на всеки, за когото се грижат, включително непълнолетни лица, които придружават.',
          ]},
        ],
      },
      {
        num: '12',
        title: 'Защита на личните данни',
        items: [
          { type: 'ul', list: [
            'Личните данни, предоставени при закупуване на билет, се обработват в съответствие с приложимото законодателство на Република България и Общия регламент за защита на данните (GDPR).',
            'Данните се използват единствено за целите на събитието и няма да бъдат споделяни с трети страни без изрично съгласие.',
          ]},
        ],
      },
      {
        num: '13',
        title: 'Промени в условията',
        items: [
          { type: 'ul', list: [
            'Организаторът си запазва правото да актуализира настоящите общи условия. Най-актуалната версия винаги ще бъде достъпна на sunsetfestival.bg.',
            'Продължаването на посещението на събитието след промени в условията представлява приемане на актуализираните условия.',
          ]},
        ],
      },
      {
        num: '14',
        title: 'Контакт',
        items: [
          { type: 'ul', list: [
            'Запитвания за билети: eventim.bg',
            'Медийна акредитация: hello@sunsetfestival.bg',
            'Общи запитвания: sunsetfestival.bg',
          ]},
        ],
      },
    ],
  },
};

type Lang = 'en' | 'bg';

function renderText(text: string) {
  const linkRe = /__link:([^_]+)__([^_]+)__/g;
  const parts: React.ReactNode[] = [];
  let last = 0, match;
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(<a key={match.index} href={match[1]}>{match[2]}</a>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 1 ? <span>{parts}</span> : text;
}

export default function TermsPage() {
  const [lang, setLang] = useState<Lang>('en');
  const c = content[lang];

  return (
    <>
      <style>{`
        .terms-page {
          min-height: 100vh;
          background: var(--navy);
          color: var(--w);
          font-family: var(--fb);
          cursor: auto;
        }

        .terms-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 64px;
          padding: 0 clamp(20px, 5vw, 72px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(8, 11, 24, 0.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--bdr);
        }

        .terms-nav-logo img {
          height: 40px;
          width: auto;
          display: block;
        }

        .terms-nav-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .terms-lang-switch {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .terms-lang-label {
          font-family: var(--f);
          font-size: .44rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(232,229,222,.28);
          transition: color .25s;
          user-select: none;
          cursor: pointer;
        }

        .terms-lang-label.active { color: var(--gold); }

        .terms-lang-track {
          width: 44px;
          height: 26px;
          background: rgba(255,255,255,.08);
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: background .3s;
          border: 1px solid rgba(255,255,255,.25);
          flex-shrink: 0;
        }

        .terms-lang-track.bg-active {
          background: var(--gold);
          border-color: var(--gold);
        }

        .terms-lang-thumb {
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
          box-shadow: 0 2px 6px rgba(0,0,0,.5);
        }

        .terms-lang-thumb.on { transform: translateX(18px); }

        .terms-back {
          font-size: .6rem;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(232, 229, 222, .45);
          text-decoration: none;
          transition: color .2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .terms-back:hover { color: var(--gold); }

        .terms-back svg {
          width: 14px;
          height: 14px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .terms-wrap {
          max-width: 760px;
          margin: 0 auto;
          padding: clamp(48px, 8vh, 96px) clamp(20px, 5vw, 48px) 96px;
        }

        .terms-header {
          margin-bottom: 64px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--bdr);
        }

        .terms-eyebrow {
          font-size: .6rem;
          font-weight: 600;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-bottom: 18px;
        }

        .terms-title {
          font-family: var(--f);
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .02em;
          line-height: 1.05;
          color: var(--w);
          margin-bottom: 20px;
        }

        .terms-meta {
          font-size: .65rem;
          font-weight: 300;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(232, 229, 222, .35);
        }

        .terms-section {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 0 24px;
          padding: 36px 0;
          border-bottom: 1px solid var(--bdr);
        }

        .terms-num {
          font-family: var(--f);
          font-size: .72rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: .1em;
          padding-top: 3px;
          flex-shrink: 0;
        }

        .terms-section-title {
          font-family: var(--f);
          font-size: clamp(.85rem, 1.4vw, 1.05rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .08em;
          color: var(--w);
          margin-bottom: 14px;
        }

        .terms-body p {
          font-size: clamp(.72rem, 1.1vw, .82rem);
          font-weight: 300;
          line-height: 1.85;
          color: rgba(232, 229, 222, .6);
          margin-bottom: 12px;
        }

        .terms-body p:last-child { margin-bottom: 0; }

        .terms-body ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 12px;
        }

        .terms-body ul:last-child { margin-bottom: 0; }

        .terms-body ul li {
          font-size: clamp(.72rem, 1.1vw, .82rem);
          font-weight: 300;
          line-height: 1.75;
          color: rgba(232, 229, 222, .6);
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .terms-body ul li::before {
          content: '—';
          color: var(--gold);
          font-weight: 700;
          flex-shrink: 0;
          opacity: .7;
          margin-top: .05em;
        }

        .terms-body a {
          color: var(--gold);
          text-decoration: none;
          transition: opacity .2s;
        }

        .terms-body a:hover { opacity: .75; }

        .terms-footer {
          margin-top: 64px;
          padding-top: 40px;
          border-top: 1px solid var(--bdr);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }

        .terms-footer-brand {
          font-family: var(--f);
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: rgba(232, 229, 222, .22);
        }

        @media (max-width: 500px) {
          .terms-section {
            grid-template-columns: 1fr;
            gap: 8px 0;
          }
          .terms-num { font-size: .6rem; }
          .terms-back span { display: none; }
        }
      `}</style>

      <div className="terms-page">
        <nav className="terms-nav">
          <Link href="/" className="terms-nav-logo">
            <Image src="/assets/logo-icon.webp" alt="Sunset Port Festival" width={40} height={40} />
          </Link>

          <div className="terms-nav-right">
            <div className="terms-lang-switch">
              <span
                className={`terms-lang-label${lang === 'en' ? ' active' : ''}`}
                onClick={() => setLang('en')}
              >EN</span>

              <div
                className={`terms-lang-track${lang === 'bg' ? ' bg-active' : ''}`}
                role="switch"
                aria-checked={lang === 'bg'}
                onClick={() => setLang(lang === 'en' ? 'bg' : 'en')}
              >
                <div className={`terms-lang-thumb${lang === 'bg' ? ' on' : ''}`} />
              </div>

              <span
                className={`terms-lang-label${lang === 'bg' ? ' active' : ''}`}
                onClick={() => setLang('bg')}
              >BG</span>
            </div>

            <Link href="/" className="terms-back">
              <svg viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>{c.back}</span>
            </Link>
          </div>
        </nav>

        <main className="terms-wrap">
          <header className="terms-header">
            <span className="terms-eyebrow">{c.eyebrow}</span>
            <h1 className="terms-title">{c.title}</h1>
            <p className="terms-meta">{c.meta}</p>
          </header>

          {c.sections.map((s) => (
            <div key={s.num} className="terms-section">
              <span className="terms-num">{s.num}.</span>
              <div className="terms-body">
                <h2 className="terms-section-title">{s.title}</h2>
                {s.items.map((item, i) =>
                  item.type === 'p' ? (
                    <p key={i}>{item.text}</p>
                  ) : (
                    <ul key={i}>
                      {item.list!.map((li, j) => <li key={j}>{renderText(li)}</li>)}
                    </ul>
                  )
                )}
              </div>
            </div>
          ))}

          <footer className="terms-footer">
            <p className="terms-footer-brand">{c.brand}</p>
            <Link href="/" className="terms-back">
              <svg viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>{c.back}</span>
            </Link>
          </footer>
        </main>
      </div>
    </>
  );
}
