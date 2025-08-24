"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Help & Support</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Need Assistance?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            We’re here to assist you with any questions or issues you might face while using our app. 
            Check the FAQs below or reach out directly to our support team.
          </p>
          <Button>Contact Support</Button>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="q1">
          <AccordionTrigger>How do I track my order?</AccordionTrigger>
          <AccordionContent>
            You can track your order by visiting the &quot;My Orders&quot; section in your account. Each order will have real-time status updates.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2">
          <AccordionTrigger>What payment methods are supported?</AccordionTrigger>
          <AccordionContent>
            We support credit/debit cards, UPI, net banking, and digital wallets for a seamless checkout experience.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q3">
          <AccordionTrigger>How can I request a refund?</AccordionTrigger>
          <AccordionContent>
            Refunds can be requested from the &quot;My Orders&quot; page within 7 days of delivery, depending on product eligibility.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q4">
          <AccordionTrigger>How do I contact customer support?</AccordionTrigger>
          <AccordionContent>
            You can contact us via email at <span className="font-medium">Trendora@gmail.com</span> or call us at <span className="font-medium">+12 958 648 597</span>.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
