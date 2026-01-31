
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Smartphone, 
  Palette, 
  Download, 
  PlayCircle, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  ChevronDown,
  Layout,
  Layers,
  Zap,
  Printer,
  Heart,
  Clock,
  Home
} from 'lucide-react';

// --- Components ---

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <span className="text-white font-black text-xl tracking-tighter uppercase">PAPELARIA<span className="text-pink-500">PRO</span></span>
      <a href="#offer" className="bg-pink-600 hover:bg-pink-700 text-white text-[10px] font-bold py-2.5 px-5 rounded-full transition-all uppercase tracking-widest">Aproveite a Oferta</a>
    </div>
  </nav>
);

const Hero: React.FC = () => (
  <section className="pt-32 pb-20 px-4 bg-slate-900 text-white flex flex-col items-center text-center">
    <div className="max-w-4xl mx-auto">
      <span className="inline-block px-4 py-1.5 bg-pink-500/10 text-pink-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-pink-500/20">
        Aplicativo Exclusivo de Renda Extra
      </span>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tighter uppercase">
        Transforme papel em dinheiro com um app de moldes prontos para imprimir e vender <span className="text-pink-500">— mesmo que você nunca tenha feito isso antes</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-300 mb-10 font-medium max-w-3xl mx-auto leading-relaxed">
        Renda extra fácil, rápida e feita em casa por mães e artesãs comuns.
      </p>

      {/* Mini VSL Placeholder */}
      <div className="relative w-full max-w-3xl mx-auto aspect-video bg-slate-800 rounded-[2rem] vsl-shadow border border-white/10 overflow-hidden mb-12 group cursor-pointer">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-[2px] group-hover:bg-slate-900/20 transition-all">
          <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-pink-600/40 group-hover:scale-110 transition-transform duration-500">
            <PlayCircle className="w-10 h-10 text-white" />
          </div>
          <p className="text-white font-black uppercase tracking-[0.15em] text-xs mt-6 bg-black/50 px-4 py-2 rounded-full">Assista em 30 segundos</p>
        </div>
        <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1280" alt="App Preview" className="w-full h-full object-cover" />
      </div>

      <a href="#offer" className="inline-flex items-center gap-3 bg-pink-600 hover:bg-pink-700 text-white text-lg md:text-xl font-black py-6 px-12 rounded-2xl transition-all hover:-translate-y-1 shadow-2xl shadow-pink-500/40 uppercase tracking-tight">
        QUERO COMEÇAR AGORA <ArrowRight className="w-6 h-6" />
      </a>
      <p className="mt-6 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Acesso Vitalício + Atualizações Semanais</p>
    </div>
  </section>
);

