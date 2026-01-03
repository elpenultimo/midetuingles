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
  return (
    <div className="card">
      <div className="meta-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="badge">Pregunta {index + 1} de {total}</span>
        <span className="badge">{question.type}</span>
      </div>
      {question.passage && (
        <div className="alert" style={{ marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
          {question.passage}
        </div>
      )}
      {question.prompt && <p style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>{question.prompt}</p>}
      <h3 style={{ marginBottom: '0.75rem' }}>{question.question}</h3>
      <div>
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx;
          return (
            <button
              key={opt}
              className={`option ${isSelected ? 'selected' : ''}`}
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
