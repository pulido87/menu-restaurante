import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UtensilsCrossed, Wine, ChefHat, Phone, MapPin, Clock, ScrollText, ArrowRight } from 'lucide-react';
import './App.css';
import Carta from './pages/Carta';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const platos: MenuItem[] = [
  {
    id: 1,
    name: "Ropa Vieja",
    description: "Carne deshebrada en salsa de tomate con pimientos y cebolla, servida con arroz blanco, plátanos maduros fritos y frijoles negros",
    price: "$12.50",
    image: "/plato-ropa-vieja.jpg"
  },
  {
    id: 2,
    name: "Lechón Asado",
    description: "Cerdo tierno y jugoso con piel crujiente dorada, acompañado de arroz congri y yuca con mojo",
    price: "$15.00",
    image: "/plato-lechon.jpg"
  },
  {
    id: 3,
    name: "Arroz con Mariscos",
    description: "Arroz amarillo con camarones, langostinos, mejillones y calamares, sazonado con azafrán y verduras",
    price: "$18.50",
    image: "/plato-mariscos.jpg"
  },
  {
    id: 4,
    name: "Pollo a la Plancha",
    description: "Pechuga de pollo jugosa a la parrilla con limón, acompañada de ensalada de aguacate, arroz moro y tostones",
    price: "$11.00",
    image: "/plato-pollo.jpg"
  }
];

const bebidas: MenuItem[] = [
  {
    id: 1,
    name: "Mojito Cubano",
    description: "Ron blanco, soda, azúcar, lima fresca y abundantes hojas de menta - el clásico refrescante",
    price: "$6.50",
    image: "/bebida-mojito.jpg"
  },
  {
    id: 2,
    name: "Daiquirí",
    description: "Cóctel de ron blanco con lima y azúcar, servido frozen con frutas tropicales",
    price: "$7.00",
    image: "/bebida-daiquiri.jpg"
  },
  {
    id: 3,
    name: "Cuba Libre",
    description: "Ron oscuro, Coca-Cola y lima - el sabor de Cuba en cada sorbo",
    price: "$5.50",
    image: "/bebida-cuba-libre.jpg"
  },
  {
    id: 4,
    name: "Jugo de Guayaba",
    description: "Jugo natural de guayaba fresca, dulce y refrescante, servido con hielo",
    price: "$3.50",
    image: "/bebida-jugo.jpg"
  }
];

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/10">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-white font-serif">{item.name}</h3>
          <span className="text-[#D4AF37] font-bold text-lg">{item.price}</span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

function Home() {
  const [activeTab, setActiveTab] = useState<'platos' | 'bebidas'>('platos');

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative bg-gradient-to-b from-zinc-900 to-black border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <div className="flex justify-center mb-4">
            <ChefHat className="w-16 h-16 text-[#D4AF37]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-serif tracking-wide">
            El Paladar
          </h1>
          <p className="text-xl text-zinc-400 italic font-light">
            "Sabor auténtico cubano"
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="w-16 h-0.5 bg-[#D4AF37]"></span>
            <span className="w-3 h-0.5 bg-[#D4AF37]"></span>
            <span className="w-3 h-0.5 bg-[#D4AF37]"></span>
            <span className="w-16 h-0.5 bg-[#D4AF37]"></span>
          </div>
          
          {/* Botón La Carta */}
          <div className="mt-8">
            <Link 
              to="/carta"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-black font-bold px-8 py-4 rounded-full hover:from-[#E5C048] hover:to-[#C9A71D] transition-all duration-300 shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 hover:scale-105"
            >
              <ScrollText className="w-6 h-6" />
              <span className="text-lg">Ver La Carta</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-zinc-500 text-sm mt-3">
              Descubre nuestras ofertas especiales: cervezas, costillas y más
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-8">
            <button
              onClick={() => setActiveTab('platos')}
              className={`flex items-center gap-2 py-4 px-6 font-medium transition-all duration-300 border-b-2 ${
                activeTab === 'platos'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>Platos</span>
            </button>
            <button
              onClick={() => setActiveTab('bebidas')}
              className={`flex items-center gap-2 py-4 px-6 font-medium transition-all duration-300 border-b-2 ${
                activeTab === 'bebidas'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Wine className="w-5 h-5" />
              <span>Bebidas</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 font-serif">
            {activeTab === 'platos' ? 'Nuestros Platos' : 'Nuestras Bebidas'}
          </h2>
          <p className="text-zinc-500">
            {activeTab === 'platos' 
              ? 'Delicias de la cocina tradicional cubana' 
              : 'Refrescos y cócteles para todos los gustos'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(activeTab === 'platos' ? platos : bebidas).map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold text-[#D4AF37] mb-4 font-serif">El Paladar</h3>
              <p className="text-zinc-400 text-sm">
                Tradición culinaria cubana en cada plato. Sabores auténticos que te transportan a la isla.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>+53 7 123 4567</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Calle Obispo #123, La Habana</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Horario</h4>
              <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>Lun - Dom: 12:00 PM - 10:00 PM</span>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
            <p className="text-zinc-500 text-sm">
              © 2025 El Paladar. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carta" element={<Carta />} />
      </Routes>
    </Router>
  );
}

export default App;
