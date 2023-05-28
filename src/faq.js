import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const FAQPage = () => {
  const faqData = [
    {
      question: "What is the difference between Indica and Sativa?",
      answer:
        "Indica and Sativa are two different species of the cannabis plant. Indica strains are known for their relaxing and sedating effects, often described as a 'body high.' They are commonly used for relaxation, stress relief, and sleep aid. Sativa strains, on the other hand, are known for their uplifting and energizing effects, often described as a 'head high'. They are commonly used for enhancing creativity, focus, and social interactions.",
    },
    {
      question: "What is THC?",
      answer:
        "THC, or delta-9-tetrahydrocannabinol, is the primary psychoactive compound found in cannabis. It is responsible for the euphoric and intoxicating effects commonly associated with consuming cannabis. THC interacts with the cannabinoid receptors in the brain and central nervous system, producing various physical and psychological effects. The potency of THC can vary across different cannabis strains and products.",
    },
    {
      question: "How does weed make you high?",
      answer:
        "When weed is consumed, the cannabinoids, including THC, interact with the endocannabinoid system in the body. The endocannabinoid system is involved in regulating various physiological processes, including mood, appetite, pain perception, and memory. THC binds to cannabinoid receptors in the brain, particularly in areas related to reward, memory, and pleasure, leading to the psychoactive effects commonly known as being 'high.' The specific effects can vary depending on factors such as the strain, dosage, individual tolerance, and method of consumption.",
    },
    {
      question: "Pro's and Con's of smoking weed?",
      answer:
        "The pros and cons of smoking weed can vary depending on individual circumstances and preferences. Some potential pros of smoking weed include relaxation and stress relief, pain and nausea management, increased creativity and introspection, and potential medical benefits for certain conditions. However, it's important to note that there can also be potential cons, such as potential negative effects on memory and cognition, potential respiratory risks associated with smoking, potential legal implications depending on jurisdiction, and the potential for dependency or misuse. It's important to make informed decisions and use cannabis responsibly, considering individual factors and following applicable laws and regulations.",
    },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`faq-content-${index}`}
            id={`faq-header-${index}`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQPage;
