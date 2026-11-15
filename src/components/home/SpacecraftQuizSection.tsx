import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { LocaleBundle } from '@/locales/tr';
import type { QuizOptionKey, SectionId } from '@/types';

interface SpacecraftQuizSectionProps {
  onNavigateToSection?: (sectionId: SectionId) => void;
}

function getExplorerRank(
  score: number,
  ranks: LocaleBundle['ui']['spacecraftQuiz']['ranks'],
  lang: 'tr' | 'en'
): {
  badge: string;
  title: string;
  message: string;
  color: string;
} {
  if (score >= 9) {
    return {
      badge: lang === 'en' ? 'TIER 01 · FLIGHT DIRECTOR' : 'SEVİYE 01 · GÖREV DİREKTÖRÜ',
      title: ranks.elite.rank,
      message: ranks.elite.message,
      color: '#34d399',
    };
  }
  if (score >= 7) {
    return {
      badge: lang === 'en' ? 'TIER 02 · SENIOR ENGINEER' : 'SEVİYE 02 · KIDEMLİ KEŞİF MÜHENDİSİ',
      title: ranks.senior.rank,
      message: ranks.senior.message,
      color: '#38bdf8',
    };
  }
  if (score >= 5) {
    return {
      badge: lang === 'en' ? 'TIER 03 · SURFACE RESEARCHER' : 'SEVİYE 03 · YÜZEY ARAŞTIRMACISI',
      title: ranks.navigator.rank,
      message: ranks.navigator.message,
      color: '#f59e0b',
    };
  }
  return {
    badge: lang === 'en' ? 'TIER 04 · CADET EXPLORER' : 'SEVİYE 04 · ADAY UZAY KAŞİFİ',
    title: ranks.cadet.rank,
    message: ranks.cadet.message,
    color: '#fb923c',
  };
}

