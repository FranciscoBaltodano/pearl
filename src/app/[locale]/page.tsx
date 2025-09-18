
import LandingPage from "@/components/landing";
import Nav from "@/components/nav-server";
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <div>
      <Nav />
      <LandingPage />
    </div>
  );
}