
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
  Play, 
  ShieldAlert,
  MousePointer2,
  Scissors,
  Share2,
  Rocket,
  Camera,
  Target,
  DollarSign,
  Package,
  Timer,
  Users,
  Volume2,
  MoveRight
} from 'lucide-react';

// Declaração global para o TypeScript reconhecer o fbq do Meta Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

// --- Helper Functions ---

const getEmbedUrl = (url: string) => {
  if (!url) return '';
  
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1].split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }

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

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(2700); // 45:00 initially

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 text-pink-500 font-black text-sm md:text-base animate-pulse">
      <Timer size={18} />
      <span>OFERTA TERMINA EM: {formatTime(timeLeft)}</span>
    </div>
  );
};

const ScarcityNotification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);
  const [name, setName] = useState('Mariana');
  const names = ['Ana Paula', 'Julia S.', 'Renata M.', 'Cláudia', 'Beatriz', 'Fernanda R.', 'Carla T.', 'Priscila'];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2500) {
        setHasReachedThreshold(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!hasReachedThreshold) return;

    const show = () => {
      setName(names[Math.floor(names.length * Math.random())]);
      setVisible(true);
      setTimeout(() => setVisible(false), 8000);
    };

    const interval = setInterval(show, 25000);
    const timeout = setTimeout(show, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [hasReachedThreshold]);

  return (
    <div className={`fixed bottom-6 left-6 z-[100] transition-all duration-700 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 p-4 rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <p className="text-slate-900 text-sm font-bold leading-tight">{name} acabou de garantir o acesso!</p>
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
      return `${embedUrl}?autoplay=1&muted=0&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0`;
    }
    return `${embedUrl}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1&controls=1`;
  }, [embedUrl]);

  return (
    <div 
      className={`w-full ${isVertical ? 'aspect-[9/16] max-w-[280px] mx-auto' : 'aspect-video'} rounded-3xl overflow-hidden relative shadow-2xl group cursor-pointer transition-all duration-500 bg-slate-900 border border-white/5`}
      onClick={() => setIsPlaying(true)}
    >
      {!isPlaying ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-100 transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: `url('${posterUrl}')` }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-pink-600/60 transform group-hover:scale-110 transition-transform duration-300 mb-6 border-4 border-white/40 backdrop-blur-sm">
              <Play size={40} fill="currentColor" className="ml-2" />
            </div>
            {label && (
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 transform group-hover:-translate-y-1 transition-transform">
                <p className="text-white text-[12px] font-black uppercase tracking-[0.2em]">{label}</p>
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

// --- Image Carousel Component ---

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: string;
  maxWidth?: string;
  autoplay?: boolean;
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  aspectRatio = "aspect-video", 
  maxWidth = "max-w-6xl",
  autoplay = true,
  interval = 3500
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (autoplay && images.length > 1) {
      const timer = setInterval(next, interval);
      return () => clearInterval(timer);
    }
  }, [currentIndex, autoplay, images.length, interval]);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const scrollAmount = element.clientWidth * currentIndex;
      element.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className={`relative group ${maxWidth} mx-auto`}>
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden snap-x snap-mandatory rounded-[2.5rem] shadow-2xl border border-slate-100 bg-slate-100"
      >
        {images.map((img, i) => (
          <div key={i} className={`flex-shrink-0 w-full snap-center ${aspectRatio} relative overflow-hidden`}>
            <img 
              src={img} 
              alt={`Slide ${i}`} 
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-pink-600 hover:text-white z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-pink-600 hover:text-white z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-6 md:w-8 bg-pink-600' : 'w-1.5 md:w-2 bg-white/50'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- Page Sections ---

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-center">
      <span className="text-slate-900 font-black text-xl tracking-tighter uppercase italic">PAPELARIA<span className="text-pink-600">DESCOMPLICADA</span></span>
    </div>
  </nav>
);

const Hero: React.FC = () => (
  <section className="pt-24 pb-12 px-6 bg-slate-950 text-white flex flex-col items-center text-center relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-600/5 blur-[100px] rounded-full -z-10" />
    
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-5 py-2 bg-pink-600/10 text-pink-400 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 border border-pink-500/20 shadow-xl">
        <AlertCircle size={14} /> OPORTUNIDADE ÚNICA DE RENDA EXTRA
      </div>
      
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-6 leading-[1.2] tracking-tight uppercase max-w-4xl mx-auto">
        Ganhe até <span className="text-pink-500">R$ 1.000,00 por semana</span> com papelaria personalizada — mesmo começando do zero.
      </h1>
      
      <p className="text-sm md:text-base lg:text-lg text-slate-400 mb-8 font-medium max-w-xl mx-auto leading-relaxed">
        Assista ao vídeo abaixo e descubra como nosso app gera moldes prontos para vender em segundos.
      </p>

      <div className="w-full max-w-2xl px-4">
        <CustomVideoPlayer 
          posterUrl="https://i.postimg.cc/sX0hqL2w/1.webp"
          label="CLIQUE PARA ASSISTIR COM SOM"
          videoUrl="https://vimeo.com/1161223581"
          isVertical={true}
        />
      </div>
    </div>
  </section>
);

const HowItWorks: React.FC = () => (
  <section className="py-16 bg-slate-50 px-6 border-b border-slate-200">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-pink-600 font-black text-[12px] uppercase tracking-[0.4em] mb-3">O MÉTODO</p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic leading-tight">COMO FUNCIONA O PROCESSO:</h2>
        <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { 
            icon: <MousePointer2 size={32} />, 
            title: "✅ 1. Os moldes prontos vêm do app direto pro seu celular", 
            desc: (
              <>
                Nada de <span className="font-bold">programas complicados ou computador</span>. Você escolhe o tema, e o app gera o molde automático — <span className="font-bold">prontos para baixar imprimir e usar</span>.
              </>
            )
          },
          { 
            icon: <Scissors size={32} />, 
            title: "✅ 2. Imprima e monte com o que você tem em casa", 
            desc: (
              <>
                Você não precisa de impressora. Os moldes podem ser impressos em qualquer gráfica rápida. Com papel, tesoura e cola, você monta tudo à mão — <span className="font-bold">simples acessivel e sem equipamentos caros</span>.
              </>
            )
          },
          { 
            icon: <Share2 size={32} />, 
            title: "✅ 3. Mostre seu trabalho e veja os pedidos chegarem", 
            desc: "Quando você compartilha o que faz, as pessoas veem valor. Festa infantil é o que mais vende — e os seus kits feitos à mão chamam atenção na hora." 
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start transition-all hover:scale-[1.02] duration-300">
            <div className="w-14 h-14 bg-pink-600/10 rounded-2xl flex items-center justify-center text-pink-600 mb-8">
              {item.icon}
            </div>
            <h4 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mb-4 leading-tight">{item.title}</h4>
            <div className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">{item.desc}</div>
          </div>
        ))}
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
    <section className="py-12 bg-white px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-pink-600 font-black text-[12px] uppercase tracking-[0.4em] mb-3">TECNOLOGIA EXCLUSIVA</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">O SEU ATELIÊ NA PALMA DA MÃO</h2>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">Esqueça programas complexos. Nosso app foi desenhado para você escolher, personalizar e vender em minutos.</p>
        </div>

        {/* Frase de Instrução Discreta, Negrito e Minimalista */}
        <div className="flex flex-col items-center justify-center mb-10 text-center opacity-80">
          <p className="text-[13px] md:text-sm font-black text-slate-900 leading-relaxed max-w-xs md:max-w-sm">
            Deslize para o lado e <br />
            veja como é simples usar o app
          </p>
          <div className="mt-2 text-pink-500 animate-[bounce_2s_infinite]">
            <MoveRight size={16} />
          </div>
        </div>

        <div className="mb-12">
          <ImageCarousel 
            images={images} 
            aspectRatio="aspect-[9/16]" 
            maxWidth="max-w-[360px]" 
            autoplay={true}
            interval={3500}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Layers size={28} />, title: "Moldes Prontos", desc: "Acesse temas populares como Safari, Patrulha Canina e muito mais." },
            { icon: <Zap size={28} />, title: "Kits Completos", desc: "Caixinhas, toppers e tags em um só lugar." },
            { icon: <Printer size={28} />, title: "Download PDF", desc: "Arquivos prontos para baixar em alta resolução. Basta imprimir e vender." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group bg-slate-50 p-10 rounded-3xl border border-slate-100 transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-pink-500 mb-6 group-hover:bg-pink-600 group-hover:text-white transition-all shadow-lg">
                {item.icon}
              </div>
              <h4 className="text-base font-black text-slate-900 uppercase tracking-tight mb-3">{item.title}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
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
    <section className="py-12 bg-slate-50 px-6 border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter italic">O RESULTADO QUE VOCÊ VAI ENTREGAR</h2>
          <p className="text-slate-500 font-black text-xs tracking-[0.3em] uppercase mb-10">Kits de alta lucratividade</p>
        </div>

        {/* Instrução Minimalista para os Resultados */}
        <div className="flex flex-col items-center justify-center mb-10 text-center opacity-80">
          <p className="text-[13px] md:text-sm font-black text-slate-900 leading-relaxed uppercase tracking-widest">
            Deslize para o lado
          </p>
          <div className="mt-2 text-pink-500 animate-[bounce_2s_infinite]">
            <MoveRight size={16} />
          </div>
        </div>

        <ImageCarousel 
          images={resultImages} 
          aspectRatio="aspect-square" 
          maxWidth="max-w-4xl" 
          autoplay={true}
          interval={4000}
        />
      </div>
    </section>
  );
};

const Deliverables: React.FC = () => {
  return (
    <section className="py-12 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        {/* Bônus Especial - Ultra Destacado */}
        <div className="relative group mb-12">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-pink-400 rounded-[3rem] blur-xl opacity-25 group-hover:opacity-40 transition-opacity" />
          <div className="relative bg-white border-4 border-pink-600 rounded-[2.8rem] p-8 md:p-14 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-50 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-pink-600 text-white rounded-full text-[13px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg shadow-pink-600/20">
                <Rocket size={18} /> BÔNUS ESPECIAL: COMO VENDER AINDA ESSA SEMANA
              </div>
              
              <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight italic leading-[1.1]">
                Montar os kits é simples. <br className="hidden md:block" />
                <span className="text-pink-600">Agora você vai aprender a vender rápido</span>, mesmo começando do zero.
              </h3>
              
              <p className="text-slate-500 text-sm md:text-lg font-medium mb-12 max-w-2xl leading-relaxed">
                Nesse bônus exclusivo, você descobre o caminho mais curto para o dinheiro no bolso:
              </p>

              <div className="w-full grid md:grid-cols-1 gap-4 text-left max-w-xl mb-12">
                {[
                  { text: "O que postar pra chamar atenção", icon: <Share2 size={16} /> },
                  { text: "Como conseguir os primeiros pedidos usando só o seu celular", icon: <Smartphone size={16} /> },
                  { text: "Como tirar fotos simples que vendem o produto por você", icon: <Camera size={16} /> },
                  { text: "Estratégias pra vender em grupos, no Instagram e até no boca a boca", icon: <Target size={16} /> },
                  { text: "Como cobrar e entregar de um jeito fácil e seguro", icon: <CreditCard size={16} /> }
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-pink-50/50 p-5 rounded-2xl border border-pink-100/50 group/item transition-all hover:bg-pink-100">
                    <span className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs font-black group-hover/item:scale-110 transition-transform">
                      {idx + 1}
                    </span>
                    <p className="text-slate-800 text-sm md:text-base font-bold">{point.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6 w-full items-center">
                <div className="bg-slate-950 text-white px-8 py-4 rounded-2xl flex items-center gap-4 shadow-xl">
                  <span className="text-xl md:text-2xl">📲</span>
                  <p className="text-xs md:text-sm font-black uppercase tracking-widest leading-tight">
                    Tudo testado, direto ao ponto, <span className="text-pink-500">sem enrolação.</span>
                  </p>
                </div>
                
                <div className="flex items-start md:items-center gap-3 bg-pink-600/5 p-6 rounded-[2rem] border border-pink-200">
                  <span className="text-2xl flex-shrink-0">👉</span>
                  <p className="text-slate-900 text-base md:text-xl font-black italic tracking-tight leading-tight">
                    Com esse bônus, você pode fazer sua primeira venda <span className="text-pink-600 underline">ainda essa semana.</span> Literalmente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bônus de Precificação e Materiais - ULTRA DESTACADOS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Bônus de Precificação */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-green-400 to-green-600 rounded-[2.5rem] blur opacity-10" />
            <div className="relative bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-xl overflow-hidden flex flex-col items-center text-center transition-all hover:scale-[1.02]">
              <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center text-white mb-8 rotate-3 shadow-lg shadow-green-500/30">
                <DollarSign size={40} />
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2 italic">GUIA DE PRECIFICAÇÃO</h4>
                <p className="text-slate-500 font-bold text-sm leading-relaxed px-4">
                  Aprenda como cobrar de forma lucrativa mesmo sendo iniciante. Pare de perder dinheiro!
                </p>
              </div>
              <div className="mt-auto w-full pt-8 border-t border-slate-50">
                <span className="text-[11px] font-black text-green-600 px-6 py-2 bg-green-50 rounded-full uppercase tracking-[0.2em] italic line-through decoration-slate-400">
                  VALE R$ 47,00
                </span>
                <p className="text-[10px] text-slate-400 mt-3 font-black uppercase tracking-widest">LIBERADO GRÁTIS HOJE</p>
              </div>
            </div>
          </div>

          {/* Bônus Lista de Materiais */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-[2.5rem] blur opacity-10" />
            <div className="relative bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-xl overflow-hidden flex flex-col items-center text-center transition-all hover:scale-[1.02]">
              <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center text-white mb-8 -rotate-3 shadow-lg shadow-blue-500/30">
                <Package size={40} />
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2 italic">LISTA DE MATERIAIS</h4>
                <p className="text-slate-500 font-bold text-sm leading-relaxed px-4">
                  O guia exato do que você precisa para começar agora mesmo com o mínimo possível.
                </p>
              </div>
              <div className="mt-auto w-full pt-8 border-t border-slate-50">
                <span className="text-[11px] font-black text-blue-600 px-6 py-2 bg-blue-50 rounded-full uppercase tracking-[0.2em] italic line-through decoration-slate-400">
                  VALE R$ 37,00
                </span>
                <p className="text-[10px] text-slate-400 mt-3 font-black uppercase tracking-widest">LIBERADO GRÁTIS HOJE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => {
  const handlePurchase = () => {
    // Dispara o evento customizado solicitado para o clique no botão
    if (window.fbq) {
      window.fbq('trackCustom', 'SubscribedButtonClick');
    }
    
    // Redireciona para o checkout. O InitiateCheckout será disparado 
    // APENAS pelo checkout nativo da Cartpanda.
    window.location.href = "https://milionario2026.mycartpanda.com/checkout/206645965:1";
  };

  return (
    <section id="offer" className="py-12 bg-white px-6">
      <div className="max-w-lg mx-auto">
        <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-white/5 relative">
          <div className="bg-pink-600 py-3 text-center text-white text-[12px] font-black uppercase tracking-[0.3em]">
            PAGAMENTO ÚNICO • SEM MENSALIDADE
          </div>
          
          <div className="p-10 md:p-12 text-center">
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">PAPELARIA DESCOMPLICADA</h3>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">ACESSO TOTAL + MOLDES + BÔNUS</p>
            
            <div className="flex flex-col items-center mb-10">
              <CountdownTimer />
            </div>

            <div className="mb-12">
              <div className="flex flex-col items-center justify-center text-white">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Aproveite a oferta de lançamento</p>
                <div className="h-px w-16 bg-pink-600 mb-6" />
                <div className="flex flex-col items-center">
                   <span className="text-slate-500 text-xs line-through font-bold mb-2">DE R$ 197,00</span>
                   <div className="flex items-baseline gap-1">
                     <span className="text-white text-xl font-black">R$</span>
                     <span className="text-white text-7xl font-black tracking-tighter">37</span>
                     <span className="text-white text-xl font-black">,00</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-12 text-left">
              {[
                "Acesso Completo ao App",
                "Moldes gerados em segundos",
                "Temas Infantis Premium",
                "Licença Comercial de Vendas",
                "Garantia Incondicional",
                "Todos os Bônus Grátis"
              ].map(item => (
                <div key={item} className="flex items-center gap-4 text-xs md:text-sm font-bold text-slate-400 border-b border-white/5 pb-4 last:border-0">
                  <Unlock size={14} className="text-pink-500 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>

            <button 
              onClick={handlePurchase}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white text-base font-black py-6 rounded-2xl transition-all uppercase tracking-tight shadow-xl shadow-pink-600/30 active:scale-95 mb-10"
            >
              LIBERAR ACESSO
            </button>
            
            <div className="flex items-center justify-center gap-5 opacity-50 grayscale brightness-200">
              <CreditCard size={20} className="text-white" />
              <span className="text-white text-[10px] font-black uppercase tracking-widest italic">PIX • CARTÃO • BOLETO</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-200 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-24 h-24 flex-shrink-0 bg-white rounded-full border-4 border-pink-500 flex items-center justify-center text-pink-500 shadow-inner">
            <ShieldAlert size={48} strokeWidth={2.5} />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-base font-black text-slate-900 uppercase tracking-tighter mb-2">SATISFAÇÃO GARANTIDA OU SEU DINHEIRO DE VOLTA</h4>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              Você tem <span className="text-pink-600 font-black">7 DIAS INTEIROS</span> para testar nosso app. Se não gostar, devolvemos 100% do seu investimento na hora. Sem perguntas, sem estresse.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-8">
          <ShieldCheck size={18} className="text-green-500" /> COMPRA TOTALMENTE SEGURA E CRIPTOGRAFADA
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    { q: "Por quanto tempo terei acesso?", a: "Você terá acesso imediato ao app e a todas as atualizações para garantir que seus moldes estejam sempre prontos para venda." },
    { q: "Preciso de um computador?", a: "Absolutamente não. Nosso app foi desenvolvido para ser usado 100% via celular ou tablet." },
    { q: "Como recebo o acesso?", a: "Imediatamente após a aprovação do pagamento. Você receberá um e-mail com o link de login e sua senha pessoal." },
    { q: "Não tenho impressora, posso vender?", a: "Com certeza! Muitas alunas vendem o kit digital (PDF) para o cliente imprimir, ou levam em gráficas rápidas. O lucro continua sendo altíssimo." },
    { q: "O suporte é via WhatsApp?", a: "Sim! Oferecemos suporte humanizado diretamente pelo WhatsApp para garantir que você tire todas as suas dúvidas rapidamente e comece a lucrar o quanto antes." }
  ];

  return (
    <section className="py-12 bg-white px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-black text-center mb-10 uppercase tracking-tighter text-slate-900 italic">DÚVIDAS FREQUENTES</h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-black text-slate-800 uppercase tracking-tight text-xs md:text-sm leading-relaxed pr-6">{item.q}</span>
                <ChevronDown size={16} className={`text-pink-500 transition-transform duration-500 flex-shrink-0 ${openIndex === i ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {openIndex === i && (
                <div className="p-8 pt-0 text-xs md:text-sm text-slate-500 leading-relaxed font-medium bg-white">
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
  <footer className="py-12 bg-slate-950 text-center px-6 border-t border-white/5">
    <div className="max-w-4xl mx-auto">
      <span className="text-white font-black text-xl tracking-tighter block uppercase italic mb-8">PAPELARIA<span className="text-pink-600">DESCOMPLICADA</span></span>
      
      <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-12">
        <a href="#" className="hover:text-pink-600 transition-colors">Privacidade</a>
        <a href="#" className="hover:text-pink-600 transition-colors">Termos</a>
        <a href="#" className="hover:text-pink-600 transition-colors">Contato</a>
      </div>

      <p className="text-slate-700 text-[10px] font-bold leading-relaxed max-w-xl mx-auto uppercase tracking-widest mb-10 opacity-60">
        Resultados podem variar. Este site não faz parte do Facebook Inc ou Google Inc. Toda informação é de nossa responsabilidade.
      </p>

      <div className="h-px w-16 bg-slate-800 mx-auto mb-10" />
      
      <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em]">© 2025 PAPELARIA DESCOMPLICADA • TODOS OS DIREITOS RESERVADOS</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-pink-100 selection:text-pink-600 antialiased overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <HowItWorks />
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
