import { Instagram, Twitter, Linkedin } from 'lucide-react'

const footerLinks = {
  Produto: ['Recursos', 'Preços', 'Templates', 'Integrações', 'API'],
  Empresa: ['Sobre nós', 'Blog', 'Carreiras', 'Parceiros'],
  Suporte: ['Central de Ajuda', 'Documentação', 'Status', 'Changelog'],
}

const contactInfo = [
  'contato@shoppz.digital',
  '+55 (11) 99999-9999',
  'São Paulo, SP — Brasil',
]

export default function Footer() {
  return (
    <footer id="contato" className="bg-bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo + Desc */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                <span className="text-bg-deep font-extrabold text-sm">S</span>
              </div>
              <span className="text-base font-bold">
                Shoppz<span className="text-gold">Digital</span>
              </span>
            </a>
            <p className="text-sm text-white/30 leading-relaxed">
              A plataforma mais simples para criar sua loja online profissional.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/70 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/30 hover:text-gold transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 mb-4">
              Contato
            </h4>
            <ul className="space-y-2.5">
              {contactInfo.map((info) => (
                <li key={info} className="text-sm text-white/30">
                  {info}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Shoppz Digital. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-white/30 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-gold transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-gold transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
