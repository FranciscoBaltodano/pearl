import { setRequestLocale } from 'next-intl/server';
// import ChatPage from './chat';
import TourismGenerator from './generate';
// import ChatStream from './chat';


type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Page({ params }: Props) {
    const { locale } = await params;

    await setRequestLocale(locale);

    return (
        <div>
            {/* <ChatPage /> */}
            <TourismGenerator />
            {/* <ChatStream /> */}
        </div>
    );
}

// npm audit fix
