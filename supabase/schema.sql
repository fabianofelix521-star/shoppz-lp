-- =============================================================================
-- SHOPPZ DIGITAL LP - Supabase Schema
-- Project: lpshoppz (Landing Page + Admin Panel)
-- Generated: 2026-03-12
-- =============================================================================

-- ============================================
-- 1. TABLES
-- ============================================

-- Admin whitelist: only users in this table can edit site content
CREATE TABLE IF NOT EXISTS public.admin_users (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Single-row table storing ALL landing page content as JSONB
CREATE TABLE IF NOT EXISTS public.site_content (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content    JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- ============================================
-- 2. ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- ---------- site_content policies ----------

-- Anyone can read LP content (it's a public landing page)
CREATE POLICY "site_content_select_public"
  ON public.site_content FOR SELECT
  USING (true);

-- Only admin_users can insert
CREATE POLICY "site_content_insert_admin"
  ON public.site_content FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

-- Only admin_users can update
CREATE POLICY "site_content_update_admin"
  ON public.site_content FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

-- Only admin_users can delete
CREATE POLICY "site_content_delete_admin"
  ON public.site_content FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

-- ---------- admin_users policies ----------

-- Only existing admins can see the admin list
CREATE POLICY "admin_users_select_admin"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

-- Only super_admin can insert new admins
CREATE POLICY "admin_users_insert_super"
  ON public.admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Only super_admin can update admins
CREATE POLICY "admin_users_update_super"
  ON public.admin_users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'super_admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Only super_admin can delete admins
CREATE POLICY "admin_users_delete_super"
  ON public.admin_users FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'super_admin')
  );

-- ============================================
-- 3. STORAGE BUCKET + POLICIES
-- ============================================

-- Create public bucket for portfolio images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio',
  'portfolio',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Anyone can view portfolio images (public bucket)
CREATE POLICY "portfolio_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio');

-- Only admin_users can upload
CREATE POLICY "portfolio_insert_admin"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

-- Only admin_users can update (replace) files
CREATE POLICY "portfolio_update_admin"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'portfolio'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

-- Only admin_users can delete files
CREATE POLICY "portfolio_delete_admin"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'portfolio'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

-- ============================================
-- 4. FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at on site_content changes
CREATE OR REPLACE FUNCTION public.handle_site_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_site_content_updated
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_site_content_updated_at();

-- ============================================
-- 5. SEED DATA
-- ============================================

INSERT INTO public.site_content (content) VALUES (
  '{
    "navbar": {
      "logoText": "Shoppz.",
      "logoAccent": "DIGITAL",
      "links": [
        { "label": "Início", "href": "#" },
        { "label": "Recursos", "href": "#features" },
        { "label": "Portfólio", "href": "#portfolio" },
        { "label": "Depoimentos", "href": "#testimonials" },
        { "label": "Contato", "href": "#contact" }
      ],
      "ctaText": "Falar com Especialista",
      "ctaWhatsapp": "https://wa.me/5511999999999?text=Olá! Tenho interesse em criar minha loja online premium."
    },
    "hero": {
      "badge": "Loja Premium em 7 Dias",
      "titleLine1": "Sua Loja Online Premium",
      "titleLine2": "que Realmente Vende",
      "description": "Design exclusivo, integração completa e suporte especializado. Transformamos sua visão em resultados reais com tecnologia de ponta.",
      "ctaPrimaryText": "Criar Minha Loja Agora",
      "ctaSecondaryText": "Ver Cases de Sucesso",
      "whatsappUrl": "https://wa.me/5511999999999?text=Olá! Quero criar minha loja online premium com a Shoppz Digital.",
      "stats": [
        { "value": "500+", "label": "LOJAS CRIADAS" },
        { "value": "R$10M+", "label": "FATURAMENTO CLIENTES" },
        { "value": "98%", "label": "SATISFAÇÃO" }
      ],
      "phones": [
        {
          "storeName": "LUXE STORE",
          "category": "Fashion & Lifestyle",
          "imageUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop&q=80",
          "price": "R$ 299"
        },
        {
          "storeName": "TECH SHOP",
          "category": "Eletrônicos",
          "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop&q=80",
          "price": "R$ 499"
        },
        {
          "storeName": "GLOW BEAUTY",
          "category": "Cosméticos",
          "imageUrl": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop&q=80",
          "price": "R$ 189"
        }
      ],
      "statsBar": [
        { "label": "500+ Lojas Online Criadas" },
        { "label": "R$10M+ Faturamento dos Clientes" },
        { "label": "350% Aumento Médio em Vendas" },
        { "label": "98% Taxa de Satisfação" }
      ]
    },
    "features": {
      "sectionLabel": "Por Que Escolher",
      "title": "Tudo Que Sua Loja Precisa",
      "subtitle": "Tecnologia de ponta, design premium e suporte especializado para impulsionar suas vendas online.",
      "items": [
        { "icon": "Palette", "title": "Design Exclusivo", "description": "Layouts premium personalizados que refletem a identidade única da sua marca." },
        { "icon": "Zap", "title": "Performance Máxima", "description": "Sites ultra-rápidos otimizados para conversão e experiência do usuário." },
        { "icon": "Headphones", "title": "Suporte Dedicado", "description": "Equipe especializada disponível para ajudar você a crescer." },
        { "icon": "Search", "title": "SEO Otimizado", "description": "Configuração profissional para ranquear no Google e atrair clientes." },
        { "icon": "Shield", "title": "Segurança Total", "description": "Certificado SSL, backups automáticos e proteção contra fraudes." },
        { "icon": "Smartphone", "title": "Mobile-First", "description": "Perfeito em todos os dispositivos, do celular ao desktop." }
      ]
    },
    "portfolio": {
      "sectionLabel": "Portfólio",
      "title": "Lojas Premium que Vendem",
      "subtitle": "Veja alguns exemplos de lojas criadas com nossa plataforma e os resultados impressionantes.",
      "stores": [
        { "name": "Loja de Moda", "badge": "FASHION & LIFESTYLE", "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80", "link": "#", "sales": "+280%", "visits": "15K/mês" },
        { "name": "Tech Store", "badge": "ELETRÔNICOS", "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&q=80", "link": "#", "sales": "+350%", "visits": "22K/mês" },
        { "name": "Beauty Shop", "badge": "COSMÉTICOS", "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&q=80", "link": "#", "sales": "+420%", "visits": "18K/mês" },
        { "name": "Home Decor", "badge": "DECORAÇÃO", "image": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop&q=80", "link": "#", "sales": "+190%", "visits": "12K/mês" },
        { "name": "Fitness Store", "badge": "ESPORTES", "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80", "link": "#", "sales": "+310%", "visits": "19K/mês" },
        { "name": "Pet Shop", "badge": "ANIMAIS", "image": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop&q=80", "link": "#", "sales": "+265%", "visits": "14K/mês" }
      ]
    },
    "testimonials": {
      "sectionLabel": "Depoimentos",
      "title": "Histórias de Sucesso",
      "subtitle": "Veja o que nossos clientes dizem sobre as lojas que criamos para eles.",
      "items": [
        { "text": "A Shoppz Digital transformou completamente meu negócio. Em 3 meses aumentei minhas vendas em 280% e hoje faturamos mais de R$150K por mês.", "name": "Carolina Santos", "role": "Fundadora, Luxe Fashion", "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80", "stars": 5 },
        { "text": "Design impecável, performance incrível e suporte sempre disponível. Nossa conversão dobrou e o ticket médio aumentou 45%. Melhor investimento que fizemos!", "name": "Roberto Almeida", "role": "CEO, Tech Haven", "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80", "stars": 5 },
        { "text": "Profissionalismo do início ao fim. A loja ficou linda, as integrações funcionam perfeitamente e o retorno sobre investimento foi absurdo. Super recomendo!", "name": "Mariana Costa", "role": "Proprietária, Glow Beauty", "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80", "stars": 5 }
      ]
    },
    "integrations": {
      "sectionLabel": "Integrações",
      "title": "Tecnologias Premium",
      "subtitle": "Trabalhamos com as melhores plataformas e ferramentas do mercado.",
      "items": [
        { "icon": "CreditCard", "name": "Stripe", "description": "Pagamentos Seguros" },
        { "icon": "Globe", "name": "PayPal", "description": "Checkout Global" },
        { "icon": "BarChart3", "name": "Google Analytics", "description": "Análise de Dados" },
        { "icon": "Wallet", "name": "Mercado Pago", "description": "Gateway BR" },
        { "icon": "Target", "name": "Meta Pixel", "description": "Marketing" },
        { "icon": "Cloud", "name": "AWS", "description": "Cloud Hosting" }
      ],
      "compliance": [
        { "icon": "Lock", "label": "SSL Certificado" },
        { "icon": "Shield", "label": "PCI Compliance" },
        { "icon": "FileCheck", "label": "LGPD Compliant" },
        { "icon": "Award", "label": "ISO 27001" }
      ]
    },
    "ctaFinal": {
      "titleLine1": "Pronto Para Transformar",
      "titleLine2": "Seu Negócio?",
      "subtitle": "Entre em contato agora e descubra como podemos criar a loja online perfeita para você.",
      "buttonText": "Falar com um Especialista Agora",
      "whatsappUrl": "https://wa.me/5511999999999?text=Olá! Quero criar minha loja online premium com a Shoppz Digital."
    },
    "footer": {
      "brandDescription": "Transformamos negócios em sucessos digitais. Criamos lojas online premium que realmente vendem.",
      "contact": {
        "email": "contato@shoppzdigital.com.br",
        "phone": "(11) 99999-9999",
        "address": "São Paulo, SP - Brasil"
      },
      "social": {
        "instagram": "https://instagram.com/shoppzdigital",
        "facebook": "https://facebook.com/shoppzdigital",
        "linkedin": "https://linkedin.com/company/shoppzdigital"
      },
      "copyright": "© 2024 Shoppz Digital. Todos os direitos reservados.",
      "quickLinks": [
        { "label": "Início", "href": "#" },
        { "label": "Recursos", "href": "#features" },
        { "label": "Portfólio", "href": "#portfolio" },
        { "label": "Contato", "href": "#contact" }
      ]
    }
  }'::jsonb
);
