import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is there a free trial?", a: "Yes — start with a 7-day free trial. No credit card required to begin." },
  { q: "Which channels does Samparq support?", a: "WhatsApp, SMS, Email, RCS, Voice/IVRS, Instagram, Facebook, Telegram, and web chat — all from one workspace." },
  { q: "How quickly can I set up IVRS?", a: "Most teams configure menus, routing rules, and working hours within an hour. Numbers can be ported or rented from Samparq." },
  { q: "How is pricing structured?", a: "A simple per-seat platform fee plus pass-through messaging and call costs. See the Pricing page for current plans." },
  { q: "How long does onboarding take?", a: "Self-serve setups go live the same day. Guided enterprise onboarding typically completes in 5–7 business days." },
  { q: "Is my data secure?", a: "We follow ISO 27001 and SOC2-aligned controls, RBAC, audit logs, end-to-end encryption in transit, and data residency options." },
  { q: "Do you support India DLT?", a: "Yes — DLT registration, template approval workflow, and sender ID management are all built in." },
  { q: "What support SLA do you offer?", a: "Email + chat support on all plans. Priority and 24×7 phone support on Growth and Enterprise plans." },
];

const FAQAccordion = () => (
  <Accordion type="single" collapsible className="max-w-3xl mx-auto">
    {faqs.map((f, i) => (
      <AccordionItem key={i} value={`item-${i}`} className="border-border">
        <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline">
          {f.q}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default FAQAccordion;
