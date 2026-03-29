import { Link } from 'react-router';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/ui/card';
import { motion } from 'motion/react';
import { ChevronRight, Shield, Truck, Sparkles } from 'lucide-react';

export function PublicHome() {
  const { categories, subcategories, banners } = useData();
  
  const activeBanners = banners.filter(b => b.active).sort((a, b) => a.order - b.order);
  const mainBanner = activeBanners[0];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      {mainBanner && (
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={mainBanner.image}
              alt={mainBanner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
          
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-4">
                {mainBanner.title}
              </h1>
              {mainBanner.subtitle && (
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  {mainBanner.subtitle}
                </p>
              )}
              {mainBanner.link && (
                <Link
                  to={mainBanner.link}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Explorar Coleção
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Nossas Coleções
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Réplicas de alta qualidade das camisas mais icônicas do futebol mundial
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {categories.sort((a, b) => a.order - b.order).map((category, index) => {
              const categorySubcategories = subcategories
                .filter(sub => sub.categoryId === category.id)
                .sort((a, b) => a.order - b.order)
                .slice(0, 3);

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0">
                    <div className="p-8">
                      <h3 className="text-3xl text-gray-900 mb-6">
                        {category.name}
                      </h3>
                      
                      <div className="space-y-3">
                        {categorySubcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/subcategoria/${sub.slug}`}
                            className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group/item"
                          >
                            <span className="text-gray-700 group-hover/item:text-[#0D0678] transition-colors">
                              {sub.name}
                            </span>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover/item:text-[#0D0678] group-hover/item:translate-x-1 transition-all" />
                          </Link>
                        ))}
                        
                        <Link
                          to={`/categoria/${category.slug}`}
                          className="flex items-center justify-center p-4 mt-4 border-2 border-[#0D0678] text-[#0D0678] rounded-lg hover:bg-[#0D0678] hover:text-white transition-all"
                        >
                          Ver Todos
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0D0678]/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#0D0678]" />
              </div>
              <h4 className="text-xl text-gray-900 mb-3">Qualidade Premium</h4>
              <p className="text-gray-600">
                Réplicas Thai 1.1 com materiais de primeira linha e acabamento impecável
              </p>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0D0678]/10 flex items-center justify-center">
                <Truck className="w-8 h-8 text-[#0D0678]" />
              </div>
              <h4 className="text-xl text-gray-900 mb-3">Entrega Rápida</h4>
              <p className="text-gray-600">
                Enviamos para todo o Brasil com agilidade e segurança
              </p>
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0D0678]/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#0D0678]" />
              </div>
              <h4 className="text-xl text-gray-900 mb-3">Personalização</h4>
              <p className="text-gray-600">
                Adicione nome e número do seu jogador favorito na camisa
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0D0678] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl mb-6">
            Vista as Cores do Seu Time
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Encontre a camisa perfeita para torcer com estilo
          </p>
          <Link
            to={`/categoria/${categories[0]?.slug || 'selecoes'}`}
            className="inline-flex items-center gap-2 bg-white text-[#0D0678] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Começar a Comprar
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