export function SpacecraftQuizSection({ onNavigateToSection }: SpacecraftQuizSectionProps) {
  const { lang, t } = useLanguage();
  const qUi = t.ui.spacecraftQuiz;
  const quizGroups = t.data.spacecraftQuizGroups;

  const allQuestions = useMemo(
    () => quizGroups.flatMap((group) => group.questions),
    [quizGroups]
  );
  const totalQuestions = allQuestions.length;

  const [selectedAnswers, setSelectedAnswers] = useState<
    Partial<Record<string, QuizOptionKey>>
  >({});
  const sectionTopRef = useRef<HTMLDivElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = allQuestions.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctOption ? acc + 1 : acc;
  }, 0);
  const wrongCount = answeredCount - correctCount;
  const score = correctCount; // 1 point per correct answer, out of 10
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const isCompleted = totalQuestions > 0 && answeredCount === totalQuestions;

  const handleSelectOption = useCallback(
    (questionId: string, optionKey: QuizOptionKey) => {
      setSelectedAnswers((prev) => {
        // Lock answer once selected: user cannot re-answer the same question
        if (prev[questionId] !== undefined) {
          return prev;
        }
        const next = { ...prev, [questionId]: optionKey };
        if (Object.keys(next).length === totalQuestions) {
          window.setTimeout(() => {
            resultCardRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }, 260);
        }
        return next;
      });
    },
    [totalQuestions]
  );

  const handleRestartQuiz = useCallback(() => {
    setSelectedAnswers({});
    sectionTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const scrollToQuestion = useCallback((questionId: string) => {
    const el = document.getElementById(`question-card-${questionId}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const rankInfo = getExplorerRank(score, qUi.ranks, lang);

  return (
    <section
      id="spacecraft-quiz"
      className="exploration-section exploration-section--quiz"
      aria-labelledby="spacecraft-quiz-heading"
    >
      <div id="bilgi-yarismasi" ref={sectionTopRef} aria-hidden="true" />

      <div className="exploration-section__container">
        {/* Section Header */}
        <motion.div
          className="exploration-section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <span className="exploration-section__eyebrow">
            {qUi.eyebrow}
          </span>
          <h2 id="spacecraft-quiz-heading" className="exploration-section__title">
            {qUi.title}
          </h2>
          <p className="exploration-section__subtitle">
            {qUi.subtitle}
          </p>
          <p className="exploration-section__lead">
            {qUi.description}
          </p>
        </motion.div>

        {/* Live Telemetry Score & Progress HUD Bar */}
        <div
          className="quiz-telemetry-hud"
          role="region"
          aria-label={qUi.progressAriaLabel}
          aria-live="polite"
        >
          <div className="quiz-telemetry-hud__top">
            <div className="quiz-telemetry-hud__stats">
              <div className="quiz-stat-pill">
                <span className="quiz-stat-pill__label">{qUi.hudAnsweredLabel}</span>
                <strong className="quiz-stat-pill__value">
                  {answeredCount} / {totalQuestions}
                </strong>
              </div>
              <div className="quiz-stat-pill quiz-stat-pill--correct">
                <span className="quiz-stat-pill__label">{qUi.hudCorrectLabel}</span>
                <strong className="quiz-stat-pill__value">{correctCount}</strong>
              </div>
              <div className="quiz-stat-pill quiz-stat-pill--wrong">
                <span className="quiz-stat-pill__label">{qUi.hudWrongLabel}</span>
                <strong className="quiz-stat-pill__value">{wrongCount}</strong>
              </div>
              <div className="quiz-stat-pill quiz-stat-pill--score">
                <span className="quiz-stat-pill__label">{qUi.hudScoreLabel}</span>
                <strong className="quiz-stat-pill__value">{score} / {totalQuestions}</strong>
              </div>
            </div>

            <div className="quiz-telemetry-hud__actions">
              <span className="quiz-telemetry-hud__percent">
                {lang === 'en' ? `Progress: ${progressPercent}%` : `İlerleme: %${progressPercent}`}
              </span>
              <button
                type="button"
                className="quiz-reset-btn"
                onClick={handleRestartQuiz}
                disabled={answeredCount === 0}
                aria-label={qUi.hudResetBtn}
              >
                ↺ {qUi.hudResetBtn}
              </button>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div
            className="quiz-progress-track"
            role="progressbar"
            aria-valuenow={answeredCount}
            aria-valuemin={0}
            aria-valuemax={totalQuestions}
            aria-label={qUi.progressAriaLabel}
          >
            <motion.div
              className="quiz-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>

          {/* 10 Question Quick-Jump Step Dots */}
          <div className="quiz-step-dots" aria-label={qUi.progressAriaLabel}>
            {allQuestions.map((q) => {
              const chosen = selectedAnswers[q.id];
              const isAnswered = chosen !== undefined;
              const isCorrect = isAnswered && chosen === q.correctOption;
              const statusClass = !isAnswered
                ? ''
                : isCorrect
                  ? 'quiz-step-dot--correct'
                  : 'quiz-step-dot--wrong';

              const statusText = !isAnswered
                ? lang === 'en'
                  ? 'Unanswered'
                  : 'Cevaplanmadı'
                : isCorrect
                  ? lang === 'en'
                    ? 'Correct'
                    : 'Doğru'
                  : lang === 'en'
                    ? 'Incorrect'
                    : 'Yanlış';

              return (
                <button
                  key={q.id}
                  type="button"
                  className={`quiz-step-dot ${statusClass}`}
                  onClick={() => scrollToQuestion(q.id)}
                  title={`${qUi.progressQuestionsPrefix} ${q.questionNumber} (${statusText})`}
                  aria-label={`${qUi.progressQuestionsPrefix} ${q.questionNumber} (${statusText})`}
                >
                  <span>{q.questionNumber}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5 Spacecraft Groups (2 Questions per Spacecraft) */}
        <div className="quiz-groups-stack">
          {quizGroups.map((group) => {
            const groupAnsweredCount = group.questions.filter(
              (q) => selectedAnswers[q.id] !== undefined
            ).length;

            return (
              <div
                key={group.id}
                className="quiz-spacecraft-group"
                style={
                  {
                    '--quiz-group-accent': group.accentColor,
                  } as React.CSSProperties
                }
              >
                {/* Spacecraft Group Banner Header */}
                <div className="quiz-spacecraft-group__header">
                  <div className="quiz-spacecraft-group__titleWrap">
                    <div className="quiz-spacecraft-group__badgeRow">
                      <span
                        className="quiz-spacecraft-group__badge"
                        style={{
                          borderColor: group.accentColor,
                          color: group.accentColor,
                        }}
                      >
                        {group.badge}
                      </span>
                      <span className="quiz-spacecraft-group__progressTag">
                        {groupAnsweredCount} / {group.questions.length}{' '}
                        {lang === 'en' ? 'Questions Answered' : 'Soru Cevaplandı'}
                      </span>
                    </div>
                    <h3 className="quiz-spacecraft-group__title">{group.title}</h3>
                    <p className="quiz-spacecraft-group__subtitle">{group.subtitle}</p>
                  </div>
                </div>

                {/* 2 Questions Inside This Spacecraft Group */}
                <div className="quiz-questions-grid">
                  {group.questions.map((question) => {
                    const userChoice = selectedAnswers[question.id];
                    const isAnswered = userChoice !== undefined;
                    const isUserCorrect =
                      isAnswered && userChoice === question.correctOption;

                    return (
                      <motion.article
                        key={question.id}
                        id={`question-card-${question.id}`}
                        className={`quiz-question-card ${
                          isAnswered
                            ? isUserCorrect
                              ? 'quiz-question-card--correct'
                              : 'quiz-question-card--wrong'
                            : ''
                        }`}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                      >
                        <div className="quiz-question-card__top">
                          <span className="quiz-question-card__number">
                            {qUi.questionNumberPrefix} {question.questionNumber} / {totalQuestions}
                          </span>

                          {!isAnswered ? (
                            <span className="quiz-question-card__status quiz-question-card__status--pending">
                              ● {qUi.statusPendingBadge}
                            </span>
                          ) : isUserCorrect ? (
                            <span className="quiz-question-card__status quiz-question-card__status--correct">
                              {qUi.statusCorrectBadge}
                            </span>
                          ) : (
                            <span className="quiz-question-card__status quiz-question-card__status--wrong">
                              {qUi.statusWrongBadge}
                            </span>
                          )}
                        </div>

                        <h4 className="quiz-question-card__prompt">
                          <span className="quiz-question-card__qPrefix">
                            {qUi.progressQuestionsPrefix} {question.questionNumber}
                          </span>{' '}
                          {question.prompt}
                        </h4>

                        {/* 4 Option Cards (A, B, C, D) */}
                        <div
                          className="quiz-options-list"
                          role="radiogroup"
                          aria-label={`${qUi.questionNumberPrefix} ${question.questionNumber}`}
                        >
                          {question.options.map((option) => {
                            const isSelected = userChoice === option.key;
                            const isCorrectOption =
                              option.key === question.correctOption;

                            let optionStateClass = '';
                            if (isAnswered) {
                              if (isSelected && isCorrectOption) {
                                optionStateClass = 'quiz-option-btn--correct';
                              } else if (isSelected && !isCorrectOption) {
                                optionStateClass = 'quiz-option-btn--wrong';
                              } else if (!isSelected && isCorrectOption) {
                                optionStateClass = 'quiz-option-btn--correct-reveal';
                              } else {
                                optionStateClass = 'quiz-option-btn--dimmed';
                              }
                            }

                            return (
                              <motion.button
                                key={option.key}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                disabled={isAnswered}
                                className={`quiz-option-btn ${optionStateClass}`}
                                onClick={() =>
                                  handleSelectOption(question.id, option.key)
                                }
                                whileHover={
                                  !isAnswered ? { scale: 1.01, x: 4 } : undefined
                                }
                                whileTap={
                                  !isAnswered ? { scale: 0.99 } : undefined
                                }
                                animate={
                                  isAnswered && isSelected && !isCorrectOption
                                    ? { x: [0, -6, 6, -4, 4, 0] }
                                    : isAnswered && isSelected && isCorrectOption
                                      ? { scale: [1, 1.02, 1] }
                                      : undefined
                                }
                                transition={{ duration: 0.32 }}
                              >
                                <span className="quiz-option-btn__key">
                                  {option.key}
                                </span>
                                <span className="quiz-option-btn__text">
                                  {option.text}
                                </span>

                                {isAnswered && isSelected && isCorrectOption ? (
                                  <span className="quiz-option-btn__tag quiz-option-btn__tag--correct">
                                    ✓ {lang === 'en' ? 'Your Choice' : 'Doğru Seçim'}
                                  </span>
                                ) : null}

                                {isAnswered && isSelected && !isCorrectOption ? (
                                  <span className="quiz-option-btn__tag quiz-option-btn__tag--wrong">
                                    ✕ {lang === 'en' ? 'Your Choice' : 'Sizin Seçiminiz'}
                                  </span>
                                ) : null}

                                {isAnswered && !isSelected && isCorrectOption ? (
                                  <span className="quiz-option-btn__tag quiz-option-btn__tag--reveal">
                                    ✓ {lang === 'en' ? 'Correct' : 'Doğru Cevap'} ({question.correctOption})
                                  </span>
                                ) : null}
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Feedback & Explanation Box (Locked once answered) */}
                        <AnimatePresence>
                          {isAnswered ? (
                            <motion.div
                              key={`feedback-${question.id}`}
                              className={`quiz-feedback-box ${
                                isUserCorrect
                                  ? 'quiz-feedback-box--correct'
                                  : 'quiz-feedback-box--wrong'
                              }`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                              role="status"
                            >
                              <div className="quiz-feedback-box__header">
                                {isUserCorrect ? (
                                  <strong>{qUi.feedbackCorrectBanner}</strong>
                                ) : (
                                  <strong>
                                    ✕ {qUi.feedbackWrongBannerPrefix} {question.correctOption}
                                  </strong>
                                )}
                              </div>
                              <p className="quiz-feedback-box__explanation">
                                <span>
                                  {isUserCorrect
                                    ? qUi.explanationHeadingCorrect
                                    : qUi.explanationHeadingWrong}
                                </span>{' '}
                                {question.explanation}
                              </p>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Quiz Result Screen (Opens automatically when all 10 questions are answered) */}
        <AnimatePresence>
          {isCompleted ? (
            <motion.div
              ref={resultCardRef}
              id="quiz-result-panel"
              className="quiz-result-card"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              role="region"
              aria-labelledby="quiz-result-heading"
            >
              <div className="quiz-result-card__badgeRow">
                <span
                  className="quiz-result-card__rankBadge"
                  style={{
                    borderColor: rankInfo.color,
                    color: rankInfo.color,
                  }}
                >
                  {rankInfo.badge}
                </span>
                <span className="quiz-result-card__completeTag">
                  🏁 {qUi.resultEyebrow}
                </span>
              </div>

              <h3 id="quiz-result-heading" className="quiz-result-card__title">
                {rankInfo.title}
              </h3>
              <p className="quiz-result-card__message">{rankInfo.message}</p>

              {/* Score Summary Metrics Grid */}
              <div className="quiz-result-card__metrics">
                <div className="quiz-result-metric quiz-result-metric--score">
                  <span>{qUi.hudScoreLabel}</span>
                  <strong>{score} / {totalQuestions}</strong>
                  <small>{qUi.resultScoreSub}</small>
                </div>
                <div className="quiz-result-metric quiz-result-metric--correct">
                  <span>{qUi.resultCorrectCountLabel}</span>
                  <strong>{correctCount}</strong>
                  <small>
                    {lang === 'en' ? '+1 point per correct answer' : 'Her doğru cevap +1 puan'}
                  </small>
                </div>
                <div className="quiz-result-metric quiz-result-metric--wrong">
                  <span>{qUi.resultWrongCountLabel}</span>
                  <strong>{wrongCount}</strong>
                  <small>
                    {lang === 'en' ? 'Explanations shown on cards' : 'Açıklamalar soru kartlarında'}
                  </small>
                </div>
              </div>

              {/* Per-Spacecraft Score Breakdown */}
              <div className="quiz-result-card__breakdown">
                {quizGroups.map((g) => {
                  const groupCorrect = g.questions.filter(
                    (q) => selectedAnswers[q.id] === q.correctOption
                  ).length;
                  return (
                    <div key={`res-${g.id}`} className="quiz-result-chip">
                      <span>{g.title.replace(/^\d+\.\s*(UZAY ARACI|SPACECRAFT):\s*/i, '')}</span>
                      <strong
                        style={{
                          color:
                            groupCorrect === 2
                              ? '#34d399'
                              : groupCorrect === 1
                                ? '#fbbf24'
                                : '#f87171',
                        }}
                      >
                        {groupCorrect} / {g.questions.length}{' '}
                        {lang === 'en' ? 'Correct' : 'Doğru'}
                      </strong>
                    </div>
                  );
                })}
              </div>

              <div className="quiz-result-card__actions">
                <button
                  type="button"
                  className="btn btn--primary quiz-result-card__restartBtn"
                  onClick={handleRestartQuiz}
                >
                  ↻ {qUi.resultRestartBtn}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Section Footer Jump Links */}
        {onNavigateToSection ? (
          <div className="exploration-section__footerNav">
            <a
              href="#references"
              className="section-jump-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToSection('references');
              }}
            >
              <span>{t.ui.nav.links.references}</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="#hero"
              className="section-jump-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToSection('hero');
              }}
            >
              <span>{t.ui.lunarMissionDetail.backToMain}</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default SpacecraftQuizSection;
