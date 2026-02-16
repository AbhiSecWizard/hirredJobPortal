import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import faq from"../data/faq.json"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const LandingPage = () => {

const plugin = React.useRef(
    Autoplay({ delay: 2000})
  )

  return (
    <main className="flex flex-col gap-10 sm:gap-20 sm:py-20">
      <section className="text-center">
        <h1 className="gradient-title flex flex-col items-center justify-center text-4xl py-4 font-extrabold sm:text-6xl lg:text-8xl tracking-tighter">
          Find your Dreams Job{" "}
          <span className="flex gap-0.5">
            and get{" "}
            <img
              src="/logo.png"
              alt="Hirred logi"
              className="h-14 sm:h-24 lg:h-32"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl ">
          explore thousands of jobs listing or find the perfect candidate 
        </p>
      </section>
      <div className="flex gap-6 justify-center mr-2 ml-2">
        <Link to="/jobs">
        <Button variant="blue" size="xl">
             Find Jobs 
        </Button>
        </Link>
        <Link to="/post-job">
        <Button variant="destructive" size="xl">
             Post Job 
        </Button>
        </Link>
      </div>
        <Carousel
      plugins={[plugin.current]}
      className="w-full py-10"
    >
      <CarouselContent className="flex gap-5 sm:gap-20 items-center">
      {companies.map(({id,name,path})=>{
             return <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img src={path} alt={name}
              className="h-9 sm:h-14 object-contain" />
             </CarouselItem>
      })}
      </CarouselContent>
    </Carousel>
    <img src="/banner.jpeg" alt="" />

    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
  <CardHeader>
    <CardTitle>For Job Seekers</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Search and apply for jobs, track applications , and more</p>
  </CardContent>
</Card>
 <Card>
  <CardHeader>
    <CardTitle>For Employers</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Post jobs, manage applications , and find the best candidates </p>
  </CardContent>
</Card>
    </section>
    <Accordion type="single" collapsible defaultValue="item-1">

  {faq.map((data,index)=>{
    return  <AccordionItem value={`item + ${index}`}>
   
    <AccordionTrigger>{data.question}</AccordionTrigger>
    <AccordionContent>
    {data.answer}
    </AccordionContent>
  </AccordionItem>

  })}
  </Accordion>

    </main>
  );
};

export default LandingPage;
