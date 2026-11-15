import { useState } from 'react';
import type { ExplorerStoryItem } from '@/types';
import type { AdventureFlowConfig } from '@/data/stories/adventureFlowData';
import { EXPLORER_PEDAGOGY_DATA } from '@/data/stories/pedagogyData';

export function DiscoveryReportStage({
  story,
  flowConfig,
  inspectedPartIds,
  badgeEarned,
  lang,
  onGoToStage,
}: {
  story: ExplorerStoryItem;
  flowConfig: AdventureFlowConfig;
  inspectedPartIds: string[];
  badgeEarned: boolean;
  lang: 'tr' | 'en';
  onGoToStage: (stage: 1 | 2 | 3 | 4 | 5) => void;
}) {
  const pedagogy = EXPLORER_PEDAGOGY_DATA[story.id];
  const discoveredParts = flowConfig.robotParts.filter((p) =>
    inspectedPartIds.includes(p.id)
  );

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, 'a' | 'b' | 'c'>
  >({});
  const [openReflections, setOpenReflections] = useState<Record<string, boolean>>(
    {}
  );

  const answeredCount = pedagogy.postAssessment.filter(
    (q) => selectedAnswers[`${story.id}-${q.id}`] !== undefined
  ).length;
  const correctCount = pedagogy.postAssessment.filter(
    (q) => selectedAnswers[`${story.id}-${q.id}`] === q.correctId
  ).length;

  const learningOutcomes =
    lang === 'tr' ? pedagogy.learningOutcomesTr : pedagogy.learningOutcomesEn;
  const skills = lang === 'tr' ? pedagogy.skillsTr : pedagogy.skillsEn;

  const toggleReflection = (key: string) => {
    setOpenReflections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="story-first-panel">
      <div className="report-badge-banner">
        <div className="report-badge-banner__icon" aria-hidden="true">
          {story.badgeIcon}
        </div>
        <div className="report-badge-banner__info">
          <span className="adventure-discovery-tag">
            {badgeEarned
              ? lang === 'tr'
                ? 'ROZET KAZANILDI'
                : 'BADGE EARNED'
              : lang === 'tr'
              ? 'GÖREV DEVAM EDİYOR'
              : 'MISSION IN PROGRESS'}
          </span>
          <h4>{story.badgeTitle}</h4>
          <p>{story.badgeSubtitle}</p>
        </div>
        {!badgeEarned && (
          <button
            type="button"
            className="story-nav-btn"
            onClick={() => onGoToStage(4)}
          >
            {lang === 'tr' ? '3D Macerayı Tamamla →' : 'Complete 3D Mission →'}
          </button>
        )}
      </div>

      <div className="report-grid">
        {/* Completed Tasks */}
        <div className="report-card">
          <h5>{lang === 'tr' ? 'Tamamlanan Aşamalar' : 'Completed Stages'}</h5>
          <ul className="report-list">
            <li>
              ✓{' '}
              {lang === 'tr'
                ? '1. Kâşifin Hikâyesi incelendi'
                : '1. Explorer’s Story reviewed'}
            </li>
            <li>
              {discoveredParts.length > 0 ? '✓' : '◎'}{' '}
              {lang === 'tr'
                ? `2. Robotu Tanı (${discoveredParts.length}/${flowConfig.robotParts.length} ekipman)`
                : `2. Meet the Robot (${discoveredParts.length}/${flowConfig.robotParts.length} parts)`}
            </li>
            <li>
              ✓{' '}
              {lang === 'tr'
                ? '3. Göreve Hazırlık adımı'
                : '3. Mission Prep'}
            </li>
            <li>
              {badgeEarned ? '✓' : '◎'}{' '}
              {lang === 'tr'
                ? badgeEarned
                  ? '4. 3D Macera görevi tamamlandı'
                  : '4. 3D Macera (henüz tamamlanmadı)'
                : badgeEarned
                ? '4. 3D Adventure completed'
                : '4. 3D Adventure (in progress)'}
            </li>
          </ul>
        </div>

        {/* Discovered Equipment */}
        <div className="report-card">
          <h5>
            {lang === 'tr' ? 'Keşfedilen Ekipmanlar' : 'Discovered Equipment'}
          </h5>
          {discoveredParts.length > 0 ? (
            <ul className="report-list">
              {discoveredParts.map((part) => (
                <li key={part.id}>
                  ✓ {lang === 'tr' ? part.nameTr : part.nameEn}
                </li>
              ))}
            </ul>
          ) : (
            <p className="report-empty-note">
              {lang === 'tr'
                ? 'Henüz 2. aşamada 3D parçalara tıklamadın. İstediğin zaman geri dönüp inceleyebilirsin.'
                : 'No 3D parts inspected yet in Stage 2. You can jump back anytime to inspect them.'}
            </p>
          )}
        </div>
      </div>

      {/* Impact: Learning Outcomes, Skills, Problem & Technology Solution */}
      <div className="report-grid report-pedagogy-grid">
        <div className="report-card">
          <h5>
            {lang === 'tr'
              ? '🎯 Öğrenme Kazanımları & Beceriler'
              : '🎯 Learning Outcomes & Skills'}
          </h5>
          <ul className="report-list">
            {learningOutcomes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <div className="report-skill-chips">
            {skills.map((skill) => (
              <span key={skill} className="report-skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="report-card">
          <h5>
            {lang === 'tr'
              ? '⚙️ Karşılaşılan Problem & Teknoloji Çözümü'
              : '⚙️ Scientific Problem & Technology Solution'}
          </h5>
          <div className="report-problem-solution">
            <div className="report-ps-block">
              <span className="report-ps-label">
                {lang === 'tr' ? 'BİLİMSEL / MÜHENDİSLİK PROBLEMİ' : 'SCIENTIFIC / ENGINEERING PROBLEM'}
              </span>
              <p>{lang === 'tr' ? pedagogy.problemTr : pedagogy.problemEn}</p>
            </div>
            <div className="report-ps-block">
              <span className="report-ps-label">
                {lang === 'tr' ? 'GELİŞTİRİLEN TEKNOLOJİ ÇÖZÜMÜ' : 'TECHNOLOGY SOLUTION'}
              </span>
              <p>
                {lang === 'tr'
                  ? pedagogy.technologySolutionTr
                  : pedagogy.technologySolutionEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Validity: Contribution & Current Mission Status */}
      <div className="report-grid report-pedagogy-grid">
        <div className="report-card report-validity-card">
          <h5>
            {lang === 'tr'
              ? '🌍 Bu araç insanlığın uzay araştırmalarına ne kattı?'
              : '🌍 What did this vehicle contribute to human space exploration?'}
          </h5>
          <p className="report-validity-text">
            {lang === 'tr' ? pedagogy.contributionTr : pedagogy.contributionEn}
          </p>
        </div>

        <div className="report-card report-validity-card">
          <h5>
            {lang === 'tr'
              ? '📡 Bu aracın görevi bugün hangi durumda?'
              : '📡 What is this mission’s status today?'}
          </h5>
          <p className="report-validity-text">
            {lang === 'tr' ? pedagogy.currentStatusTr : pedagogy.currentStatusEn}
          </p>
        </div>
      </div>

      {/* Learned Scientific Facts */}
      <div className="report-card report-science-card">
        <h5>
          {lang === 'tr'
            ? 'Öğrenilen Bilimsel Bilgiler'
            : 'Key Scientific Takeaways'}
        </h5>
        <div className="report-science-grid">
          {story.discoveries.map((disc) => (
            <div key={disc.title} className="report-science-item">
              <strong>{disc.title}</strong>
              <p>{disc.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact: Post-Adventure Learning Assessment */}
      <div className="report-card report-assessment-card">
        <div className="report-assessment-header">
          <div>
            <span className="adventure-discovery-tag">
              {lang === 'tr' ? 'ÖĞRENME DEĞERLENDİRMESİ' : 'LEARNING ASSESSMENT'}
            </span>
            <h5>
              {lang === 'tr'
                ? 'Macera Sonu Kavram Kontrolü'
                : 'Post-Adventure Concept Check'}
            </h5>
          </div>
          <div className="report-assessment-score">
            {lang === 'tr'
              ? `Puan: ${correctCount}/${pedagogy.postAssessment.length} (${answeredCount}/${pedagogy.postAssessment.length} yanıtlandı)`
              : `Score: ${correctCount}/${pedagogy.postAssessment.length} (${answeredCount}/${pedagogy.postAssessment.length} answered)`}
          </div>
        </div>

        <div className="report-assessment-concepts">
          <span className="report-concepts-label">
            {lang === 'tr' ? 'Öğrenilen Kavramlar:' : 'Learned Concepts:'}
          </span>
          {pedagogy.postAssessment.map((q) => (
            <span key={q.id} className="report-concept-chip">
              {lang === 'tr' ? q.conceptTr : q.conceptEn}
            </span>
          ))}
        </div>

        <div className="report-assessment-questions">
          {pedagogy.postAssessment.map((q, index) => {
            const answerKey = `${story.id}-${q.id}`;
            const chosen = selectedAnswers[answerKey];
            const isCorrect = chosen === q.correctId;

            return (
              <div key={q.id} className="report-assessment-item">
                <p className="report-assessment-prompt">
                  <strong>{index + 1}.</strong>{' '}
                  {lang === 'tr' ? q.promptTr : q.promptEn}
                </p>
                <div className="report-assessment-options">
                  {q.options.map((opt) => {
                    const isSelected = chosen === opt.id;
                    const isRightOption = opt.id === q.correctId;
                    let stateClass = '';
                    if (chosen) {
                      if (isRightOption) stateClass = 'is-correct';
                      else if (isSelected) stateClass = 'is-wrong';
                    }
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`report-assessment-opt ${stateClass}`}
                        onClick={() =>
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [answerKey]: opt.id,
                          }))
                        }
                      >
                        <span className="report-opt-letter">
                          {opt.id.toUpperCase()}
                        </span>
                        <span>{lang === 'tr' ? opt.textTr : opt.textEn}</span>
                      </button>
                    );
                  })}
                </div>
                {chosen && (
                  <div
                    className={`report-assessment-feedback ${
                      isCorrect ? 'is-correct' : 'is-wrong'
                    }`}
                  >
                    <strong>
                      {isCorrect
                        ? lang === 'tr'
                          ? '✓ Doğru!'
                          : '✓ Correct!'
                        : lang === 'tr'
                        ? '✕ Tekrar Düşünelim:'
                        : '✕ Let’s Review:'}
                    </strong>{' '}
                    {isCorrect
                      ? lang === 'tr'
                        ? q.explainCorrectTr
                        : q.explainCorrectEn
                      : lang === 'tr'
                      ? q.explainWrongTr
                      : q.explainWrongEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Relevance: 4 Guided Reflection Questions */}
      <div className="report-card report-reflection-card">
        <h5>
          {lang === 'tr'
            ? '🧭 Görev Yansıması: 4 Temel Soru'
            : '🧭 Mission Reflection: 4 Core Questions'}
        </h5>
        <div className="report-reflection-list">
          {pedagogy.reflectionQuestions.map((rq, idx) => {
            const rKey = `${story.id}-ref-${idx}`;
            const isOpen = Boolean(openReflections[rKey]);
            return (
              <div key={rKey} className="report-reflection-item">
                <button
                  type="button"
                  className="report-reflection-toggle"
                  onClick={() => toggleReflection(rKey)}
                  aria-expanded={isOpen}
                >
                  <span>
                    {idx + 1}. {lang === 'tr' ? rq.questionTr : rq.questionEn}
                  </span>
                  <span className="report-reflection-chevron">
                    {isOpen
                      ? lang === 'tr'
                        ? 'Gizle −'
                        : 'Hide −'
                      : lang === 'tr'
                      ? 'Açıklamayı Gör +'
                      : 'Show Answer +'}
                  </span>
                </button>
                {isOpen && (
                  <p className="report-reflection-answer">
                    {lang === 'tr' ? rq.answerTr : rq.answerEn}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Validity: Official NASA / JPL Sources & Educational Disclaimer */}
      <div className="report-card report-sources-card">
        <h5>
          {lang === 'tr'
            ? '🔗 Resmî NASA / JPL Kaynakları & Bilimsel Doğruluk Notu'
            : '🔗 Official NASA / JPL Sources & Scientific Validity Note'}
        </h5>
        <div className="report-source-links">
          {pedagogy.officialSources.map((src) => (
            <a
              key={src.url}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="report-source-link"
            >
              <span className="report-source-agency">{src.agency}</span>
              <span>{lang === 'tr' ? src.titleTr : src.titleEn}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <p className="report-validity-disclaimer">
          {lang === 'tr'
            ? 'Not: Bu platform NASA ile bağlantılı olmayan bağımsız bir eğitim projesidir. 3D sürüş/uçuş sahneleri 13–15 yaş grubunun öğrenmesini kolaylaştırmak için basitleştirilmiş eğitsel simülasyonlardır; tarih, süre ve cihaz verileri yukarıdaki resmî NASA/JPL kaynaklarına dayanmaktadır.'
            : 'Note: This platform is an independent educational project and is not officially affiliated with or endorsed by NASA. The 3D driving/flight scenes are simplified educational simulations for ages 13–15, while mission dates, durations, and instrument facts are grounded in the official NASA/JPL sources above.'}
        </p>
      </div>

      <div className="report-actions">
        <button
          type="button"
          className="adventure-tool-btn"
          onClick={() => onGoToStage(1)}
        >
          📖 {lang === 'tr' ? 'Hikâyeyi Tekrar Oku' : 'Re-read Story'}
        </button>
        <button
          type="button"
          className="story-nav-btn"
          onClick={() => onGoToStage(4)}
        >
          🛸{' '}
          {lang === 'tr'
            ? badgeEarned
              ? '3D Sahnede Serbest Keşfe Dön'
              : '3D Maceraya Dön'
            : badgeEarned
            ? 'Return to 3D Free Exploration'
            : 'Return to 3D Adventure'}
        </button>
      </div>
    </div>
  );
}
