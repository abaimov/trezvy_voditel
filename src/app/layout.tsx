import type { Metadata } from "next";
import { PT_Sans_Caption } from "next/font/google";
import "./globals.css";
import StickyMenu from "@/app/Navbar";
import ContainerProvider from "@/app/ContainerProvider";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";

// Подключение шрифта PT Sans Caption
const sans_caption = PT_Sans_Caption({ subsets: ['cyrillic', 'latin'], weight: ['400', '700'] });

// Метаданные страницы
export const metadata: Metadata = {
    title: "🚗 Трезвый водитель Минск: Безопасное возвращение домой",
    description: "🌟 Ваш надежный партнер на дороге — Trezv 🚗. С нами вы всегда в безопасности, независимо от времени и места 🌃. Наши опытные водители гарантируют вам спокойствие и уверенность в том, что ваш путь домой будет таким же приятным, как и вечер 🏠.",
};

// Главный компонент макета
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={sans_caption.className}>
        {/* Google Analytics */}
        <GoogleAnalytics gaId="8008797785" />

        {/* Google Tag Manager (gtag.js) */}
        <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=UA-160659085-1"
        />
        <Script strategy="afterInteractive">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-160659085-1');
                    `}
        </Script>

        {/* Яндекс Метрика */}
        <Script id="yandex-metrika" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){
                            (m[i].a=m[i].a||[]).push(arguments)
                        }; 
                        m[i].l=1*new Date(); 
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                        k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                    
                    ym(97120978, "init", {
                        defer: true,
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true
                    });`}
        </Script>
        <noscript>
            <div>
                <img src="https://mc.yandex.ru/watch/97120978" style={{ position: "absolute", left: "-9999px" }} alt="ya_metrika" />
            </div>
        </noscript>

        {/* Data Traffic Guard */}
        <Script>
            {`var dataTrafficGuard = dataTrafficGuard || [];
                    dataTrafficGuard.push(['property', 'tg-013364-001']);
                    dataTrafficGuard.push(['event', 'pageview']);
                    (function() {
                        var tg = document.createElement('script'); 
                        tg.type = 'text/javascript'; 
                        tg.async = true; 
                        tg.src = '//tgtag.io/tg.js?pid=tg-013364-001';
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(tg, s);
                    })();`}
        </Script>

        {/* Основной контент приложения */}
        <ContainerProvider>
            <StickyMenu />
            {children}
            <div className="bg-black w-full flex flex-col">
               <div><a href={"/politica"}>Политика конфиденциальности</a></div> 
                <div>УНП 190010170</div> 
            </div>
        </ContainerProvider>
        </body>
        </html>
    );
}
