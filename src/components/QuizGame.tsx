import React, { useState } from 'react';
import { TRIVIA_QUESTIONS } from '../data/profileData';
import { Trophy, HelpCircle, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizGame: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = TRIVIA_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="quiz" className="py-12 md:py-20 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Web Dev Trivia</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            How Well Do You Know <span className="font-cursive text-red-600 font-bold text-3xl sm:text-5xl">Lysette</span>?
          </h2>
          <p className="text-stone-600 text-sm max-w-lg mx-auto">
            Test your knowledge about Lysette's coding style, favorite tools, and web development fundamentals.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          {!quizFinished ? (
            <>
              {/* Progress and Score */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 text-xs font-semibold text-stone-500">
                <span>
                  Question {currentIdx + 1} of {TRIVIA_QUESTIONS.length}
                </span>
                <span className="text-amber-800">
                  Current Score: {score}
                </span>
              </div>

              {/* Question Text */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'border-stone-200 hover:bg-stone-50 text-stone-700';

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                    } else {
                      btnStyle = 'border-stone-200 text-stone-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswered && (
                <div className="pt-4 border-t border-stone-100 space-y-4 animate-fadeIn">
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                    <span className="font-bold mr-1">Did you know?</span>
                    {currentQ.explanation}
                  </div>

                  <div className="flex justify-end">
                    <button
                      id="next-quiz-btn"
                      onClick={handleNext}
                      className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      {currentIdx + 1 < TRIVIA_QUESTIONS.length ? 'Next Question' : 'View Results'}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-stone-900">
                Quiz Complete!
              </h3>

              <p className="text-stone-600 text-sm">
                You scored <span className="font-extrabold text-amber-800 text-base">{score}</span> out of {TRIVIA_QUESTIONS.length}!
              </p>

              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {score === TRIVIA_QUESTIONS.length
                  ? "Perfect score! You're officially a certified expert on Lysette's web dev journey! 🎉"
                  : "Great effort! Thanks for exploring and getting to know more about web development and Lysette's craft."}
              </p>

              <div className="pt-4">
                <button
                  id="restart-quiz-btn"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
