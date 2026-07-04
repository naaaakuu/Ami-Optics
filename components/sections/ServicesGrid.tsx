import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <Section id="services" className="bg-paper">
      <Container className="flex flex-col gap-12">
        <Reveal className="max-w-xl">
          <Heading as="h2" size="lg">
            What we offer
          </Heading>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 100}>
              {service.image ? (
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-border">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="mb-5 flex aspect-[4/3] items-center justify-center rounded-2xl border border-border bg-paper">
                  <span className="font-display text-2xl text-muted">
                    {service.name}
                  </span>
                </div>
              )}
              <h3 className="font-display text-xl text-ink">
                {service.name}
              </h3>
              <p className="mt-2 text-muted">{service.summary}</p>
              {service.details && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.details.map((detail) => (
                    <Tag key={detail}>{detail}</Tag>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
