import AIGeneratedSummary from "./AIGeneratedSummary.jsx";
import AIGeneratedFAQ from "./AIGeneratedFAQ.jsx";
import AIGeneratedHighlights from "./AIGeneratedHighlights.jsx";
import AIGeneratedKeyTakeaways from "./AIGeneratedKeyTakeaways.jsx";
import AIGeneratedConclusion from "./AIGeneratedConclusion.jsx";
import AIGeneratedTLDR from "./AIGeneratedTLDR.jsx";

import "../../../style/single post/ai components/AIGeneratedContent.scss";


function AIGeneratedContent(props) {
  return (
    <section className="ai-generated-content">
      <div className="ai-generated-content__glow ai-generated-content__glow--top" />
      <div className="ai-generated-content__glow ai-generated-content__glow--bottom" />

      <div className="ai-generated-content__header">
        <div className="ai-generated-content__icon">
          ✨
        </div>

        <div>
          <h2 className="ai-generated-content__title">
            AI Insights
          </h2>

          <p className="ai-generated-content__subtitle">
            Smart insights generated from this post
          </p>
        </div>
      </div>

      <div className="ai-generated-content__sections">
        <div className="ai-generated-content__card">
          <AIGeneratedSummary
            postDescription={props.postDescription}
          />
        </div>

        <div className="ai-generated-content__card">
          <AIGeneratedFAQ
            postDescription={props.postDescription}
          />
        </div>

        <div className="ai-generated-content__card">
          <AIGeneratedHighlights
            postDescription={props.postDescription}
          />
        </div>

        <div className="ai-generated-content__card">
          <AIGeneratedKeyTakeaways
            postDescription={props.postDescription}
          />
        </div>

        <div className="ai-generated-content__card">
          <AIGeneratedConclusion
            postDescription={props.postDescription}
          />
        </div>

        <div className="ai-generated-content__card">
          <AIGeneratedTLDR
            postDescription={props.postDescription}
          />
        </div>
      </div>

      <div className="ai-generated-content__footer">
        <span />
        AI-generated content
        <span />
      </div>
    </section>
  );
}

export default AIGeneratedContent;
