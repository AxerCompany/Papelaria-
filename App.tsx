
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  CheckCircle2, 
  Smartphone, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Layers, 
  Zap, 
  Printer, 
  Gift, 
  FileText, 
  Award, 
  AlertCircle, 
  Quote, 
  Clock, 
  Unlock, 
  CreditCard, 
  MessageCircle,
  TrendingUp,
  Play
} from 'lucide-react';

// --- Helper Functions ---

const getEmbedUrl = (url: string) => {
  if (!url) return '';
  
  // Handle Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1].split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }

  // Handle YouTube
  let videoId = '';
  if (url.includes('/shorts/')) {
    videoId = url.split('/shorts/')[1].split('?')[0];
  } else if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('/embed/')) {
    return url;
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

// --- Reusable Components ---

const ScarcityNotification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('Mariana');
  const names = ['Ana Paula', 'Julia S.', 'Renata M.', 'Cláudia', 'Beatriz', 'Fernanda R.', 'Carla T.', 'Priscila'];

  useEffect(() => {
    const show = () => {
      setName(names[Math.floor(names.length * Math.random())]);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const interval = setInterval(show, 15000);
    const timeout = setTimeout(show, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`fixed bottom-6 left-6 z-[100] transition-all duration-700 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 p-4 rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <p className="text-slate-900 text-xs font-bold leading-tight">{name} acabou de garantir o acesso!</p>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black mt-1">Pagamento Confirmado</p>
        </div>
      </div>
    </div>
  );
};

interface CustomVideoPlayerProps {
  posterUrl: string;
  videoUrl?: string; 
  label?: string;
  isVertical?: boolean;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ posterUrl, videoUrl, label, isVertical = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = useMemo(() => videoUrl ? getEmbedUrl(videoUrl) : '', [videoUrl]);

  const finalIframeSrc = useMemo(() => {
    if (!embedUrl) return '';
    if (embedUrl.includes('vimeo.com')) {
      // muted=0 for sound, autoplay=1 to start immediately after click interaction
      return `${embedUrl}?autoplay=1&muted=0&badge=0&autopause=0&player_id=0&app_id=58479`;
    }
    // mute=0 for sound on YouTube
    return `${embedUrl}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1`;
  }, [embedUrl]);

  return (
    <div 
      className={`w-full ${isVertical ? 'aspect-[9/16] max-w-[320px] mx-auto' : 'aspect-video'} rounded-[2.5rem] overflow-hidden relative shadow-2xl group cursor-pointer border-4 border-white/10 hover:border-pink-600/50 transition-all duration-500 bg-slate-900`}
      onClick={() => embedUrl && setIsPlaying(true)}
    >
      {!isPlaying ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-100 transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: `url('${posterUrl}')` }}
          />
          {/* Overlay sutil apenas para destacar o botão de play */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-pink-600/60 transform group-hover:scale-125 transition-transform duration-300 mb-6 border-4 border-white/20">
              <Play size={32} fill="currentColor" className="ml-1" />
            </div>
            {label && (
              <div className="bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 transform group-hover:-translate-y-1 transition-transform">
                <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-black">
           <iframe 
             className="w-full h-full"
             src={finalIframeSrc}
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             allowFullScreen
             frameBorder="0"
           />
        </div>
      )}
    </div>
  );
};

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: string;
  maxWidth?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, aspectRatio = "aspect-square", maxWidth = "max-w-lg" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={`relative w-full ${maxWidth} mx-auto group`}>
      <div 
        className={`overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white bg-white ${aspectRatio}`}
        onTouchStart={(e) => touchStart.current = e.touches[0].clientX}
        onTouchEnd={(e) => {
          if (!touchStart.current) return;
          const deltaX = touchStart.current - e.changedTouches[0].clientX;
          if (deltaX > 50) next();
          if (deltaX < -50) prev();
          touchStart.current = null;
        }}
      >
        <div 
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <img 
              key={i} 
              src={img} 
              alt={`Slide ${i}`} 
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <button 
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-pink-600 hover:text-white z-10"
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-pink-600 hover:text-white z-10"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-1.5 mt-4">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all ${currentIndex === i ? 'w-6 bg-pink-600' : 'w-1.5 bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Page Sections ---

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">
      <span className="text-slate-900 font-black text-xl tracking-tighter uppercase italic">PAPELARIA<span className="text-pink-600">DESCOMPLICADA</span></span>
    </div>
  </nav>
);

const Hero: React.FC = () => (
  <section className="pt-32 pb-24 px-6 bg-slate-950 text-white flex flex-col items-center text-center relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-pink-600/5 blur-[120px] rounded-full -z-10" />
    
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-5 py-2 bg-pink-600/10 text-pink-400 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-10 border border-pink-500/20 shadow-xl">
        <AlertCircle size={14} /> OPORTUNIDADE ÚNICA DE RENDA EXTRA
      </div>
      
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8 leading-[1.2] tracking-tight uppercase max-w-4xl mx-auto">
        Ganhe até <span className="text-pink-500">R$ 1.000,00 por semana</span> com papelaria personalizada — mesmo sem impressora e começando do zero.
      </h1>
      
      <p className="text-sm md:text-base text-slate-400 mb-12 font-medium max-w-xl mx-auto leading-relaxed">
        Com um app simples e intuitivo, você escolhe e baixa moldes de festas infantis prontos para vender — sem precisar de experiência ou maquinário caro. Tudo em PDF.
      </p>

      {/* Mini VSL */}
      <div className="w-full max-w-3xl mb-14">
        <CustomVideoPlayer 
          posterUrl="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=1200&h=675"
          label="Assistir: O segredo do App em 30 segundos"
          videoUrl="https://vimeo.com/1161223581"
          isVertical={true}
        />
      </div>
    </div>
  </section>
);

const Features: React.FC = () => {
  const images = [
    "https://i.postimg.cc/sX0hqL2w/1.webp",
    "https://i.postimg.cc/C16qX2KN/2.webp",
    "https://i.postimg.cc/B6wKkzvx/3.webp",
    "https://i.postimg.cc/xCFzhZdC/4.webp",
    "https://i.postimg.cc/MTrQNLGX/5.webp",
    "https://i.postimg.cc/FRnL86KY/6.webp",
    "https://i.postimg.cc/wvbmZrB7/7.webp"
  ];

  return (
    <section className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-pink-600 font-black text-[11px] uppercase tracking-[0.4em] mb-4">TECNOLOGIA EXCLUSIVA</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 uppercase tracking-tighter italic">O SEU ATELIÊ NA PALMA DA MÃO</h2>
          <p className="text-slate-500 text-sm font-medium max-w-2xl mx-auto mb-12">Esqueça programas complexos como Silhouette Studio ou Photoshop. Nosso app foi desenhado para você escolher, personalizar e vender em minutos, baixando tudo em PDF direto do aplicativo.</p>
        </div>

        {/* Carrossel em formato de tela de celular 9:16 (vertical para celular) */}
        <div className="mb-20">
          <ImageCarousel 
            images={images} 
            aspectRatio="aspect-[9/16]" 
            maxWidth="max-w-[320px]" 
          />
        </div>

        <div className="space-y-16">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight text-center mb-12 italic">O QUE VOCÊ PODE FAZER:</h3>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Layers size={28} />, title: "Moldes Prontos para Festas", desc: "Acesse temas populares como Unicórnio, Safari, Patrulha Canina e muito mais." },
              { icon: <Zap size={28} />, title: "Kits Completos", desc: "Caixinhas (milk, bala, coração, pirâmide), toppers e tags em um só lugar." },
              { icon: <Printer size={28} />, title: "Download Exclusivo em PDF", desc: "Arquivos prontos para baixar em alta resolução. Basta imprimir e vender." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-slate-950 rounded-[2rem] flex items-center justify-center text-pink-500 mb-8 group-hover:bg-pink-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 uppercase tracking-tight mb-3 group-hover:text-pink-600 transition-colors">{item.title}</h4>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed px-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Results: React.FC = () => {
  const resultImages = useMemo(() => {
    const images = [
      "https://i.postimg.cc/tgGJZj1G/1e57389d_217e_41e4_a8e3_bead9a84eaa6.webp",
      "https://i.postimg.cc/KY7ztHTC/333203f3_dfd4_4d9a_9087_62f91ccb319a_(1).webp",
      "https://i.postimg.cc/Gpnt8CBr/4da582fb_5d1a_472f_ba2f_90c3a83d184a.webp",
      "https://i.postimg.cc/0NGQ7Bm2/593081dc_f7fe_48d8_961e_edeb2a3bc6fe.webp",
      "https://i.postimg.cc/hG8jV5m6/6ced12d9_8bc2_43cc_a7fe_91a6c8948348.webp",
      "https://i.postimg.cc/GpP2v5Yn/7cae4025_59a4_44fd_82a2_78fb24fa64c3.webp",
      "https://i.postimg.cc/nLKzqP7F/ARQUIVO.webp",
      "https://i.postimg.cc/sXV2m49Y/FOTO_(6).webp",
      "https://i.postimg.cc/V6YNgWBb/Whats_App_Image_2020_10_08_at_13_17_11.webp",
      "https://i.postimg.cc/SsyKdf79/Whats_App_Image_2023_01_03_at_17_15_23_(1).webp",
      "https://i.postimg.cc/tTXgkNtN/Whats_App_Image_2023_01_03_at_17_15_23_(7).webp"
    ];
    return [...images].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <section className="py-24 bg-slate-50 px-6 border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">O RESULTADO REAL QUE VOCÊ VAI ENTREGAR</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto uppercase text-[10px] tracking-[0.3em] font-black">Confira os kits de alta lucratividade montados pelas nossas alunas</p>
        </div>

        <ImageCarousel images={resultImages} />

        <div className="text-center mt-16">
           <a href="#offer" className="inline-flex items-center gap-4 bg-slate-900 hover:bg-slate-950 text-white text-[11px] font-black py-4 px-10 rounded-full transition-all uppercase tracking-widest shadow-xl">
             Ver Oferta Completa <ArrowRight size={16} />
           </a>
        </div>
      </div>
    </section>
  );
};

const Deliverables: React.FC = () => {
  const items = [
    { title: "App Completo", desc: "Acesso vitalício à plataforma intuitiva.", icon: <Smartphone /> },
    { title: "Moldes gerados automaticamente", desc: "Basta você baixar, imprimir, montar e faturar muito.", icon: <FileText /> },
    { title: "Temas 2026", desc: "Temas tendência para faturar muito em 2026.", icon: <TrendingUp /> },
    { title: "Licença Comercial", desc: "Direito total para vender e lucrar.", icon: <Award /> },
    { title: "Atualizações", desc: "Novos temas inseridos periodicamente.", icon: <Clock /> },
    { title: "Suporte", desc: "Apoio via e-mail para qualquer dúvida.", icon: <MessageCircle /> },
  ];

  const bonuses = [
    { title: "BÔNUS 1: Guia de Precificação", desc: "Como cobrar de forma lucrativa sendo iniciante.", value: "R$ 47" },
    { title: "BÔNUS 2: Lista de Materiais", desc: "O que você precisa para começar com pouco.", value: "R$ 37" },
  ];

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-pink-600 font-black text-[11px] uppercase tracking-[0.4em] mb-4">PACOTE COMPLETO</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter italic">O QUE VOCÊ VAI RECEBER:</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {items.map((item, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-slate-950 border border-white/5 flex flex-col items-start group hover:bg-slate-900 hover:-translate-y-3 hover:shadow-2xl hover:shadow-pink-600/10 transition-all duration-500 cursor-default">
              <div className="text-pink-500 mb-8 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-pink-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h4 className="text-base font-black mb-2 uppercase tracking-tight text-white leading-tight group-hover:text-pink-500 transition-colors">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {bonuses.map((bonus, i) => (
            <div key={i} className="relative p-10 rounded-[2.5rem] bg-slate-950 border-2 border-pink-600/20 overflow-hidden hover:border-pink-600/50 hover:shadow-2xl hover:shadow-pink-600/10 transition-all duration-500 group hover:-translate-y-2">
               <div className="absolute top-6 right-6 bg-pink-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg animate-pulse">GRÁTIS</div>
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-pink-500 shadow-sm mb-8 group-hover:bg-pink-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <Gift size={24} />
               </div>
               <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-pink-500 transition-colors">{bonus.title}</h4>
               <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">{bonus.desc}</p>
               <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest italic line-through">Valor Original: {bonus.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="offer" className="py-24 bg-white px-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-slate-950 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white/5 relative transform hover:scale-[1.01] transition-transform duration-500">
          <div className="bg-pink-600 py-4 text-center text-white text-[11px] font-black uppercase tracking-[0.3em]">
            PAGAMENTO ÚNICO • SEM MENSALIDADE
          </div>
          
          <div className="p-10 md:p-14 text-center">
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">PAPELARIA DESCOMPLICADA</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-12">APP + MOLDES + BÔNUS</p>
            
            <div className="mb-14">
              <div className="flex flex-col items-center justify-center text-white min-h-[140px]">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Aproveite a oferta de lançamento</p>
                <div className="h-px w-20 bg-pink-600 mb-6" />
                <div className="flex flex-col items-center">
                   <span className="text-slate-500 text-xs line-through font-bold mb-1">DE R$ 197,00</span>
                   <div className="flex items-baseline gap-1">
                     <span className="text-white text-xl font-black">R$</span>
                     <span className="text-white text-6xl font-black tracking-tighter">37</span>
                     <span className="text-white text-xl font-black">,00</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-14 text-left">
              {[
                "Acesso Vitalício ao App de Edição",
                "MOLDES GERADOS EM SEGUNDOS AUTOMATICAMENTE",
                "Temas Infantis de Alta Demanda",
                "Licença para Vender ilimitado",
                "Garantia Incondicional de 7 Dias",
                "2 Bônus Exclusivos Grátis"
              ].map(item => (
                <div key={item} className="flex items-center gap-4 text-[10px] font-bold text-slate-400 border-b border-white/5 pb-4 last:border-0 group">
                  <Unlock size={14} className="text-pink-500 flex-shrink-0 group-hover:scale-125 transition-transform" /> {item}
                </div>
              ))}
            </div>

            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white text-base font-black py-6 rounded-2xl transition-all uppercase tracking-tight shadow-2xl shadow-pink-600/40 hover:-translate-y-1 active:scale-95 mb-8">
              QUERO ACESSAR AGORA
            </button>
            
            <div className="space-y-4 opacity-50">
              <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-green-500" /> SITE 100% SEGURO
              </div>
              <div className="flex items-center justify-center gap-6 grayscale filter brightness-200">
                <CreditCard size={18} className="text-white" />
                <span className="text-white text-[9px] font-black">PIX • CARTÃO • BOLETO</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">GARANTIA DE RISCO ZERO</p>
          <p className="text-slate-600 text-[10px] font-medium leading-relaxed">Se em até 7 dias você não gostar do app ou achar que não é pra você, devolvemos 100% do seu dinheiro. Sem burocracia.</p>
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    { q: "O acesso é vitalício?", a: "Sim! Você terá acesso ao app e a todas as atualizações para sempre, sem cobranças mensais." },
    { q: "Preciso de um computador?", a: "Absolutamente não. Nosso app foi desenvolvido para ser usado 100% via celular ou tablet." },
    { q: "Como recebo o acesso?", a: "Imediatamente após a aprovação do pagamento. Você receberá um e-mail com o link de login e sua senha pessoal." },
    { q: "Não tenho impressora, posso vender?", a: "Com certeza! Muitas alunas vendem o kit digital (PDF) para o cliente imprimir, ou levam em gráficas rápidas. O lucro continua sendo altíssimo." },
    { q: "O suporte é via WhatsApp?", a: "O suporte principal para dúvidas técnicas é via e-mail para garantir que nenhuma solicitação seja perdida e tudo seja respondido rapidamente." }
  ];

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-black text-center mb-16 uppercase tracking-tighter text-slate-900 italic">DÚVIDAS FREQUENTES</h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border border-slate-100 rounded-[1.5rem] overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-black text-slate-800 uppercase tracking-tight text-[10px] md:text-xs leading-relaxed pr-6">{item.q}</span>
                <ChevronDown size={16} className={`text-pink-500 transition-transform duration-500 flex-shrink-0 ${openIndex === i ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {openIndex === i && (
                <div className="p-8 pt-0 text-[11px] text-slate-500 leading-relaxed font-medium">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="py-24 bg-slate-950 text-center px-6 border-t border-white/5">
    <div className="max-w-4xl mx-auto">
      <span className="text-white font-black text-xl tracking-tighter block uppercase italic mb-12">PAPELARIA<span className="text-pink-600">DESCOMPLICADA</span></span>
      
      <div className="flex flex-wrap justify-center gap-10 text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12">
        <a href="#" className="hover:text-pink-600 transition-colors">Privacidade</a>
        <a href="#" className="hover:text-pink-600 transition-colors">Termos</a>
        <a href="#" className="hover:text-pink-600 transition-colors">Contato</a>
      </div>

      <p className="text-slate-600 text-[8px] font-bold leading-relaxed max-w-2xl mx-auto uppercase tracking-widest mb-10 opacity-70">
        Resultados podem variar. Este site não faz parte do Facebook Inc ou Google Inc. Toda informação é de nossa responsabilidade.
      </p>

      <div className="h-px w-20 bg-slate-800 mx-auto mb-10" />
      
      <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.5em]">© 2025 PAPELARIA DESCOMPLICADA • TODOS OS DIREITOS RESERVADOS</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-pink-100 selection:text-pink-600 antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Results />
      <Deliverables />
      <Pricing />
      <FAQ />
      <Footer />
      <ScarcityNotification />
    </div>
  );
};

export default App;
