import { ArrowLeft, Beer, UtensilsCrossed, Flame, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Oferta {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  badgeColor?: string;
}

const ofertas: Oferta[] = [
  {
    id: 1,
    name: "Jarra de Cerveza Artesanal",
    description: "Jarra de 1 litro de cerveza artesanal cubana bien fría, espuma cremosa y sabor intenso",
    price: "$8.00",
    originalPrice: "$10.00",
    image: "/carta-jarra-cerveza.jpg",
    badge: "20% OFF",
    badgeColor: "bg-red-600"
  },
  {
    id: 2,
    name: "Cerveza Cristal Premium",
    description: "Botella de cerveza Cristal bien fría, la cerveza cubana por excelencia",
    price: "$3.50",
    image: "/carta-cerveza-botella.jpg"
  },
  {
    id: 3,
    name: "Costillas BBQ",
    description: "Costillas de cerdo tiernas bañadas en salsa barbacoa, con papas fritas y ensalada de col",
    price: "$14.00",
    originalPrice: "$18.00",
    image: "/carta-costillas.jpg",
    badge: "PROMO",
    badgeColor: "bg-orange-600"
  },
  {
    id: 4,
    name: "Picadera Cubana",
    description: "Tabla para compartir: croquetas, empanadas, tostones, yuca frita, chorizo y queso frito",
    price: "$16.00",
    originalPrice: "$22.00",
    image: "/carta-picadera.jpg",
    badge: "2x1",
    badgeColor: "bg-green-600"
  },
  {
    id: 5,
    name: "Hamburguesa Especial",
    description: "Hamburguesa de res con queso, tocino, vegetales frescos y papas fritas caseras",
    price: "$10.00",
    image: "/carta-hamburguesa.jpg"
  },
  {
    id: 6,
    name: "Alitas Picantes",
    description: "12 alitas estilo buffalo con salsa picante, apio, zanahoria y aderezo ranch",
    price: "$11.00",
    originalPrice: "$14.00",
    image: "/carta-alitas.jpg",
    badge: "HOT",
    badgeColor: "bg-red-500"
  },
  {
    id: 7,
    name: "Nachos Supremos",
    description: "Nachos con queso derretido, jalapeños, guacamole, crema agria y pico de gallo",
    price: "$9.00",
    image: "/carta-nachos.jpg"
  },
  {
    id: 8,
    name: "Pizza Cubana",
    description: "Pizza mediana con jamón, chorizo, pimientos y doble queso mozzarella",
    price: "$12.00",
    originalPrice: "$15.00",
    image: "/carta-pizza.jpg",
    badge: "OFERTA",
    badgeColor: "bg-purple-600"
  }
];

function OfertaCard({ item }: { item: Oferta }) {
  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/10">
      {item.badge && (
        <div className={`absolute top-4 right-4 ${item.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg`}>
          {item.badge}
        </div>
      )}
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
          <div className="text-right">
            {item.originalPrice && (
              <span className="text-zinc-500 text-sm line-through block">{item.originalPrice}</span>
            )}
            <span className="text-[#D4AF37] font-bold text-lg">{item.price}</span>
          </div>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

function Carta() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative bg-gradient-to-b from-zinc-900 to-black border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#D4AF37] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al Menú</span>
          </Link>
          
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-4">
              <Beer className="w-12 h-12 text-[#D4AF37]" />
              <UtensilsCrossed className="w-12 h-12 text-[#D4AF37]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-serif tracking-wide">
              La Carta
            </h1>
            <p className="text-xl text-zinc-400 italic font-light">
              "Ofertas especiales para compartir"
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="w-16 h-0.5 bg-[#D4AF37]"></span>
              <Flame className="w-5 h-5 text-[#D4AF37]" />
              <Percent className="w-5 h-5 text-[#D4AF37]" />
              <span className="w-16 h-0.5 bg-[#D4AF37]"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Promociones Destacadas */}
      <section className="bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-[#D4AF37]/20 border-y border-[#D4AF37]/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4 text-center">
            <div className="bg-black/50 px-6 py-3 rounded-lg border border-[#D4AF37]/30">
              <span className="text-[#D4AF37] font-bold text-lg">2x1</span>
              <span className="text-zinc-300 text-sm ml-2">en Picadera Cubana</span>
            </div>
            <div className="bg-black/50 px-6 py-3 rounded-lg border border-[#D4AF37]/30">
              <span className="text-[#D4AF37] font-bold text-lg">20% OFF</span>
              <span className="text-zinc-300 text-sm ml-2">en Jarras de Cerveza</span>
            </div>
            <div className="bg-black/50 px-6 py-3 rounded-lg border border-[#D4AF37]/30">
              <span className="text-[#D4AF37] font-bold text-lg">Happy Hour</span>
              <span className="text-zinc-300 text-sm ml-2">5PM - 8PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ofertas Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 font-serif">
            Nuestras Ofertas
          </h2>
          <p className="text-zinc-500">
            Las mejores promociones para disfrutar con amigos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ofertas.map((item) => (
            <OfertaCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-zinc-500 text-sm">
              * Las promociones no son acumulables. Válidas de lunes a jueves.
            </p>
            <p className="text-zinc-600 text-xs mt-2">
              © 2025 El Paladar. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Carta;
