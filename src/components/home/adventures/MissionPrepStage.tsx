import { useState } from 'react';
import type { AdventureFlowConfig } from '@/data/stories/adventureFlowData';

export function MissionPrepStage({
  config,
  lang,
  onStartAdventure,
}: {
  config: AdventureFlowConfig;
  lang: 'tr' | 'en';
  onStartAdventure: () => void;
}) {
  const [testedControl, setTestedControl] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, 'a' | 'b' | 'c'>>({});

  const controlButtons =
    config.controlMode === 'flight'
      ? [
          { id: 'takeoff', labelTr: '🛫 Kalkış Testi', labelEn: '🛫 Test Takeoff' },
          { id: 'ascend', labelTr: '⬆ Yüksel Testi', labelEn: '⬆ Test Ascend' },
          { id: 'land', labelTr: '🛬 İniş Testi', labelEn: '🛬 Test Land' },
        ]
      : [
          { id: 'forward', labelTr: '▲ İleri Sürüş', labelEn: '▲ Forward' },
          { id: 'left', labelTr: '◀ Sola Dön', labelEn: '◀ Turn Left' },
          { id: 'right', labelTr: '▶ Sağa Dön', labelEn: '▶ Turn Right' },
          { id: 'backward', labelTr: '▼ Geri', labelEn: '▼ Reverse' },
        ];

  return (
    <div className="story-first-panel">
      <div className="prep-objective-box">
        <span className="adventure-discovery-tag">
          {lang === 'tr' ? 'GÖREV HEDEFİ' : 'MISSION OBJECTIVE'}
        </span>
        <h4>
          {lang === 'tr' ? config.prepObjectiveTr : config.prepObjectiveEn}
        </h4>
        <p>{lang === 'tr' ? config.prepControlsTr : config.prepControlsEn}</p>
      </div>

      <div className="prep-grid">
        {/* Interactive Controls Practice */}
        <div className="prep-card">
          <h5>
            {lang === 'tr'
              ? '1. Kontrolleri Dene (Alıştırma)'
              : '1. Practice Controls'}
          </h5>
          <p>
            {lang === 'tr'
              ? 'Maceraya başlamadan önce aşağıdaki kontrol düğmelerinden birini dene:'
              : 'Try any control button below before launching into the 3D surface:'}
          </p>
          <div className="prep-practice-buttons">
            {controlButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                className={`adventure-tool-btn ${
                  testedControl === btn.id ? 'is-active' : ''
                }`}
                onClick={() => setTestedControl(btn.id)}
              >
                {lang === 'tr' ? btn.labelTr : btn.labelEn}
              </button>
            ))}
          </div>
          {testedControl && (
            <p className="prep-practice-ok">
              ✓{' '}
              {lang === 'tr'
                ? 'Kontrol yanıtı doğrulandı! 3D sahnede aynı kontrollerle ilerleyebilirsin.'
                : 'Control response verified! You are ready to steer in the 3D scene.'}
            </p>
          )}
        </div>

        {/* Quick Prep Questions */}
        <div className="prep-card">
          <h5>
            {lang === 'tr'
              ? '2. Kısa Görev Hazırlık Soruları'
              : '2. Quick Mission Readiness Check'}
          </h5>
          <div className="prep-questions-list">
            {config.prepQuestions.map((q) => {
              const chosen = answers[q.id];
              const isCorrect = chosen === q.correctId;
              return (
                <div key={q.id} className="prep-question-item">
                  <p className="prep-question-prompt">
                    {lang === 'tr' ? q.promptTr : q.promptEn}
                  </p>
                  <div className="sojourner-quiz-options">
                    {q.options.map((opt) => {
                      const isPicked = chosen === opt.id;
                      const optCorrect = opt.id === q.correctId;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          className={`sojourner-quiz-option ${
                            isPicked ? (optCorrect ? 'is-correct' : 'is-wrong') : ''
                          }`}
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))
                          }
                        >
                          {lang === 'tr' ? opt.textTr : opt.textEn}
                        </button>
                      );
                    })}
                  </div>
                  {chosen && (
                    <p
                      className={`sojourner-quiz-feedback ${
                        isCorrect ? 'is-correct' : 'is-wrong'
                      }`}
                    >
                      {isCorrect
                        ? lang === 'tr'
                          ? q.explainCorrectTr
                          : q.explainCorrectEn
                        : lang === 'tr'
                        ? q.explainWrongTr
                        : q.explainWrongEn}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="prep-launch-bar">
        <button
          type="button"
          className="story-nav-btn prep-launch-btn"
          onClick={onStartAdventure}
        >
          🚀{' '}
          {lang === 'tr'
            ? 'Hazırım — 3D Maceraya Başla'
            : 'I’m Ready — Launch 3D Adventure'}
        </button>
      </div>
    </div>
  );
}
