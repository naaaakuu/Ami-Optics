import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="bg-paper">
      <Container className="flex flex-col items-center gap-6 py-24 text-center">
        <Heading as="h1" size="lg">
          Page not found
        </Heading>
        <p className="max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved.
        </p>
        <Button href="/">Back to Home</Button>
      </Container>
    </Section>
  );
}
