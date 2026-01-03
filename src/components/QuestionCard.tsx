'use client';

import { Question } from '@/lib/testEngine';

interface Props {
  question: Question;
  index: number;
  total: number;
  selected: number | null;
  onSelect: (answer: number) => void;
}

export function QuestionCard({ question, index, total, selected, onSelect }: Props) {
  const correctIndex = question.answerIndex;

  return (
    <div className="card question-card">
      <div className="meta-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="badge">Pregunta {index + 1} de {total}</span>
        <span className="badge">{question.type}</span>
      </div>
      {question.passage && (
        <div className="alert" style={{ marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
          {question.passage}
        </div>
      )}
      {question.prompt && <p style={{ color: 'var(--text)', marginBottom: '0.35rem', fontWeight: 500 }}>{question.prompt}</p>}
      <h3 style={{ marginBottom: '0.85rem' }}>{question.question}</h3>
      <div>
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const stateClass = isSelected ? (idx === correctIndex ? 'correct' : 'incorrect') : '';
          return (
            <button
              key={opt}
              className={`option ${isSelected ? 'selected' : ''} ${stateClass}`}
              type="button"
              onClick={() => onSelect(idx)}
              aria-pressed={isSelected}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
