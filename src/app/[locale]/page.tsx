import LandingPage from "@/components/landing";
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: {
    locale: string;
  };
};

export default function Home({ params }: Props) {
  const { locale } = params;

  // Enable static rendering
  setRequestLocale(locale);

  // Once the request locale is set, you can call hooks from `next-intl`

  return (
    <div>
      <LandingPage />
      {/* Example usage of t('key') if needed */}
      {/* <p>{t('welcome')}</p> */}
    </div>
  );
}
