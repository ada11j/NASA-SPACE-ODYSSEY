import { useState } from 'react';
import { motion } from 'framer-motion';
import { REFERENCE_CATEGORIES, REFERENCE_ITEMS } from '@/data/referencesData';
import type { ReferenceCategoryId, SectionId } from '@/types';

interface ReferencesSectionProps {
  onNavigateToSection?: (sectionId: SectionId) => void;
}

export function ReferencesSection({ onNavigateToSection }: ReferencesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ReferenceCategoryId | 'all'>('all');

  const visibleCategories =
    selectedCategory === 'all'
      ? REFERENCE_CATEGORIES
      : REFERENCE_CATEGORIES.filter((cat) => cat.id === selectedCategory);

  return (
    <section
      id="references"
      className="exploration-section exploration-section--references"
      aria-labelledby="references-heading"
    >
      {/* Secondary anchor alias for #kaynakca */}
      <div id="kaynakca" aria-hidden="true" />

      <div className="exploration-section__container">
        <motion.div
          className="exploration-section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <span className="exploration-section__eyebrow">
            BİLİMSEL DOĞRULAMA VE AKADEMİK ATIF DİZİNİ · 08
          </span>
          <h2 id="references-heading" className="exploration-section__title">
            KAYNAKÇA &amp; VERİ ARŞİVİ
          </h2>
          <p className="exploration-section__subtitle">
            Projede Kullanılan Resmi NASA Görev Sayfaları, Görsel Arşivler, Kurumsal Bilim Portalları
            ve 3D Modelleme Referansları
          </p>
          <p className="exploration-section__lead">
            HVB HORIZON — SILENT EXPLORERS platformunda yer alan tüm görev tarihleri, iniş
            koordinatları, bilimsel cihaz verileri, gerçek görev fotoğrafları ve prosedürel 3D model
            dokümantasyonu aşağıda kategorilerine göre şeffaf biçimde listelenmiştir.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div
          className="module-toolbar"
          role="tablist"
          aria-label="Kaynakça kategorilerini filtrele"
        >
          <div className="module-toolbar__group">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              className={`module-pill ${selectedCategory === 'all' ? 'module-pill--active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              Tüm Kaynaklar ({REFERENCE_ITEMS.length})
            </button>
            {REFERENCE_CATEGORIES.map((category) => {
              const count = REFERENCE_ITEMS.filter((it) => it.categoryId === category.id).length;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category.id}
                  className={`module-pill ${
                    selectedCategory === category.id ? 'module-pill--active' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.title} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Grouped Reference Categories */}
        <div className="references-categories-stack">
          {visibleCategories.map((category) => {
            const items = REFERENCE_ITEMS.filter((item) => item.categoryId === category.id);
            return (
              <div key={category.id} className="references-category-block">
                <div className="references-category-block__header">
                  <div>
                    <span className="references-category-block__code">{category.code}</span>
                    <h3 className="references-category-block__title">{category.title}</h3>
                  </div>
                  <p className="references-category-block__subtitle">{category.subtitle}</p>
                </div>

                <div className="references-grid">
                  {items.map((ref) => (
                    <article key={ref.id} className="reference-card">
                      <div className="reference-card__top">
                        <span className="reference-card__badge">{ref.badge}</span>
                        <span className="reference-card__access">
                          Erişim Tarihi: {ref.accessDate}
                        </span>
                      </div>

                      <h4 className="reference-card__title">{ref.title}</h4>
                      <p className="reference-card__org">{ref.organization}</p>
                      <p className="reference-card__desc">{ref.description}</p>

                      <div className="reference-card__usedIn">
                        <span className="reference-card__usedInLabel">Kullanıldığı Bölümler:</span>
                        <div className="reference-card__tags">
                          {ref.usedInSections.map((sec) => (
                            <span key={sec} className="reference-card__tagPill">
                              {sec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="reference-card__footer">
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="reference-card__link"
                        >
                          <span className="reference-card__urlText">{ref.url}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {onNavigateToSection ? (
          <div className="exploration-section__footerNav">
            <a
              href="#hero"
              className="section-jump-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToSection('hero');
              }}
            >
              <span>ANA EKRANA DÖN</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
