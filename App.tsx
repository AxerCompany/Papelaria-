
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
  Lock,
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
  MoveRight,
  Info,
  Loader2
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
  const [timeLeft, setTimeLeft] = useState(900); // 15:00 initially for more urgency

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
      <div className="flex items-center gap-2">
        <Timer size={18} />
        <span>OFERTA EXPIRA EM: {formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

const ScarcityNotification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);
  const [name, setName] = useState('Mariana');
  const names = ['Ana Paula', 'Julia S.', 'Renata M.', 'Cláudia', 'Beatriz', 'Fernanda R.', 'Carla T.', 'Priscila', 'Sandra', 'Mônica', 'Patrícia', 'Daniela'];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show much earlier
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
      setTimeout(() => setVisible(false), 6000);
    };

    const interval = setInterval(show, 15000); // More frequent
    const timeout = setTimeout(show, 2000);
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
  priority?: boolean;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ posterUrl, videoUrl, label, isVertical = false, priority = false }) => {
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
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute -inset-4 bg-pink-600/20 blur-3xl rounded-full opacity-50 pointer-events-none group-hover:opacity-75 transition-opacity" />
      
      <div 
        className={`w-full ${isVertical ? 'aspect-[9/16] max-w-[320px] mx-auto' : 'aspect-video'} rounded-3xl overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] group cursor-pointer transition-all duration-500 bg-slate-900 border-4 border-white/10 ring-1 ring-white/5`}
        onClick={() => setIsPlaying(true)}
      >
        {!isPlaying ? (
          <>
            <img 
              src={posterUrl}
              alt="Video Poster"
              className="absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-110"
              fetchPriority={priority ? "high" : "auto"}
              loading={priority ? "eager" : "lazy"}
              width={isVertical ? 320 : 1280}
              height={isVertical ? 568 : 720}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            
            <div className="absolute top-4 left-4 bg-pink-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg transform rotate-[-2deg] z-20">
              VEJA COMO FUNCIONA
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-600 rounded-full animate-ping opacity-30 scale-150" />
                <div className="w-20 h-20 md:w-28 md:h-28 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 transition-transform duration-300 border-4 border-white/30 backdrop-blur-sm relative z-10">
                  <Play size={44} fill="currentColor" className="ml-2" />
                </div>
              </div>
              {label && (
                <div className="mt-8 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 transform group-hover:-translate-y-1 transition-transform">
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
  width?: number;
  height?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  aspectRatio = "aspect-video", 
  maxWidth = "max-w-6xl",
  autoplay = true,
  interval = 3500,
  width = 800,
  height = 450
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
              width={width}
              height={height}
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
      <span className="text-slate-900 font-black text-xl tracking-tighter uppercase italic">PAPELARIA<span className="text-[#5B2A86]">DESCOMPLICADA</span></span>
    </div>
  </nav>
);

const Hero: React.FC = () => (
  <section className="pt-24 pb-20 px-6 bg-slate-950 text-white flex flex-col items-center text-center relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#5B2A86]/20 to-[#7B3DB8]/5 blur-[120px] rounded-full -z-10" />
    <div className="absolute -top-[10%] -right-[10%] w-[300px] h-[300px] bg-[#EC4899]/5 blur-[100px] rounded-full -z-10" />
    
    <div className="max-w-5xl mx-auto flex flex-col items-center">
      <div className="inline-flex items-center gap-3 px-8 py-3 bg-[#5B2A86]/10 text-[#F472B6] rounded-full border border-[#5B2A86]/30 mb-10 shadow-[0_0_30px_rgba(91,42,134,0.25)]">
        <Info size={16} />
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] italic">OPORTUNIDADE ÚNICA DE RENDDA EXTRA</span>
      </div>
      
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-[900] mb-8 leading-[1.2] tracking-tight uppercase max-w-4xl mx-auto">
        GANHE ATÉ <span className="text-[#EC4899]">R$ 1.000,00 POR SEMANA</span> COM PAPELARIA PERSONALIZADA — <span className="text-white">MESMO COMEÇANDO DO ZERO.</span>
      </h1>
      
      <p className="text-xs md:text-lg text-slate-400 mb-14 font-black max-w-2xl mx-auto leading-relaxed">
        Assista ao vídeo abaixo e descubra como transformar moldes em vendas usando um aplicativo simples e fácil de usar.
      </p>

      <div className="w-full max-w-3xl transform hover:scale-[1.01] transition-transform duration-500">
        <CustomVideoPlayer 
          posterUrl="https://i.postimg.cc/sX0hqL2w/1.webp"
          label="CLIQUE PARA ATIVAR O SOM"
          videoUrl="https://vimeo.com/1200216131"
          isVertical={true}
          priority={true}
        />
      </div>
    </div>
  </section>
);

const HowItWorks: React.FC = () => (
  <section className="py-16 bg-[#F8F8F8] px-6 border-b border-slate-200">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[#5B2A86] font-black text-[12px] uppercase tracking-[0.4em] mb-3">O MÉTODO</p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic leading-tight">COMO FUNCIONA O PROCESSO:</h2>
        <div className="w-16 h-1 bg-[#5B2A86] mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { 
            icon: <MousePointer2 size={28} className="transform rotate-90" />, 
            title: "✅ 1. OS MOLDES PRONTOS VÊM DO APP DIRETO PRO SEU CELULAR", 
            desc: (
              <>
                Nada de <strong className="font-extrabold text-slate-800">programas complicados ou computador</strong>. Você escolhe o tema, e o app gera o molde automático — <strong className="font-extrabold text-slate-800">prontos para baixar imprimir e usar</strong>.
              </>
            )
          },
          { 
            icon: <Scissors size={28} />, 
            title: "✅ 2. IMPRIMA E MONTE COM O QUE VOCÊ TEM EM CASA", 
            desc: (
              <>
                Você não precisa de impressora. Os moldes podem ser impressos em qualquer gráfica rápida. Com papel, tesoura e cola, você monta tudo à mão — <strong className="font-extrabold text-slate-800">simples acessível e sem equipamentos caros</strong>.
              </>
            )
          },
          { 
            icon: <Share2 size={28} />, 
            title: "✅ 3. MOSTRE SEU TRABALHO E VEJA OS PEDIDOS CHEGAREM", 
            desc: (
              <>
                Quando você compartilha o que faz, as pessoas veem valor. Festa infantil é o que mais vende — e os seus kits feitos à mão chamam atenção na hora.
              </>
            )
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[2rem] shadow-[0_12px_30px_rgba(91,42,134,0.03)] border border-slate-200/60 flex flex-col items-start">
            <div className="w-14 h-14 bg-[#5B2A86]/10 rounded-2xl flex items-center justify-center text-[#5B2A86] mb-8 border border-[#5B2A86]/20">
              {item.icon}
            </div>
            <h4 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mb-5 leading-[1.3] text-left">
              {item.title}
            </h4>
            <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed text-left">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features: React.FC = () => {
  const images = [
    "https://i.postimg.cc/rwGJTxcX/Whats-App-Image-2026-06-10-at-11-13-27.webp",
    "https://i.postimg.cc/mg3w4C4n/Whats-App-Image-2026-06-10-at-11-13-27-(1).webp",
    "https://i.postimg.cc/K87NbBF2/Whats-App-Image-2026-06-10-at-11-13-27-(2).webp",
    "https://i.postimg.cc/DwQghLF2/Whats-App-Image-2026-06-10-at-11-13-28.webp",
    "https://i.postimg.cc/tgXz4JC4/Whats-App-Image-2026-06-10-at-11-16-12.webp",
    "https://i.postimg.cc/3wKZxNJJ/Whats-App-Image-2026-06-10-at-11-16-12-(1).webp",
    "https://i.postimg.cc/vmQvZTHm/Whats-App-Image-2026-06-10-at-11-16-13-(1).webp",
    "https://i.postimg.cc/bw0TPk8j/Whats-App-Image-2026-06-10-at-11-13-28-(1).webp",
    "https://i.postimg.cc/Bn5g3Hsf/Whats-App-Image-2026-06-10-at-11-13-28-(2).webp",
    "https://i.postimg.cc/zGwjNK55/Whats-App-Image-2026-06-10-at-11-13-28-(3).webp",
    "https://i.postimg.cc/0yGfvDxj/Whats-App-Image-2026-06-10-at-11-13-29.webp",
    "https://i.postimg.cc/Jz3q8Zmz/Whats-App-Image-2026-06-10-at-11-13-29-(2).webp",
    "https://i.postimg.cc/9fWBQ0FC/Whats-App-Image-2026-06-10-at-11-13-30.webp",
    "https://i.postimg.cc/jjshS2dr/Whats-App-Image-2026-06-10-at-11-13-30-(1).webp",
    "https://i.postimg.cc/MGWYpHKx/Whats-App-Image-2026-06-10-at-11-13-30-(3).webp",
    "https://i.postimg.cc/6Q9hpq5W/Whats-App-Image-2026-06-10-at-11-13-31.webp"
  ];

  return (
    <section className="py-12 bg-white px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#5B2A86] font-black text-[12px] uppercase tracking-[0.4em] mb-3">TECNOLOGIA EXCLUSIVA</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">O SEU ATELIÊ NA PALMA DA MÃO</h2>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">Tudo o que você precisa para começar na papelaria em um único lugar: moldes prontos, precificação automática, montagem, divulgação e vendas.</p>
        </div>

        <div className="flex flex-col items-center justify-center mb-10 text-center opacity-80">
          <p className="text-[13px] md:text-sm font-black text-slate-900 leading-relaxed max-w-md">
            Deslize para o lado e descubra tudo o que você encontra dentro do aplicativo.
          </p>
          <div className="mt-2 text-[#5B2A86]">
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
            width={360}
            height={640}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Gift size={28} />, title: "🎁 BIBLIOTECA DE MOLDES PRONTOS", desc: "Mais de 2.000 moldes organizados para imprimir, personalizar e vender." },
            { icon: <Rocket size={28} />, title: "🚀 COMECE COM APENAS R$100", desc: "Receba um plano simples para fazer sua primeira venda mesmo começando com pouco dinheiro e sem impressora." },
            { icon: <DollarSign size={28} />, title: "💰 DESCUBRA QUANTO COBRAR", desc: "Calcule preços e lucros automaticamente para vender com mais confiança." },
            { icon: <Scissors size={28} />, title: "✂️ APRENDA COMO MONTAR", desc: "Veja os materiais necessários e siga tutoriais simples de produção." },
            { icon: <Volume2 size={28} />, title: "📢 TEXTOS PRONTOS PARA VENDER", desc: "Mensagens prontas para WhatsApp e Instagram para divulgar seus produtos." },
            { icon: <Layers size={28} />, title: "🏪 ONDE COMPRAR MATERIAIS", desc: "Descubra fornecedores confiáveis e economize tempo procurando tudo sozinha." },
            { icon: <Package size={28} />, title: "📦 KIT INICIAL PARA COMEÇAR", desc: "Saiba exatamente o que comprar para iniciar sem desperdícios." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center bg-[#F8F8F8] p-8 rounded-2xl border border-slate-200/50">
              <div className="w-14 h-14 bg-[#5B2A86]/10 rounded-2xl flex items-center justify-center text-[#5B2A86] mb-6 shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight mb-3 leading-tight">{item.title}</h4>
              <p className="text-slate-500 text-[12px] md:text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Cláudia Ferreira",
      role: "Empreendedora",
      text: "Simplesmente maravilhoso. o aplicativo facilitou muito pra mim começar na papelaria pois nao tenho computador e nem sei editar nada, com a app eu consegui finalmente inciar so tenho a agradecer🥰​🥰​.",
      image: "https://i.postimg.cc/0jh0NnNF/image_15_300x300.webp"
    },
    {
      name: "Renata Mendes",
      role: "Artesã Iniciante",
      text: "Os moldes são perfeitos e super fáceis de montar. O bônus de vendas abriu minha mente sobre como postar no Instagram e chamar atenção. O investimento se pagou na primeira encomenda de 10 caixinhas fora que eu perdia horas montando e editando moldes​😁​😁​.",
      image: "https://i.postimg.cc/CKwHdzFq/image_13_229x300.webp"
    },
    {
      name: "Ana Paula Silva",
      role: "Mãe e Empreendedora",
      text: "Eu nunca tinha mexido com papelaria e achava que precisava de computador e maquinario caro. Com o app, faço tudo pelo celular com papel cola e tesoura, enquanto meu filho dorme. Já fiz minha primeira encomenda em 4 dias!🥰​​​💖",
      image: "https://i.postimg.cc/0NCnC7tX/image_14_300x300.webp"
    },
    {
      name: "Arlete Menezes",
      role: "Artesã experiente",
      text: "Quando eu estava começando na papelaria in 2017 tudo que eu queria era um app desse, sofri muito pra começar, nao sabia editar e nada disso, foi uma dificuldade enorme, com esse app fica bem mais facil começar a fazer personalizados, recomendo muito pra quem esta começando ou quer começar.",
      image: "https://i.postimg.cc/t4QzQBwx/image_16_281x300.webp"
    }
  ];

  return (
    <section className="py-16 bg-[#F8F8F8] px-6 border-b border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#5B2A86] font-black text-[12px] uppercase tracking-[0.4em] mb-3">RESULTADOS REAIS</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">O QUE ELAS ESTÃO DIZENDO</h2>
          <div className="w-16 h-1 bg-[#5B2A86] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col relative">
              <div className="absolute top-8 right-8 text-[#5B2A86]/10">
                <Quote size={48} fill="currentColor" />
              </div>
              <div className="flex gap-1 mb-6 text-[#EC4899]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 text-sm md:text-base font-medium italic leading-relaxed mb-8 flex-grow">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-100">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-full h-full object-cover" 
                    width={48} 
                    height={48} 
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{t.name}</h4>
                  <p className="text-[10px] font-bold text-[#5B2A86] uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
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
    <section className="py-12 bg-[#F8F8F8] px-6 border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter italic">O RESULTADO QUE VOCÊ VAI ENTREGAR</h2>
          <p className="text-[#5B2A86] font-black text-xs tracking-[0.3em] uppercase mb-10">Kits de alta lucratividade</p>
        </div>

        <div className="flex flex-col items-center justify-center mb-10 text-center opacity-80">
          <p className="text-[13px] md:text-sm font-black text-slate-900 leading-relaxed uppercase tracking-widest">
            Deslize para o lado
          </p>
          <div className="mt-2 text-[#5B2A86]">
            <MoveRight size={16} />
          </div>
        </div>

        <ImageCarousel 
          images={resultImages} 
          aspectRatio="aspect-square" 
          maxWidth="max-w-4xl" 
          autoplay={true}
          interval={4000}
          width={800}
          height={800}
         />
      </div>
    </section>
  );
};

const Deliverables: React.FC = () => {
  return (
    <section className="py-12 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-12">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#5B2A86] to-[#EC4899] rounded-[3rem] blur-xl opacity-25" />
          <div className="relative bg-white border-4 border-[#5B2A86] rounded-[2.8rem] p-8 md:p-14 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-50 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5B2A86] text-white rounded-full text-[13px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg shadow-[#5B2A86]/20">
                <Rocket size={18} /> BÔNUS ESPECIAL: COMO VENDER AINDA ESSA SEMANA
              </div>
              
              <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight italic leading-[1.1]">
                Montar os kits é simples. <br className="hidden md:block" />
                <span className="text-[#EC4899]">Agora você vai aprender a vender rápido</span>, mesmo começando do zero.
              </h3>
              
              <p className="text-slate-500 text-sm md:text-lg font-medium mb-12 max-w-2xl leading-relaxed">
                Nesse bônus exclusivo, você descobre o caminho mais curto para o dinheiro no bolso:
              </p>

              <div className="w-full grid md:grid-cols-1 gap-4 text-left max-w-xl mb-12">
                {[
                  { text: "O que postar pra chamar atenção", icon: <Share2 size={16} /> },
                  { text: "Como conseguir os primeiros pedidos usando só o seu celular", icon: <Smartphone size={16} /> },
                  { text: "Como tirar fotos simples que vendem o produto por você", icon: <Camera size={16} /> },
                  { text: "Como cobrar e entregar de um jeito fácil e seguro", icon: <CreditCard size={16} /> }
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-[#5B2A86]/5 p-5 rounded-2xl border border-[#5B2A86]/10">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#5B2A86] text-white rounded-full flex items-center justify-center text-xs font-black">
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
                    Tudo testado, direto ao ponto, <span className="text-[#EC4899]">sem enrolação.</span>
                  </p>
                </div>
                
                <div className="flex items-start md:items-center gap-3 bg-[#5B2A86]/5 p-6 rounded-[2rem] border border-purple-200">
                  <span className="text-2xl flex-shrink-0">👉</span>
                  <p className="text-slate-900 text-base md:text-xl font-black italic tracking-tight leading-tight">
                    Com esse bônus, você pode fazer sua primeira venda <span className="text-[#EC4899] underline">ainda essa semana.</span> Literalmente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-b from-[#5B2A86] to-[#7B3DB8] rounded-[2.5rem] blur opacity-15" />
            <div className="relative bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-md shadow-slate-100/50 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#5B2A86] rounded-3xl flex items-center justify-center text-white mb-8 rotate-3 shadow-lg shadow-purple-500/30">
                <DollarSign size={40} />
              </div>
              <div className="mb-6">
                <span className="text-xs font-black text-[#5B2A86] bg-[#5B2A86]/10 px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">🎁 BÔNUS 01</span>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2 italic">PRIMEIROS CLIENTES EM 7 DIAS</h4>
                <p className="text-slate-500 font-bold text-sm leading-relaxed px-4">
                  Aprenda estratégias simples para conseguir seus primeiros pedidos usando WhatsApp, Instagram, Facebook e divulgação local.
                </p>
              </div>
              <div className="mt-auto w-full pt-8 border-t border-slate-50">
                <span className="text-[11px] font-black text-[#EC4899] px-6 py-2 bg-[#EC4899]/5 rounded-full uppercase tracking-[0.2em] italic border border-[#EC4899]/15 line-through decoration-slate-400 font-sans">
                  VALE R$ 97,00
                </span>
                <p className="text-[10px] text-slate-400 mt-3 font-black uppercase tracking-widest">LIBERADO GRÁTIS HOJE</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-b from-[#EC4899] to-[#F472B6] rounded-[2.5rem] blur opacity-15" />
            <div className="relative bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-md shadow-slate-100/50 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#EC4899] rounded-3xl flex items-center justify-center text-white mb-8 -rotate-3 shadow-lg shadow-pink-600/30">
                <Zap size={40} />
              </div>
              <div className="mb-6">
                <span className="text-xs font-black text-[#EC4899] bg-[#EC4899]/10 px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">🎁 BÔNUS 02</span>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2 italic">GUIA DA PRIMEIRA VENDA</h4>
                <p className="text-slate-500 font-bold text-sm leading-relaxed px-4">
                  Descubra exatamente o que postar, como divulgar, cobrar, entregar e transformar interesse em pedidos reais.
                </p>
              </div>
              <div className="mt-auto w-full pt-8 border-t border-slate-50">
                <span className="text-[11px] font-black text-[#EC4899] px-6 py-2 bg-[#EC4899]/5 rounded-full uppercase tracking-[0.2em] italic border border-[#EC4899]/15 line-through decoration-slate-400 font-sans">
                  VALE R$ 67,00
                </span>
                <p className="text-[10px] text-slate-400 mt-3 font-black uppercase tracking-widest">LIBERADO GRÁTIS HOJE</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-b from-[#7B3DB8] to-[#5B2A86] rounded-[2.5rem] blur opacity-15" />
            <div className="relative bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-md shadow-slate-100/50 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#7B3DB8] rounded-3xl flex items-center justify-center text-white mb-8 rotate-3 shadow-lg shadow-purple-500/30">
                <Package size={40} />
              </div>
              <div className="mb-6">
                <span className="text-xs font-black text-[#7B3DB8] bg-[#7B3DB8]/10 px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">🎁 BÔNUS 03</span>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2 italic">LISTA DE MATERIAIS PARA COMEÇAR</h4>
                <p className="text-slate-500 font-bold text-sm leading-relaxed px-4">
                  Saiba exatamente o que comprar para fazer seus primeiros personalizados sem gastar dinheiro com itens desnecessários.
                </p>
              </div>
              <div className="mt-auto w-full pt-8 border-t border-slate-50">
                <span className="text-[11px] font-black text-[#EC4899] px-6 py-2 bg-[#EC4899]/5 rounded-full uppercase tracking-[0.2em] italic border border-[#EC4899]/15 line-through decoration-slate-400 font-sans">
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
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = () => {
    if (isLoading) return;
    
    setIsLoading(true);

    if (window.fbq) {
      window.fbq('trackCustom', 'SubscribedButtonClick');
    }
    
    const baseUrl = "https://milionario2026.mycartpanda.com/checkout/206645965:1";
    const currentParams = window.location.search;
    
    // Pequeno delay para garantir que o Pixel dispare antes do redirecionamento
    // e para dar tempo do usuário ver o feedback visual
    setTimeout(() => {
      window.location.href = baseUrl + currentParams;
    }, 500);

    // Fallback: se por algum motivo o redirecionamento falhar ou demorar muito,
    // permitimos o clique novamente após 8 segundos
    setTimeout(() => {
      setIsLoading(false);
    }, 8000);
  };

  return (
    <section id="offer" className="py-12 bg-white px-6">
      <div className="max-w-lg mx-auto">
        <div className="bg-[#0e071c] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(91,42,134,0.15)] border border-white/5 relative">
          <div className="bg-[#5B2A86] py-4 text-center text-white text-[12px] font-black uppercase tracking-[0.3em]">
            OFERTA EXCLUSIVA • VAGAS LIMITADAS
          </div>
          
          <div className="p-10 md:p-12 text-center">
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">ACESSO COMPLETO AO PAPELARIA DESCOMPLICADA</h3>
            <p className="text-sm font-medium text-slate-400 mb-8 max-w-sm mx-auto">
              Moldes, precificação, montagem, divulgação e vendas.
            </p>
            
            <div className="flex flex-col items-center mb-10">
              <CountdownTimer />
              <p className="text-[#EC4899] text-[10px] font-black uppercase tracking-[0.2em] mt-2">O preço subirá para R$ 197,00 após o cronômetro zerar</p>
            </div>

            {/* Progress Bar Scarcity */}
            <div className="mb-10 px-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Vagas Preenchidas:</span>
                <span className="text-[#EC4899] text-sm font-black">71%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-[#5B2A86] to-[#EC4899] rounded-full w-[71%] animate-pulse" />
              </div>
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-2">Últimas 9 licenças disponíveis com desconto</p>
            </div>

            <div className="mb-12">
              <div className="flex flex-col items-center justify-center text-white">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Aproveite a oferta de lançamento</p>
                <div className="h-px w-16 bg-[#EC4899] mb-6" />
                <div className="flex flex-col items-center">
                   <span className="text-slate-500 text-xs line-through font-bold mb-2">DE R$ 197,00</span>
                   <div className="flex items-baseline gap-1 text-[#EC4899]">
                     <span className="text-white text-xl font-black">R$</span>
                     <span className="text-[#EC4899] text-7xl font-black tracking-tighter">37</span>
                     <span className="text-[#EC4899] text-xl font-black">,00</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-12 text-left">
              {[
                { type: "check", text: "Acesso Completo ao Aplicativo" },
                { type: "check", text: "Biblioteca com +2.000 Moldes Prontos" },
                { type: "check", text: "Plano para Começar com Apenas R$100" },
                { type: "check", text: "Calculadora de Preços e Lucros" },
                { type: "check", text: "Tutoriais de Montagem Passo a Passo" },
                { type: "check", text: "Textos Prontos para WhatsApp e Instagram" },
                { type: "check", text: "Lista de Fornecedores Recomendados" },
                { type: "check", text: "Licença Comercial de Vendas" },
                { type: "check", text: "Garantia de 7 Dias" },
                { type: "bonus", text: "BÔNUS: Primeiros Clientes em 7 Dias" },
                { type: "bonus", text: "BÔNUS: Guia da Primeira Venda" },
                { type: "bonus", text: "BÔNUS: Lista de Materiais" }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-4 text-xs md:text-sm font-bold border-b border-white/5 pb-4 last:border-0 ${item.type === 'bonus' ? 'text-[#F472B6] font-extrabold' : 'text-slate-400'}`}>
                  <span className="text-[14px] flex-shrink-0 leading-none">{item.type === 'bonus' ? '🎁' : '✅'}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handlePurchase}
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-[#5B2A86]/70 cursor-not-allowed' : 'bg-[#5B2A86] hover:bg-[#EC4899] active:scale-95'} text-white text-base font-black py-6 rounded-2xl transition-all uppercase tracking-tight shadow-xl shadow-[#5B2A86]/45 mb-10 group relative overflow-hidden`}
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    PROCESSANDO...
                  </>
                ) : (
                  <>
                    LIBERAR MEU ACESSO AGORA
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              
              {/* Efeito de brilho quando não está carregando */}
              {!isLoading && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              )}
            </button>
            
            <div className="flex items-center justify-center gap-5 opacity-55 grayscale brightness-200">
              <CreditCard size={20} className="text-white" />
              <span className="text-white text-[10px] font-black uppercase tracking-widest italic">PIX • CARTÃO • BOLETO</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-[#F8F8F8] p-8 rounded-[2.5rem] border-2 border-[#5B2A86]/10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-24 h-24 flex-shrink-0 bg-white rounded-full border-4 border-[#5B2A86] flex items-center justify-center text-[#5B2A86] shadow-inner shadow-[#5B2A86]/5">
            <ShieldAlert size={48} strokeWidth={2.5} />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-base font-black text-slate-900 uppercase tracking-tighter mb-2">SATISFAÇÃO GARANTIDA OU SEU DINHEIRO DE VOLTA</h4>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              Você tem <span className="text-[#EC4899] font-black">7 DIAS INTEIROS</span> para testar nosso app. Se não gostar, devolvemos 100% do seu investimento na hora. Sem perguntas, sem estresse.
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
    { q: "Por quanto tempo terei acesso?", a: "Seu acesso é vitalício. Você terá acesso imediato ao app e a todas as futuras atualizações para garantir que seus moldes estejam sempre prontos para venda." },
    { q: "Preciso de um computador?", a: "Absolutamente não. Nosso app foi desenvolvido para ser usado 100% via celular ou tablet." },
    { q: "Como recebo o acesso?", a: "Imediatamente após a aprovação do pagamento. Você receberá um e-mail com o link de login e sua senha pessoal." },
    { q: "Não tenho impressora, posso vender?", a: "Com certeza! Você pode imprimir os moldes em gráficas rápidas sempre que precisar. O processo continua simples, acessível e com ótimo potencial de lucro." },
    { q: "O suporte é via WhatsApp?", a: "Sim! Oferecemos suporte humanizado diretamente pelo WhatsApp para garantir que você tire todas as suas dúvidas rapidamente e comece a lucrar o quanto antes." }
  ];

  return (
    <section className="py-12 bg-white px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-black text-center mb-10 uppercase tracking-tighter text-slate-900 italic">DÚVIDAS FREQUENTES</h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border border-[#5B2A86]/10 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-white"
               >
                <span className="font-black text-slate-800 uppercase tracking-tight text-xs md:text-sm leading-relaxed pr-6">{item.q}</span>
                <ChevronDown size={16} className={`text-[#EC4899] flex-shrink-0 ${openIndex === i ? 'rotate-180' : 'rotate-0'}`} />
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
  <footer className="py-12 bg-[#0a0514] text-center px-6 border-t border-white/5">
    <div className="max-w-4xl mx-auto">
      <span className="text-white font-black text-xl tracking-tighter block uppercase italic mb-8">PAPELARIA<span className="text-[#EC4899]">DESCOMPLICADA</span></span>
      
      <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12">
        <a href="#" className="hover:text-[#EC4899] transition-colors">Privacidade</a>
        <a href="#" className="hover:text-[#EC4899] transition-colors">Termos</a>
        <a href="#" className="hover:text-[#EC4899] transition-colors">Contato</a>
      </div>

      <p className="text-slate-600 text-[10px] font-bold leading-relaxed max-w-xl mx-auto uppercase tracking-widest mb-10 opacity-60">
        Resultados podem variar. Este site não faz parte do Facebook Inc ou Google Inc. Toda informação é de nossa responsabilidade.
      </p>

      <div className="h-px w-16 bg-slate-800 mx-auto mb-10" />
      
      <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em] mb-8">© 2025 PAPELARIA DESCOMPLICADA • TODOS OS DIREITOS RESERVADOS</p>

      <div className="pt-8 border-t border-white/5">
        <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-4">© 2026 • Todos os direitos reservados.</p>
        <p className="text-slate-700 text-[9px] font-bold uppercase tracking-widest opacity-40 leading-relaxed max-w-2xl mx-auto mb-4">
          Todo o conteúdo presente nesta página, incluindo textos, imagens, design, estrutura, vídeos, materiais e quaisquer outros elementos, é protegido por leis de direitos autorais e propriedade intelectual.
        </p>
        <p className="text-[#4b3c66] text-[9px] font-bold uppercase tracking-widest opacity-40 leading-relaxed max-w-2xl mx-auto">
          É proibida a reprodução, cópia, distribuição ou modificação, total ou parcial, sem autorização prévia por escrito do responsável. O uso indevido do conteúdo poderá resultar em medidas legais conforme a legislação vigente.
        </p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-purple-100 selection:text-[#5B2A86] antialiased overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
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
