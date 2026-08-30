import { useState } from 'react';
import { glossaryData } from '../data/glossaryData';
import { useLanguage } from '../context/LanguageContext';
import { Search, Book } from 'lucide-react';

export default function Glossary() {
  const { lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  const terms = glossaryData[lang] || glossaryData['es'];
  
  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Book size={32} color="var(--accent-secondary)" />
        <h1 style={{ fontSize: '2rem' }}>
          {lang === 'es' ? 'Glosario Técnico Interactivo' : 'Interactive Technical Glossary'}
        </h1>
      </div>

      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        <Search size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text" 
          placeholder={lang === 'es' ? "Buscar término o concepto..." : "Search term or concept..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1rem 1rem 3rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-glass)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredTerms.length > 0 ? (
          filteredTerms.map((t, idx) => (
            <div key={idx} className="glass-card">
              <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                {t.term}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {t.definition}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            {lang === 'es' ? 'No se encontraron términos.' : 'No terms found.'}
          </p>
        )}
      </div>
    </div>
  );
}
