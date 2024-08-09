import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

const Faq: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: t("faq.questions.0"),
      answer: t("faq.answers.0"),
    },
    {
      question: t("faq.questions.1"),
      answer: t("faq.answers.1"),
    },
    {
      question: t("faq.questions.2"),
      answer: t("faq.answers.2"),
    },
    {
      question: t("faq.questions.3"),
      answer: t("faq.answers.3"),
    },
    {
      question: t("faq.questions.4"),
      answer: t("faq.answers.4"),
    },
    {
      question: t("faq.questions.5"),
      answer: t("faq.answers.5"),
    },
    {
      question: t("faq.questions.6"),
      answer: t("faq.answers.6"),
    },
    {
      question: t("faq.questions.7"),
      answer: t("faq.answers.7"),
    },
    {
      question: t("faq.questions.8"),
      answer: t("faq.answers.8"),
    },
    {
      question: t("faq.questions.9"),
      answer: t("faq.answers.9"),
    },
    {
      question: t("faq.questions.10"),
      answer: t("faq.answers.10"),
    },
  ];

  return (
    <section className="Faq">
      <h2>{t("faq.title")}</h2>
      <div className="answers">
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
              >
                {item.question}
                <span
                  className={`plus-minus ${openIndex === index ? "open" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`faq-answer ${openIndex === index ? "open" : ""}`}
                style={{ maxHeight: openIndex === index ? "200px" : "0" }}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
