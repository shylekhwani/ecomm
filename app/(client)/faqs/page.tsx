"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQsPage = () => {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        
        <AccordionItem value="item-1" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">What is your return policy?</AccordionTrigger>
          <AccordionContent className="text-gray-600">
            We offer a 7-day return policy on most items. Products must be unused and in their original packaging.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">How long does shipping take?</AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Standard shipping usually takes 3–7 business days depending on your location.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">Do you offer international delivery?</AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Currently, we only deliver within USA. International shipping will be available soon.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">How can I track my order?</AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Once your order is shipped, you’ll receive a tracking link via email and SMS to monitor your package in real time.
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </section>
  );
};

export default FAQsPage;
