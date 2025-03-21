'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Політика конфіденційності
          </h1>
          <div className="text-white space-y-8 text-lg md:text-xl">
            <p className="leading-relaxed">
                Конфіденційність користувачів нашого сайту є для нас пріоритетом і дуже важливою складовою. Ми прагнемо того, щоб ви при роботі з нашим сайтом  отримували тільки позитивні емоції і максимум корисної інформації, використовуючи всі можливості мережі Інтернет.
            </p>
            <p className="leading-relaxed">
                Конфіденційна інформація користувачів, зазначена при введенні реєстраційних даних (а також в інших випадках) зазвичай використовується для підбору Продуктів або Послуг відповідно до ваших потреб. Будь-яка особиста інформація не може бути передана будь-яким чином третім особам, крім випадків і в частині зазначених в &ldquo;Згоду з розсилкою&rdquo;.
            </p>
            <p className="leading-relaxed">
                На даному сайті може бути затребувана така інформація:
            </p>
            <p className="leading-relaxed">
                Ім&apos;я користувача та адресу електронної пошти, за згодою на розсилки, дана інформація може бути використана для відправки матеріалів і інформації запитаної вами розсилки на адресу зазначеного електронного ящика. Зазначені дані можуть бути передані третім особам, лише у випадках передбачених чинним законодавством.
            </p>
            <p className="leading-relaxed">
                За допомогою Cookies та інформації про відвідувачів збираються дані про дії аудиторії сайту і субдоменів для оптимізації його роботи, розширення функцій і створення більш змістовного наповнення і послуг для гостей і користувачів.
            </p>
            <p className="leading-relaxed">
                Якщо ви не хочете передавати Cookie на сторонній сервер, то для цього необхідно просто перейти в налаштування свого браузера і блокувати дані файли, встановивши прапорець у відповідному віконці, також в налаштуваннях можна задати параметри так щоб система кожен раз повідомляла про їх відправку. В такому випадку деякі можливості сайту можуть стати недоступними, або працювати неправильно.
            </p>
            <p className="leading-relaxed">
                Для забезпечення політики конфіденційності особистої інформації нами використовуються і постійно оновлюються програми для надійного захисту затребуваної інформації. Наш інтернет-ресурс постійно стежить за розвитком міжнародних вимог для контролю над довіреними даними, отриманими в мережі Інтернет. Ми неухильно дотримуємося всіх світових стандартів в забезпеченні збереження інформації, постійно навчаємо наших співробітників, і проводимо суворий моніторинг над виконанням всіх інструкцій і норм, а також обов&apos;язково доводимо до їх відомості Повідомлення про конфіденційність.
            </p>
            <p className="leading-relaxed">
                Однак, для ще більших гарантій безпеки інформації, ви самі, крім застосованих нами заходів щодо її забезпечення, повинні брати активну участь в її збереженні. Надані нами сервіси та сайти вже мають захист від витоку інформації, її незаконного використання або внесення будь-яких поправок до неї без вашої згоди. Однак, незважаючи на всі ці заходи, наш сайт не може гарантувати Вам 100% результат захисту ваших даних від зломів хакерами або шкідливими програмами.
            </p>
            <p className="leading-relaxed">
                При внесенні будь-яких змін або доповнень в політику конфіденційності, вони будуть опубліковані на цій сторінці і, де Ви зможете з ними ознайомитися. Або в деяких виняткових випадках ці зміни будуть Вам спрямовані листом на адресу вашої поштової скриньки, зазначеного при реєстрації.
            </p>

            <div className="my-16 p-8 bg-gray-800 rounded-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Згода з розсилками
              </h2>
              <p className="text-xl md:text-2xl mb-8">
                При заповненні форми нашого сайту Ви підтверджуєте вашу згоду з політикою конфіденційності нашої Компанії. Крім того, Ви підтверджуєте Вашу згоду на отримання нами права на обробку Ваших персональних даних при таких обставинах:
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <span className="text-cyan-400 mt-2">•</span>
                  <span className="flex-1">
                    Для компаній, які працюють від імені нашої Компанії: Ми можемо співпрацювати зі сторонніми компаніями, які можуть виконувати від нашого імені всі функції, що стосуються підтримки в бізнесі, в зв&apos;язку з цим Вашу особисту інформацію можуть частково розкрити. Таким компаніям, ми висуваємо жорсткі вимоги, в яких йдеться про те, що вони можуть використовувати Ваші особисті дані лише з метою, які обмежуються поданням договірних послуг; передача цієї інформації ними заборонена, в разі, якщо ситуація не підпадає під договірні вимоги, а саме, не є необхідною для того, щоб надати обумовлені послуги. Функції підтримки бізнесів можуть полягати: у видачі виграшів і бонусних призів, в реалізації поданих заявок, у виконанні замовлень, в управлінні системами інформації, а також у проведенні інтерв&apos;ювання наших контрагентів. Також, ми в обов&apos;язковому порядку розкриваємо інформацію (яка є неперсоніфікованою), коли підбираємо собі постачальників.
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-cyan-400 mt-2">•</span>
                  <span className="flex-1">
                    Для дочірніх і спільних підприємств: під такими підприємствами ми маємо на увазі організації, в яких пайова участь, більш ніж наполовину, належить нашій Компанії. Під час передачі Ваших даних партнерам по дочірнім, або ж спільним підприємствам, ми забороняємо нашим партнерам розголошувати Ваші особисті дані будь-яким сторонам з метою маркетингу, реклами, а також, ми забороняємо використовувати її будь-якими способами, які б суперечили Вашим рішенням. У разі якщо Ви відзначили, що не бажаєте, щоб на Ваше ім&apos;я приходили якісь рекламні або маркетингові матеріали з нашого боку, то наша Компанія зобов&apos;язується зберігати конфіденційність Вашої інформації, не передаючи її партнерам, для подальшого використання її в цілях маркетингу.
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-cyan-400 mt-2">•</span>
                  <span className="flex-1">
                    Для сторінок, які є партнерськими або спільно позиціонуються: Наша Компанія має право на передачу інформації своїм компаніям-партнерам, які спільно з нашою Компанією займається реалізацією спеціальних пропозицій і заходів, що стосуються просування певного товару на сторінках нашого ресурсу, які ми позиціонуємо спільно з даними партнерами. Якщо сторінка буде запитувати анкетні дані, то Вам в обов&apos;язковому порядку прийде попередження про те, що інформація може бути передана. У свою чергу, наші партнери мають право використовувати будь-яку інформацію, яку Ви надасте, відповідно до власного повідомленням про конфіденційність, яке буде представлено Вам для подальшого ознайомлення, при наданні Вами особистої інформації.
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-cyan-400 mt-2">•</span>
                  <span className="flex-1">
                    При процесі передачі над підприємством контролю: права на передачу Ваших анкетних даних, у разі продажу (часткової або повної) або трансферу активів нашого підприємства, або ж самого підприємства, залишаються за нашою Компанією. При процесі передачі над підприємством контролю ви отримаєте повідомлення від нашої Компанії, яке свідчить, що Ви можете відмовити в передачі Вашої особистої інформації. В окремих випадках, при вашу відмову на передачу особистих даних, Ви втрачаєте, можливості на отримання послуг або ж продуктів, які раніше вам надавала наша компанія, від нової організації.
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-cyan-400 mt-2">•</span>
                  <span className="flex-1">
                    Для правоохоронних органів: наша Компанія має право на розкриття Ваших особистих даних без Вашої згоди третій стороні в таких цілях: щоб уникнути правопорушення, судового клопотання або ж нормативно-правового акта; для надання сприяння урядовим розслідуванням; для зміцнення або захисту прав дочірніх підприємств нашої Компанії або самої Компанії; а також для надання допомоги в запобіганні шахрайства.
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-lg md:text-xl leading-relaxed">
                Ви можете в будь-який час здійснити відмову від прийому наших листів, поширення яких здійснюється нашою регулярної розсилкою. Здійснити цю процедуру Вам допоможе спеціальне посилання, яке Ви можете побачити при закінченні будь-якого нашого листа або написати нашому менеджеру у месенджері Telegram.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}