const AppShowcase: React.FC = () => {
  const features = [
    {
      title: "Edição Instantânea",
      desc: "Altere nomes e temas com facilidade pelo smartphone.",
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: "Pronto para Imprimir",
      desc: "Arquivos em alta definição prontos para a sua impressora.",
      icon: <Download className="w-6 h-6" />
    },
    {
      title: "Zero Complexidade",
      desc: "Não precisa de Corel Draw, Photoshop ou Silhouette.",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">A LOJA DE MOLDES NO SEU BOLSO</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Design intuitivo para faturar alto com facilidade.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            {features.map((f, i) => (
              <div key={i} className="flex gap-5 p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                <div className="flex-shrink-0 bg-pink-50 p-4 rounded-2xl text-pink-500">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 mb-1 uppercase tracking-tight">{f.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center order-1 md:order-2">
            <div className="mobile-frame w-[300px] h-[610px] bg-slate-900 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-slate-800">
              <div className="absolute inset-0 bg-white overflow-y-auto no-scrollbar">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                     <div className="font-black text-lg tracking-tighter">MOLDES<span className="text-pink-500">PRO</span></div>
                     <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-40 bg-pink-50 rounded-2xl flex items-center justify-center">
                      <Layers className="text-pink-200 w-12 h-12" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <div className="aspect-square bg-white rounded-lg mb-2 shadow-sm"></div>
                          <div className="h-2 w-full bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-3">
            <div className="bg-slate-900 text-white p-8 rounded-[2rem] relative overflow-hidden group shadow-2xl">
               <h4 className="font-black mb-2 uppercase tracking-tight">O RESULTADO FINAL</h4>
               <p className="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">Do digital para as mãos do seu cliente.</p>
               <img src="https://images.unsplash.com/photo-1527202739749-f77db3653127?auto=format&fit=crop&q=80&w=600" alt="Resultado Final" className="w-full rounded-2xl object-cover h-56 group-hover:scale-105 transition-transform duration-700" />
               <div className="mt-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold uppercase tracking-widest">Qualidade Premium</span>
               </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
               <div className="flex -space-x-3">
                 <img src="https://i.pravatar.cc/100?u=1" className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="user" />
                 <img src="https://i.pravatar.cc/100?u=2" className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="user" />
                 <img src="https://i.pravatar.cc/100?u=3" className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="user" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-tight">+4.500 ALUNAS</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Faturando todos os dias</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Deliverables: React.FC = () => {
  const items = [
    { title: "App exclusivo com moldes prontos", desc: "Acesso a centenas de arquivos específicos para festas infantis.", icon: <Smartphone /> },
    { title: "Basta baixar, imprimir e montar", desc: "Processo ultra simplificado focado em quem não tem tempo a perder.", icon: <Printer /> },
    { title: "Nada de softwares complicados", desc: "Diga adeus à dor de cabeça com instalações ou edições difíceis.", icon: <Zap /> },
    { title: "Comece a vender esta semana", desc: "Estrutura pronta para você monetizar sua criatividade imediatamente.", icon: <ArrowRight /> },
  ];

  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter leading-tight">
            O QUE VOCÊ VAI TER ACESSO
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Simplicidade é a nossa maior tecnologia.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {items.map((item, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-slate-900 hover:text-white transition-all duration-300 group">
              <div className="bg-white text-pink-600 w-14 h-14 flex items-center justify-center rounded-2xl mb-8 shadow-sm group-hover:bg-pink-600 group-hover:text-white transition-all">
                {React.cloneElement(item.icon as React.ReactElement, { className: 'w-7 h-7' })}
              </div>
              <h4 className="text-lg font-black mb-4 uppercase tracking-tight leading-snug">{item.title}</h4>
              <p className="text-sm opacity-70 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-pink-50 border-2 border-pink-100 rounded-[2.5rem] p-10 md:p-14 text-center">
          <div className="inline-block p-4 bg-white rounded-2xl mb-6 shadow-sm">
             <Heart className="w-8 h-8 text-pink-500 fill-pink-50" />
          </div>
          <p className="text-xl md:text-2xl font-black text-slate-900 leading-relaxed max-w-3xl mx-auto italic">
            "Ideal para quem quer trabalhar de casa com algo <span className="text-pink-600">leve, criativo e lucrativo</span>."
          </p>
        </div>
      </div>
    </section>
  );
};

const ForYou: React.FC = () => {
  const points = [
    { text: "Quer renda extra mas não sabe por onde começar", icon: <Layers /> },
    { text: "Já sonhou em viver de papelaria, mas achou complicado demais", icon: <Star /> },
    { text: "Precisa de algo fácil, barato e rápido pra começar", icon: <Clock /> },
    { text: "Quer passar mais tempo com seus filhos e menos em trabalhos frustrantes", icon: <Home /> },
  ];

  return (
    <section className="py-24 bg-gray-50 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">ESSE APP É PARA VOCÊ QUE:</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {points.map((p, i) => (
            <div key={i} className="flex items-start gap-5 p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="flex-shrink-0 bg-slate-900 text-white p-3 rounded-xl">
                {React.cloneElement(p.icon as React.ReactElement, { className: 'w-5 h-5' })}
              </div>
              <p className="font-bold text-slate-700 leading-snug">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => (
  <section id="offer" className="py-24 bg-slate-900 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(236,72,153,0.3)] border border-white/10 relative">
        <div className="absolute top-8 right-8 hidden md:block">
           <div className="bg-pink-600 text-white px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest animate-pulse">
              Vagas Limitadas
           </div>
        </div>
        
        <div className="bg-pink-600 py-5 text-center">
          <span className="text-white font-black uppercase tracking-[0.25em] text-[10px]">OFERTA EXCLUSIVA DE HOJE</span>
        </div>
        
        <div className="p-10 md:p-20 text-center">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-[1.1]">Comece a Faturar Hoje</h3>
          <p className="text-slate-500 mb-12 font-bold uppercase tracking-widest text-xs">Acesso imediato a todo o ecossistema Papelaria Pro.</p>
          
          <div className="flex flex-col items-center mb-12">
            <span className="text-slate-300 line-through font-bold text-xl mb-2">De R$ 197,00</span>
            <div className="flex items-start">
              <span className="text-2xl font-black text-slate-900 mt-4 mr-2">R$</span>
              <span className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter">47</span>
              <div className="flex flex-col items-start justify-center ml-3 mt-2">
                <span className="text-4xl font-black text-slate-900">,00</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Pagamento Único</span>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-5 mb-14">
            <div className="flex items-center gap-4 text-slate-700 font-bold p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span>Acesso Vitalício ao App</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700 font-bold p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span>500+ Moldes Profissionais</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700 font-bold p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span>Sem Mensalidades Futuras</span>
            </div>
          </div>

          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xl md:text-2xl font-black py-8 rounded-[2rem] transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-slate-900/40 uppercase tracking-tight">
            QUERO O MEU ACESSO AGORA
          </button>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-10 opacity-60">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-slate-900" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Compra 100% Segura</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 text-yellow-500">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">7 Dias de Garantia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    { q: "Preciso de computador?", a: "Não! O aplicativo foi desenvolvido para que você faça tudo pelo seu celular, desde a edição até o envio para impressão." },
    { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação do pagamento, você recebe um e-mail com seus dados de login e senha para a plataforma." },
    { q: "E se eu não tiver impressora?", a: "Você pode salvar os arquivos e imprimir em gráficas rápidas ou papelarias da sua cidade. O lucro continua sendo alto!" },
    { q: "O pagamento é mensal?", a: "Não! O valor de R$ 47 é um pagamento único para acesso vitalício ao aplicativo e todas as atualizações." }
  ];

  return (
    <section className="py-24 bg-gray-50 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tight text-slate-900">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-7 text-left group"
              >
                <span className="font-black text-slate-800 uppercase tracking-tight text-sm">{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-pink-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openIndex === i ? 'max-h-40' : 'max-h-0'}`}>
                <div className="px-7 pb-7 text-sm text-slate-500 leading-relaxed font-medium">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="py-16 bg-white border-t border-gray-100 text-center px-4">
    <div className="max-w-6xl mx-auto">
      <span className="text-slate-900 font-black text-2xl tracking-tighter mb-6 block uppercase">PAPELARIA<span className="text-pink-500">PRO</span></span>
      <p className="text-slate-400 text-[10px] font-bold leading-relaxed max-w-2xl mx-auto uppercase tracking-[0.2em] mb-12">
        Este site não faz parte do Facebook ou Google. Além disso, este site não é endossado pelo Facebook ou Google de forma alguma. Facebook e Google são marcas comerciais de suas respectivas empresas.
      </p>
      <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
        <a href="#" className="hover:text-pink-500 transition-colors">Privacidade</a>
        <a href="#" className="hover:text-pink-500 transition-colors">Termos</a>
        <a href="#" className="hover:text-pink-500 transition-colors">Ajuda</a>
      </div>
      <p className="mt-12 text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2025 Papelaria Pro. Todos os direitos reservados.</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AppShowcase />
      <Deliverables />
      <ForYou />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default App;
