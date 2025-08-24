"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/header/Logo";

export default function AboutPage() {
  return (
    <section className="flex justify-center py-10 px-4">
      <Card className="max-w-3xl w-full shadow-xl border-2 border-gray-200 rounded-2xl">
        <CardContent className="space-y-6 p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            About Us
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Welcome to <span><Logo/></span>, your
            one-stop destination for discovering and shopping quality products
            with ease.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We built this platform with a simple vision:{" "}
            <span className="font-medium">
              make online shopping smarter, faster, and more enjoyable
            </span>
            . Unlike big marketplaces filled with endless clutter, our store is
            designed to keep things simple — with curated products, easy
            navigation, and features that help you quickly find what you need.
          </p>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">✨ What we offer</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>A handpicked selection of gadgets and daily essentials</li>
              <li>Smart search powered by instant suggestions</li>
              <li>Categories and filters for effortless shopping</li>
              <li>Transparent pricing with special offers</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">💡 Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To create a shopping experience that feels{" "}
              <span className="font-medium">personal, modern, and effortless</span>{" "}
              — whether you’re looking for the latest gadget, a reliable
              appliance, or something unique.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">🌱 Why choose us?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Clean and user-friendly design</li>
              <li>Fast, secure, and hassle-free browsing</li>
              <li>A focus on quality over quantity</li>
            </ul>
          </div>

          <p className="text-center text-gray-700 font-medium mt-6">
             <span><Logo/></span> is not just about
            buying products — it’s about enjoying the process.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
